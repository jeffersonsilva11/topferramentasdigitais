'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
}

type TestStatus = 'idle' | 'testing-ping' | 'testing-download' | 'testing-upload' | 'completed';

export default function TesteVelocidadeInternet() {
  const t = useTranslations('speedTestUI');

  const [status, setStatus] = useState<TestStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Test using public CDN files for download and data upload simulation
  const testDownloadSpeed = async (): Promise<number> => {
    const testSizes = [
      { url: 'https://speed.cloudflare.com/__down?bytes=1000000', size: 1000000 }, // 1MB
      { url: 'https://speed.cloudflare.com/__down?bytes=5000000', size: 5000000 }, // 5MB
    ];

    const speeds: number[] = [];

    for (const test of testSizes) {
      const startTime = performance.now();

      try {
        const response = await fetch(test.url, {
          signal: abortControllerRef.current?.signal,
          cache: 'no-store',
        });

        const reader = response.body?.getReader();
        let receivedLength = 0;

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            receivedLength += value?.length || 0;
          }
        }

        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000; // seconds
        const bitsLoaded = receivedLength * 8;
        const speedMbps = (bitsLoaded / duration / 1024 / 1024);
        speeds.push(speedMbps);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw error;
        }
        console.error('Download test error:', error);
      }
    }

    return speeds.length > 0 ? speeds.reduce((a, b) => a + b) / speeds.length : 0;
  };

  const testUploadSpeed = async (): Promise<number> => {
    // Generate test data (1MB)
    const testData = new Uint8Array(1024 * 1024);
    for (let i = 0; i < testData.length; i++) {
      testData[i] = Math.floor(Math.random() * 256);
    }
    const blob = new Blob([testData]);

    const speeds: number[] = [];

    // Run 2 upload tests
    for (let i = 0; i < 2; i++) {
      const startTime = performance.now();

      try {
        await fetch('https://speed.cloudflare.com/__up', {
          method: 'POST',
          body: blob,
          signal: abortControllerRef.current?.signal,
          cache: 'no-store',
        });

        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000; // seconds
        const bitsUploaded = testData.length * 8;
        const speedMbps = (bitsUploaded / duration / 1024 / 1024);
        speeds.push(speedMbps);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw error;
        }
        console.error('Upload test error:', error);
      }
    }

    return speeds.length > 0 ? speeds.reduce((a, b) => a + b) / speeds.length : 0;
  };

  const testPingAndJitter = async (): Promise<{ ping: number; jitter: number }> => {
    const pingResults: number[] = [];
    const iterations = 5;

    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();

      try {
        await fetch('https://speed.cloudflare.com/__down?bytes=1', {
          signal: abortControllerRef.current?.signal,
          cache: 'no-store',
        });

        const endTime = performance.now();
        pingResults.push(endTime - startTime);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw error;
        }
        console.error('Ping test error:', error);
      }

      // Small delay between pings
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const avgPing = pingResults.reduce((a, b) => a + b, 0) / pingResults.length;

    // Calculate jitter (standard deviation of ping times)
    const variance = pingResults.reduce((sum, ping) => {
      return sum + Math.pow(ping - avgPing, 2);
    }, 0) / pingResults.length;
    const jitter = Math.sqrt(variance);

    return { ping: avgPing, jitter };
  };

  const runSpeedTest = async () => {
    setStatus('testing-ping');
    setProgress(0);
    setResult(null);
    abortControllerRef.current = new AbortController();

    try {
      // Test 1: Ping and Jitter
      setProgress(10);
      const { ping, jitter } = await testPingAndJitter();
      setProgress(30);

      // Test 2: Download Speed
      setStatus('testing-download');
      setProgress(35);
      const downloadSpeed = await testDownloadSpeed();
      setProgress(65);

      // Test 3: Upload Speed
      setStatus('testing-upload');
      setProgress(70);
      const uploadSpeed = await testUploadSpeed();
      setProgress(95);

      // Set final results
      setResult({
        download: Math.round(downloadSpeed * 100) / 100,
        upload: Math.round(uploadSpeed * 100) / 100,
        ping: Math.round(ping),
        jitter: Math.round(jitter * 10) / 10,
      });

      setProgress(100);
      setStatus('completed');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setStatus('idle');
        setProgress(0);
        return;
      }
      console.error('Speed test error:', error);
      setStatus('idle');
      setProgress(0);
    }
  };

  const stopTest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus('idle');
    setProgress(0);
  };

  const resetTest = () => {
    setStatus('idle');
    setProgress(0);
    setResult(null);
  };

  const getConnectionStatus = (download: number): { label: string; color: string; emoji: string } => {
    if (download >= 50) {
      return { label: t('statusExcellent'), color: 'text-green-600', emoji: '🚀' };
    } else if (download >= 25) {
      return { label: t('statusGood'), color: 'text-green-500', emoji: '✅' };
    } else if (download >= 10) {
      return { label: t('statusAverage'), color: 'text-yellow-600', emoji: '⚠️' };
    } else if (download >= 5) {
      return { label: t('statusSlow'), color: 'text-orange-600', emoji: '🐌' };
    } else {
      return { label: t('statusPoor'), color: 'text-red-600', emoji: '❌' };
    }
  };

  const shareResult = () => {
    if (!result) return;

    const text = `${t('shareText')}
${t('download')}: ${result.download} Mbps
${t('upload')}: ${result.upload} Mbps
${t('ping')}: ${result.ping} ms
${t('jitter')}: ${result.jitter} ms`;

    navigator.clipboard.writeText(text);
    alert(t('copied'));
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'testing-ping':
        return t('testingPing');
      case 'testing-download':
        return t('testingDownload');
      case 'testing-upload':
        return t('testingUpload');
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Test Card */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('title')}</h2>

        {/* Test Button or Progress */}
        {status === 'idle' && !result && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('startMessage')}
            </p>
            <Button
              variant="primary"
              onClick={runSpeedTest}
              className="px-8 py-4 text-lg"
            >
              {t('startTest')}
            </Button>
          </div>
        )}

        {/* Testing in Progress */}
        {status !== 'idle' && status !== 'completed' && (
          <div className="py-8">
            <div className="text-center mb-4">
              <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                {getStatusMessage()}
              </p>
              <p className="text-sm text-gray-500">{progress}%</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-gray-200 dark:bg-dark-800 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-center">
              <Button variant="danger" onClick={stopTest}>
                {t('stopTest')}
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        {result && status === 'completed' && (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="text-center py-4 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('connectionStatus')}</p>
              <p className={`text-3xl font-bold ${getConnectionStatus(result.download).color}`}>
                {getConnectionStatus(result.download).emoji} {getConnectionStatus(result.download).label}
              </p>
            </div>

            {/* Speed Results Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Download Speed */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  ⬇️ {t('download')}
                </p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {result.download}
                </p>
                <p className="text-sm text-gray-500 mt-1">Mbps</p>
              </div>

              {/* Upload Speed */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  ⬆️ {t('upload')}
                </p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {result.upload}
                </p>
                <p className="text-sm text-gray-500 mt-1">Mbps</p>
              </div>

              {/* Ping */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  📡 {t('ping')}
                </p>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {result.ping}
                </p>
                <p className="text-sm text-gray-500 mt-1">ms</p>
              </div>

              {/* Jitter */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  📊 {t('jitter')}
                </p>
                <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                  {result.jitter}
                </p>
                <p className="text-sm text-gray-500 mt-1">ms</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <Button variant="primary" onClick={runSpeedTest}>
                {t('testAgain')}
              </Button>
              <Button variant="secondary" onClick={shareResult}>
                📤 {t('shareResult')}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Educational Content - SEO */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('whatIsTitle')}</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-semibold text-lg mb-2">📥 {t('downloadTitle')}</h3>
            <p className="text-sm">{t('downloadDesc')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">📤 {t('uploadTitle')}</h3>
            <p className="text-sm">{t('uploadDesc')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">📡 {t('pingTitle')}</h3>
            <p className="text-sm">{t('pingDesc')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">📊 {t('jitterTitle')}</h3>
            <p className="text-sm">{t('jitterDesc')}</p>
          </div>
        </div>
      </div>

      {/* Tips to Improve Connection - SEO */}
      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-6 rounded">
        <h2 className="text-xl font-bold mb-4">{t('tipsTitle')}</h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
          <li>{t('tip1')}</li>
          <li>{t('tip2')}</li>
          <li>{t('tip3')}</li>
          <li>{t('tip4')}</li>
          <li>{t('tip5')}</li>
        </ul>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">🔒 {t('privacyTitle')}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t('privacyText')}
        </p>
      </div>
    </div>
  );
}
