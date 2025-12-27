'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

interface DeviceInfo {
  deviceId: string;
  label: string;
  kind: string;
}

export default function TestadorMicrofoneCamera() {
  const t = useTranslations('deviceTesterUI');
  const [audioDevices, setAudioDevices] = useState<DeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<DeviceInfo[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>('');
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>('');

  const [isMicTesting, setIsMicTesting] = useState(false);
  const [isCameraTesting, setIsCameraTesting] = useState(false);

  const [audioLevel, setAudioLevel] = useState(0);
  const [micStatus, setMicStatus] = useState<'idle' | 'testing' | 'pass' | 'fail'>('idle');
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'testing' | 'pass' | 'fail'>('idle');

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enumerate devices
  const getDevices = async () => {
    try {
      // Request permissions first
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

      const devices = await navigator.mediaDevices.enumerateDevices();

      const audio = devices
        .filter(device => device.kind === 'audioinput')
        .map(d => ({ deviceId: d.deviceId, label: d.label || 'Microphone', kind: d.kind }));

      const video = devices
        .filter(device => device.kind === 'videoinput')
        .map(d => ({ deviceId: d.deviceId, label: d.label || 'Camera', kind: d.kind }));

      setAudioDevices(audio);
      setVideoDevices(video);

      if (audio.length > 0 && !selectedAudioDevice) {
        setSelectedAudioDevice(audio[0].deviceId);
      }
      if (video.length > 0 && !selectedVideoDevice) {
        setSelectedVideoDevice(video[0].deviceId);
      }
    } catch (error) {
      console.error('Error enumerating devices:', error);
    }
  };

  useEffect(() => {
    getDevices();

    return () => {
      stopMicTest();
      stopCameraTest();
    };
  }, []);

  // Microphone Test
  const startMicTest = async () => {
    try {
      setMicStatus('testing');
      setIsMicTesting(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: selectedAudioDevice ? { exact: selectedAudioDevice } : undefined },
      });

      audioStreamRef.current = stream;

      // Create audio context and analyser
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      // Analyze audio level
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkAudioLevel = () => {
        if (!analyserRef.current) return;

        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(Math.min(100, average));

        // Auto-detect if mic is working
        if (average > 5) {
          setMicStatus('pass');
        }

        animationFrameRef.current = requestAnimationFrame(checkAudioLevel);
      };

      checkAudioLevel();

    } catch (error) {
      console.error('Microphone test error:', error);
      setMicStatus('fail');
      setIsMicTesting(false);
    }
  };

  const stopMicTest = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setIsMicTesting(false);
    setAudioLevel(0);
  };

  // Camera Test
  const startCameraTest = async () => {
    try {
      setCameraStatus('testing');
      setIsCameraTesting(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedVideoDevice ? { exact: selectedVideoDevice } : undefined },
      });

      videoStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraStatus('pass');
      }

    } catch (error) {
      console.error('Camera test error:', error);
      setCameraStatus('fail');
      setIsCameraTesting(false);
    }
  };

  const stopCameraTest = () => {
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach(track => track.stop());
      videoStreamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraTesting(false);
  };

  const getStatusColor = (status: 'idle' | 'testing' | 'pass' | 'fail') => {
    switch (status) {
      case 'idle': return 'text-gray-500';
      case 'testing': return 'text-blue-500';
      case 'pass': return 'text-green-500';
      case 'fail': return 'text-red-500';
    }
  };

  const getStatusIcon = (status: 'idle' | 'testing' | 'pass' | 'fail') => {
    switch (status) {
      case 'idle': return '⚪';
      case 'testing': return '🔵';
      case 'pass': return '✅';
      case 'fail': return '❌';
    }
  };

  const getStatusText = (status: 'idle' | 'testing' | 'pass' | 'fail') => {
    switch (status) {
      case 'idle': return t('statusIdle');
      case 'testing': return t('statusTesting');
      case 'pass': return t('statusPass');
      case 'fail': return t('statusFail');
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">{t('privacyNotice')}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t('privacyText')}
        </p>
      </div>

      {/* Device Lists */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('availableDevices')}</h2>

        <div className="space-y-4">
          {/* Audio Devices */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('microphones')} ({audioDevices.length})
            </label>
            {audioDevices.length > 0 ? (
              <select
                value={selectedAudioDevice}
                onChange={(e) => setSelectedAudioDevice(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {audioDevices.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-sm text-gray-500">{t('noMicrophones')}</p>
            )}
          </div>

          {/* Video Devices */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('cameras')} ({videoDevices.length})
            </label>
            {videoDevices.length > 0 ? (
              <select
                value={selectedVideoDevice}
                onChange={(e) => setSelectedVideoDevice(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {videoDevices.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-sm text-gray-500">{t('noCameras')}</p>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          onClick={getDevices}
          className="mt-4"
        >
          {t('refreshDevices')}
        </Button>
      </div>

      {/* Microphone Test */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{t('microphoneTest')}</h2>
          <div className={`text-lg font-semibold ${getStatusColor(micStatus)}`}>
            {getStatusIcon(micStatus)} {getStatusText(micStatus)}
          </div>
        </div>

        {isMicTesting && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">{t('audioLevel')}</p>
            <div className="w-full h-8 bg-gray-200 dark:bg-dark-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-100"
                style={{ width: `${audioLevel}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t('speakPrompt')}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          {!isMicTesting ? (
            <Button
              variant="primary"
              onClick={startMicTest}
              disabled={audioDevices.length === 0}
            >
              {t('testMicrophone')}
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={stopMicTest}
            >
              {t('stopTest')}
            </Button>
          )}
        </div>
      </div>

      {/* Camera Test */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{t('cameraTest')}</h2>
          <div className={`text-lg font-semibold ${getStatusColor(cameraStatus)}`}>
            {getStatusIcon(cameraStatus)} {getStatusText(cameraStatus)}
          </div>
        </div>

        {isCameraTesting && (
          <div className="mb-4">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full rounded-lg bg-black aspect-video object-cover"
            />
          </div>
        )}

        <div className="flex gap-3">
          {!isCameraTesting ? (
            <Button
              variant="primary"
              onClick={startCameraTest}
              disabled={videoDevices.length === 0}
            >
              {t('testCamera')}
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={stopCameraTest}
            >
              {t('stopTest')}
            </Button>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
        <p className="font-semibold mb-2">{t('howToUse')}</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>{t('instruction1')}</li>
          <li>{t('instruction2')}</li>
          <li>{t('instruction3')}</li>
          <li>{t('instruction4')}</li>
          <li>{t('instruction5')}</li>
        </ul>
      </div>
    </div>
  );
}
