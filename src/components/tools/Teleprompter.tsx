'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

interface TeleprompterSettings {
  speed: number;
  fontSize: number;
  lineHeight: number;
  backgroundColor: string;
  textColor: string;
  mirror: boolean;
}

export default function Teleprompter() {
  const t = useTranslations('teleprompterUI');
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settings, setSettings] = useState<TeleprompterSettings>({
    speed: 50,
    fontSize: 32,
    lineHeight: 1.5,
    backgroundColor: '#000000',
    textColor: '#ffffff',
    mirror: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const scrollPositionRef = useRef(0);

  // Load from localStorage
  useEffect(() => {
    const savedText = localStorage.getItem('teleprompter-text');
    const savedSettings = localStorage.getItem('teleprompter-settings');

    if (savedText) setText(savedText);
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('teleprompter-text', text);
  }, [text]);

  useEffect(() => {
    localStorage.setItem('teleprompter-settings', JSON.stringify(settings));
  }, [settings]);

  // Auto-scroll animation
  const scroll = useCallback(() => {
    if (!isPlaying || !textContainerRef.current) return;

    scrollPositionRef.current += settings.speed / 60;
    textContainerRef.current.scrollTop = scrollPositionRef.current;

    // Check if reached end
    const { scrollTop, scrollHeight, clientHeight } = textContainerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setIsPlaying(false);
      return;
    }

    animationFrameRef.current = requestAnimationFrame(scroll);
  }, [isPlaying, settings.speed]);

  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(scroll);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, scroll]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        setSettings(prev => ({ ...prev, speed: Math.min(prev.speed + 10, 200) }));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        setSettings(prev => ({ ...prev, speed: Math.max(prev.speed - 10, 10) }));
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        resetScroll();
      }
    };

    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isFullscreen]);

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const resetScroll = () => {
    if (textContainerRef.current) {
      scrollPositionRef.current = 0;
      textContainerRef.current.scrollTop = 0;
    }
    setIsPlaying(false);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="space-y-6">
      {/* Settings Panel */}
      {!isFullscreen && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t('settings')}</h2>

          <div className="space-y-4">
            {/* Speed Control */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('speed')}: {settings.speed}
              </label>
              <input
                type="range"
                min="10"
                max="200"
                value={settings.speed}
                onChange={(e) => setSettings(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('fontSize')}: {settings.fontSize}px
              </label>
              <input
                type="range"
                min="16"
                max="96"
                value={settings.fontSize}
                onChange={(e) => setSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>

            {/* Line Height */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('lineSpacing')}: {settings.lineHeight}
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => setSettings(prev => ({ ...prev, lineHeight: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('backgroundColor')}
                </label>
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => setSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('textColor')}
                </label>
                <input
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => setSettings(prev => ({ ...prev, textColor: e.target.value }))}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Mirror Mode */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mirror"
                checked={settings.mirror}
                onChange={(e) => setSettings(prev => ({ ...prev, mirror: e.target.checked }))}
                className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <label htmlFor="mirror" className="ml-2 text-sm font-medium">
                {t('mirrorMode')}
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Text Input */}
      {!isFullscreen && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t('script')}</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('scriptPlaceholder')}
            className="w-full h-64 px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>
      )}

      {/* Teleprompter Display */}
      <div
        ref={containerRef}
        className="bg-white dark:bg-dark-900 rounded-xl shadow-lg overflow-hidden"
      >
        <div
          ref={textContainerRef}
          style={{
            backgroundColor: settings.backgroundColor,
            color: settings.textColor,
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight,
            transform: settings.mirror ? 'scaleX(-1)' : 'none',
            height: isFullscreen ? '100vh' : '400px',
            overflow: 'auto',
            padding: '2rem',
            scrollBehavior: 'smooth',
            textAlign: 'center',
          }}
          className="relative"
        >
          <div className="max-w-4xl mx-auto">
            {text.split('\n').map((line, index) => (
              <p key={index} className="mb-4">
                {line || '\u00A0'}
              </p>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-100 dark:bg-dark-800 flex flex-wrap gap-3 justify-center">
          <Button
            variant="primary"
            onClick={togglePlayPause}
          >
            {isPlaying ? t('pause') : t('play')}
          </Button>

          <Button
            variant="secondary"
            onClick={resetScroll}
          >
            {t('reset')}
          </Button>

          <Button
            variant="secondary"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? t('exitFullscreen') : t('fullscreen')}
          </Button>
        </div>
      </div>

      {/* Keyboard Shortcuts Info */}
      {!isFullscreen && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
          <p className="font-semibold mb-2">{t('keyboardShortcuts')}</p>
          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>{t('shortcutSpace')}</strong></li>
            <li><strong>{t('shortcutUp')}</strong></li>
            <li><strong>{t('shortcutDown')}</strong></li>
            <li><strong>{t('shortcutR')}</strong></li>
          </ul>
        </div>
      )}
    </div>
  );
}

// Export function to control teleprompter externally (for recorder integration)
export { Teleprompter };
