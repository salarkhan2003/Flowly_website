import { useCallback, useEffect, useRef, useState } from 'react';
import { triggerApkDownload } from '../lib/apkDownload';

type DownloadPhase = 'idle' | 'downloading' | 'instructions';

const MIN_DOWNLOAD_MS = 2200;

export function useApkDownload() {
  const [phase, setPhase] = useState<DownloadPhase>('idle');
  const [progress, setProgress] = useState(0);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearInterval(id));
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const startDownload = useCallback(() => {
    if (phase === 'downloading') return;

    clearTimers();
    setPhase('downloading');
    setProgress(0);
    triggerApkDownload();

    const startedAt = Date.now();
    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const t = Math.min(1, elapsed / MIN_DOWNLOAD_MS);
      const eased = 1 - Math.pow(1 - t, 2.2);
      const next = Math.min(99, Math.round(eased * 99));
      setProgress((prev) => (next > prev ? next : prev));
    }, 80);
    timersRef.current.push(progressTimer);

    const finishTimer = window.setTimeout(() => {
      clearTimers();
      setProgress(100);
      window.setTimeout(() => {
        setPhase('instructions');
        setProgress(0);
      }, 350);
    }, MIN_DOWNLOAD_MS);
    timersRef.current.push(finishTimer);
  }, [phase, clearTimers]);

  const closeInstructions = useCallback(() => {
    setPhase('idle');
    setProgress(0);
  }, []);

  const isDownloading = phase === 'downloading';
  const showInstructions = phase === 'instructions';

  return {
    isDownloading,
    showInstructions,
    progress,
    startDownload,
    closeInstructions,
  };
}
