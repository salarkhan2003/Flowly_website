import { motion } from 'motion/react';
import { Bot, Download } from 'lucide-react';

interface ApkDownloadOverlayProps {
  progress: number;
}

export default function ApkDownloadOverlay({ progress }: ApkDownloadOverlayProps) {
  return (
    <motion.div
      key="apk-download-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apk-download-title"
      aria-busy="true"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="apk-orbit-ring apk-orbit-ring--1" />
        <div className="apk-orbit-ring apk-orbit-ring--2" />
        <div className="apk-orbit-ring apk-orbit-ring--3" />
      </div>

      <motion.div
        initial={{ scale: 0.85, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-sm text-center"
      >
        <div className="apk-scene mx-auto mb-8">
          <div className="apk-cube">
            <div className="apk-cube-face apk-cube-face--front">
              <Bot className="w-10 h-10 text-black" />
            </div>
            <div className="apk-cube-face apk-cube-face--back" />
            <div className="apk-cube-face apk-cube-face--right" />
            <div className="apk-cube-face apk-cube-face--left" />
            <div className="apk-cube-face apk-cube-face--top" />
            <div className="apk-cube-face apk-cube-face--bottom" />
          </div>

          <motion.div
            className="apk-float-badge"
            animate={{ y: [0, -10, 0], rotateZ: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Download className="w-5 h-5 text-[#00FF94]" />
          </motion.div>
        </div>

        <h2
          id="apk-download-title"
          className="font-display font-black text-xl uppercase tracking-tight text-white mb-2"
        >
          Downloading Flowly
        </h2>
        <p className="text-xs font-mono text-zinc-400 mb-6">
          Keep this tab open until the APK finishes saving to your device.
        </p>

        <div className="relative h-2 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden mb-3">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00FF94] to-emerald-300"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.35 }}
          />
          <div className="apk-progress-shimmer absolute inset-0" />
        </div>

        <p className="text-2xl font-display font-black text-[#00FF94] tabular-nums">
          {Math.min(100, Math.round(progress))}%
        </p>
        <p className="text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-widest">
          Flowly.apk • Android package
        </p>
      </motion.div>
    </motion.div>
  );
}
