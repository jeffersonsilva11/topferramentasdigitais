'use client';

import { useState, useEffect, useRef } from 'react';

export default function CronometroTimer() {
  const [mode, setMode] = useState<'cronometro' | 'timer'>('cronometro');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        if (mode === 'cronometro') {
          setTime((prev) => prev + 1);
        } else {
          setTime((prev) => {
            if (prev <= 0) {
              setIsRunning(false);
              playAlarm();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const playAlarm = () => {
    // Criar som de alarme
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;

      oscillator.start();
      setTimeout(() => oscillator.stop(), 1000);
    } catch {
      alert('⏰ Tempo esgotado!');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (mode === 'cronometro' || hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const start = () => {
    if (mode === 'timer' && time === 0) {
      setTime(timerMinutes * 60 + timerSeconds);
    }
    setIsRunning(true);
  };

  const pause = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const switchMode = (newMode: 'cronometro' | 'timer') => {
    setMode(newMode);
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-xl shadow-lg p-8 ${
        isFullscreen ? 'bg-gradient-to-br from-gray-900 to-black flex items-center justify-center' : ''
      }`}
    >
      {!isFullscreen && (
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => switchMode('cronometro')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
              mode === 'cronometro'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⏱️ Cronômetro
          </button>
          <button
            onClick={() => switchMode('timer')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
              mode === 'timer'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⏰ Timer
          </button>
        </div>
      )}

      {mode === 'timer' && !isRunning && time === 0 && !isFullscreen && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minutos:</label>
            <input
              type="number"
              value={timerMinutes}
              onChange={(e) => setTimerMinutes(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Segundos:</label>
            <input
              type="number"
              value={timerSeconds}
              onChange={(e) => setTimerSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              min="0"
              max="59"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl font-mono"
            />
          </div>
        </div>
      )}

      <div className={`text-center mb-8 ${isFullscreen ? 'text-white' : ''}`}>
        <div
          className={`font-mono font-bold ${
            isFullscreen ? 'text-9xl' : 'text-7xl md:text-8xl'
          } mb-4 ${time === 0 && mode === 'timer' && isRunning ? 'text-red-500 animate-pulse' : ''}`}
        >
          {formatTime(time)}
        </div>

        {mode === 'timer' && time > 0 && time <= 10 && isRunning && (
          <p className={`text-red-500 font-bold ${isFullscreen ? 'text-4xl' : 'text-2xl'} animate-pulse`}>
            ⚠️ Últimos segundos!
          </p>
        )}
      </div>

      <div className={`flex gap-3 ${isFullscreen ? 'flex-col max-w-md mx-auto' : ''}`}>
        {!isRunning ? (
          <button
            onClick={start}
            className={`flex-1 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium ${
              isFullscreen ? 'text-3xl' : 'text-lg'
            }`}
          >
            ▶️ Iniciar
          </button>
        ) : (
          <button
            onClick={pause}
            className={`flex-1 px-6 py-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium ${
              isFullscreen ? 'text-3xl' : 'text-lg'
            }`}
          >
            ⏸️ Pausar
          </button>
        )}

        <button
          onClick={reset}
          className={`flex-1 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium ${
            isFullscreen ? 'text-3xl' : 'text-lg'
          }`}
        >
          🔄 Reiniciar
        </button>

        <button
          onClick={toggleFullscreen}
          className={`px-6 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition font-medium ${
            isFullscreen ? 'text-3xl' : 'text-lg'
          }`}
          title="Tela cheia"
        >
          {isFullscreen ? '⬇️' : '⬆️'}
        </button>
      </div>

      {!isFullscreen && (
        <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="font-semibold mb-2">💡 Dicas de uso:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Cronômetro:</strong> Conta o tempo para cima (útil para treinos, estudos)</li>
            <li><strong>Timer:</strong> Conta regressiva e toca alarme ao finalizar</li>
            <li><strong>Tela cheia:</strong> Clique no botão ⬆️ para modo fullscreen</li>
            <li><strong>Pausar:</strong> Pause a qualquer momento e retome depois</li>
            <li>Funciona mesmo com tela bloqueada (alguns navegadores)</li>
          </ul>
        </div>
      )}
    </div>
  );
}
