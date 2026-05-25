import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Settings,
  Shield,
  FileCheck,
  Chrome,
  Smartphone,
} from 'lucide-react';
import { isAndroidDevice, isChromeBrowser } from '../lib/apkDownload';

interface InstallInstructionsModalProps {
  open: boolean;
  onClose: () => void;
  onDownloadAgain: () => void;
}

const steps = [
  {
    icon: Download,
    title: 'Open your download',
    body: 'Pull down notifications and tap Flowly.apk, or open Files → Downloads and tap the file.',
  },
  {
    icon: Shield,
    title: 'Allow installs from this source',
    body: 'If Android asks, tap Settings on the prompt, then turn on Allow from this source for Chrome (or your browser).',
  },
  {
    icon: FileCheck,
    title: 'Install Flowly',
    body: 'Tap Install, then Open. You only need to allow unknown apps once per browser.',
  },
];

export default function InstallInstructionsModal({
  open,
  onClose,
  onDownloadAgain,
}: InstallInstructionsModalProps) {
  const onAndroid = isAndroidDevice();
  const onChrome = isChromeBrowser();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 safe-area-x overscroll-none"
          style={{ minHeight: '100dvh' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="install-guide-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col w-full max-w-lg max-h-[min(92dvh,100%)] sm:max-h-[90dvh] rounded-t-2xl sm:rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-[#00FF94]/5 overflow-hidden"
          >
            <div className="flex-shrink-0 flex justify-center pt-2 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-zinc-700" aria-hidden />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-10 touch-target p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              aria-label="Close install instructions"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 pb-2 space-y-4 sm:space-y-5 safe-area-bottom">
              <div className="pr-12 space-y-2 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#00FF94]/30 bg-[#00FF94]/10 text-[10px] font-mono text-[#00FF94] uppercase tracking-widest font-bold">
                  <Smartphone className="w-3 h-3 flex-shrink-0" />
                  <span>Install guide</span>
                </div>
                <h2
                  id="install-guide-title"
                  className="font-display font-black text-lg sm:text-2xl text-white uppercase tracking-tight leading-tight"
                >
                  {onAndroid ? 'Finish installing on Android' : 'Install on your Android phone'}
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {onAndroid
                    ? 'Your APK should be in Downloads. Follow these steps if Android blocks the install.'
                    : 'Transfer Flowly.apk to your Android device, or open this page on your phone to install directly.'}
                </p>
              </div>

              <ol className="space-y-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <li
                      key={step.title}
                      className="flex gap-3 p-3 sm:p-3.5 rounded-xl border border-zinc-900 bg-black/40"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00FF94] text-black flex items-center justify-center font-display font-black text-sm">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1 text-left space-y-1">
                        <div className="flex items-start gap-1.5 flex-wrap">
                          <Icon className="w-3.5 h-3.5 text-[#00FF94] flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-semibold text-zinc-100">{step.title}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{step.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {(onAndroid || onChrome) && (
                <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 sm:p-4 space-y-2.5 text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Chrome className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Chrome: allow unknown apps
                    </span>
                  </div>
                  <ul className="text-xs text-zinc-400 space-y-2 pl-1 leading-relaxed">
                    <li className="flex gap-2">
                      <span className="text-amber-400 flex-shrink-0">•</span>
                      <span>
                        Open <strong className="text-zinc-300">Settings → Apps → Chrome</strong> (or long-press Chrome → App info).
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 flex-shrink-0">•</span>
                      <span>
                        Tap <strong className="text-zinc-300">Install unknown apps</strong>.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 flex-shrink-0">•</span>
                      <span>
                        Enable <strong className="text-zinc-300">Allow from this source</strong> for Chrome.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 flex-shrink-0">•</span>
                      <span>
                        Return to Downloads, tap <strong className="text-zinc-300">Flowly.apk</strong>, then Install.
                      </span>
                    </li>
                  </ul>
                  <p className="text-[10px] font-mono text-zinc-500 flex items-start gap-1.5">
                    <Settings className="w-3 h-3 mt-0.5 flex-shrink-0 text-zinc-500" />
                    <span>
                      Samsung / Xiaomi: Settings → Security → Install unknown apps → Chrome.
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex flex-col gap-2.5 p-4 pt-2 border-t border-zinc-900 bg-zinc-950 safe-area-bottom">
              <button
                type="button"
                onClick={onDownloadAgain}
                className="touch-target w-full p-3.5 rounded-xl bg-[#00FF94] active:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all font-display"
              >
                Download again
              </button>
              <button
                type="button"
                onClick={onClose}
                className="touch-target w-full p-3.5 rounded-xl bg-zinc-900 active:bg-zinc-800 text-zinc-200 font-bold text-xs uppercase tracking-wider border border-zinc-800 transition-all font-display"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
