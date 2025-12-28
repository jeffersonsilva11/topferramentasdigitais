'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

type RecordingMode = 'screen' | 'webcam' | 'screen-webcam';

export default function GravadorTela() {
  const t = useTranslations('screenRecorderUI');
  const [mode, setMode] = useState<RecordingMode>('screen');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string>('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const webcamStreamRef = useRef<MediaStream | null>(null);
  const combinedStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const webcamPreviewRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Cleanup streams on unmount
  useEffect(() => {
    return () => {
      stopAllStreams();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const stopAllStreams = () => {
    [screenStreamRef.current, webcamStreamRef.current, combinedStreamRef.current].forEach(stream => {
      stream?.getTracks().forEach(track => track.stop());
    });
    screenStreamRef.current = null;
    webcamStreamRef.current = null;
    combinedStreamRef.current = null;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const drawCanvas = (
    canvas: HTMLCanvasElement,
    screenVideo: HTMLVideoElement,
    webcamVideo: HTMLVideoElement
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (screenVideo.readyState === screenVideo.HAVE_ENOUGH_DATA &&
          webcamVideo.readyState === webcamVideo.HAVE_ENOUGH_DATA) {
        // Draw screen (full canvas)
        ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);

        // Draw webcam (bottom-right corner, 20% of screen width)
        const pipWidth = canvas.width * 0.20;
        const pipHeight = (pipWidth * 3) / 4; // 4:3 aspect ratio
        const pipX = canvas.width - pipWidth - 20;
        const pipY = canvas.height - pipHeight - 20;

        // Draw border/shadow for PiP
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeRect(pipX, pipY, pipWidth, pipHeight);

        // Draw webcam
        ctx.shadowBlur = 0;
        ctx.drawImage(webcamVideo, pipX, pipY, pipWidth, pipHeight);
      }

      if (isRecording && !isPaused) {
        animationFrameRef.current = requestAnimationFrame(draw);
      }
    };

    draw();
  };

  const startRecording = async () => {
    try {
      let stream: MediaStream;

      if (mode === 'screen') {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: { mediaSource: 'screen' },
          audio: true,
        });
        screenStreamRef.current = stream;

        // Show preview
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
          videoPreviewRef.current.play();
        }
      } else if (mode === 'webcam') {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        webcamStreamRef.current = stream;

        // Show preview
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
          videoPreviewRef.current.play();
        }
      } else {
        // screen-webcam mode - Use Canvas for Picture-in-Picture
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: { mediaSource: 'screen' },
          audio: true,
        });
        const webcamStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false, // Avoid double audio
        });

        screenStreamRef.current = screenStream;
        webcamStreamRef.current = webcamStream;

        // Create hidden video elements to capture streams
        const screenVideo = document.createElement('video');
        const webcamVideo = document.createElement('video');

        screenVideo.srcObject = screenStream;
        webcamVideo.srcObject = webcamStream;
        screenVideo.play();
        webcamVideo.play();

        // Setup canvas
        const canvas = canvasRef.current;
        if (!canvas) throw new Error('Canvas not available');

        // Set canvas size to match screen resolution
        const screenTrack = screenStream.getVideoTracks()[0];
        const settings = screenTrack.getSettings();
        canvas.width = settings.width || 1920;
        canvas.height = settings.height || 1080;

        // Wait for videos to be ready
        await Promise.all([
          new Promise(resolve => { screenVideo.onloadedmetadata = resolve; }),
          new Promise(resolve => { webcamVideo.onloadedmetadata = resolve; })
        ]);

        // Start drawing to canvas
        drawCanvas(canvas, screenVideo, webcamVideo);

        // Get canvas stream and add audio from screen
        const canvasStream = canvas.captureStream(30); // 30 FPS
        const audioTrack = screenStream.getAudioTracks()[0];
        if (audioTrack) {
          canvasStream.addTrack(audioTrack);
        }

        stream = canvasStream;
        combinedStreamRef.current = stream;
      }

      // Setup MediaRecorder
      const options: MediaRecorderOptions = {
        mimeType: MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
          ? 'video/webm; codecs=vp9'
          : 'video/webm',
      };

      const mediaRecorder = new MediaRecorder(stream, options);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        setRecordedChunks(chunks);
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        stopAllStreams();
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setRecordedChunks([]);

      // Start timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert(t('alertPermissionDenied'));
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        // Resume timer
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        // Pause timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Clear preview
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = null;
      }
      if (webcamPreviewRef.current) {
        webcamPreviewRef.current.srcObject = null;
      }
    }
  };

  const downloadRecording = (format: 'webm' | 'mp4' = 'webm') => {
    if (recordedChunks.length === 0) return;

    const blob = new Blob(recordedChunks, {
      type: format === 'webm' ? 'video/webm' : 'video/mp4',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recording-${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetRecording = () => {
    setRecordedChunks([]);
    setVideoUrl('');
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Privacy Disclaimer */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">🔒 {t('privacyNotice')}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t('privacyText')}
        </p>
      </div>

      {/* Mode Selection */}
      {!isRecording && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t('recordingMode')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setMode('screen')}
              className={`p-4 rounded-lg border-2 transition ${
                mode === 'screen'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-dark-700'
              }`}
            >
              <div className="text-4xl mb-2">🖥️</div>
              <p className="font-semibold">{t('modeScreen')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('modeScreenDesc')}
              </p>
            </button>

            <button
              onClick={() => setMode('webcam')}
              className={`p-4 rounded-lg border-2 transition ${
                mode === 'webcam'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-dark-700'
              }`}
            >
              <div className="text-4xl mb-2">📹</div>
              <p className="font-semibold">{t('modeWebcam')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('modeWebcamDesc')}
              </p>
            </button>

            <button
              onClick={() => setMode('screen-webcam')}
              className={`p-4 rounded-lg border-2 transition ${
                mode === 'screen-webcam'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-dark-700'
              }`}
            >
              <div className="text-4xl mb-2">🎬</div>
              <p className="font-semibold">{t('modeScreenWebcam')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('modeScreenWebcamDesc')}
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Preview Section */}
      {isRecording && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {isPaused ? `${t('paused')}` : `${t('recording')}`}
            </h2>
            <div className="text-2xl font-mono font-bold text-primary-600">
              {formatTime(recordingTime)}
            </div>
          </div>

          <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
            {mode === 'screen-webcam' ? (
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                ref={videoPreviewRef}
                autoPlay
                muted
                className="w-full h-full object-contain"
              />
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="secondary"
              onClick={pauseRecording}
            >
              {isPaused ? `${t('resumeRecording')}` : `${t('pauseRecording')}`}
            </Button>
            <Button
              variant="danger"
              onClick={stopRecording}
            >
              {t('stopRecording')}
            </Button>
          </div>
        </div>
      )}

      {/* Controls */}
      {!isRecording && !videoUrl && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <Button
            variant="primary"
            onClick={startRecording}
            className="w-full text-lg py-4"
          >
            {t('startRecording')}
          </Button>
        </div>
      )}

      {/* Recorded Video */}
      {videoUrl && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t('preview')}</h2>

          <video
            src={videoUrl}
            controls
            className="w-full rounded-lg mb-4 bg-black"
          />

          <div className="space-y-3">
            <Button
              variant="primary"
              onClick={() => downloadRecording('webm')}
              className="w-full"
            >
              {t('download')}
            </Button>
            <Button
              variant="outline"
              onClick={resetRecording}
              className="w-full"
            >
              {t('recordAgain')}
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>{t('formatTip')}</p>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
        <p className="font-semibold mb-2">{t('instructions')}</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>{t('instruction1')}</li>
          <li>{t('instruction2')}</li>
          <li>{t('instruction3')}</li>
          <li>{t('instruction4')}</li>
          <li>{t('instruction5')}</li>
        </ul>
      </div>

      {/* Browser Compatibility */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
        <p className="font-semibold mb-2">⚠️ {t('browserCompatibility')}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t('browserCompatibilityText')}
        </p>
      </div>
    </div>
  );
}
