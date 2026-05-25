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
    body: 'Pull down the notification shade and tap Flowly.apk, or open Files → Downloads and tap the file.',
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
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="install-guide-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-[#00FF94]/5"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              aria-label="Close install instructions"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-5 sm:p-6 space-y-5">
              <div className="pr-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#00FF94]/30 bg-[#00FF94]/10 text-[10px] font-mono text-[#00FF94] uppercase tracking-widest font-bold">
                  <Smartphone className="w-3 h-3" />
                  <span>Install guide</span>
                </div>
                <h2
                  id="install-guide-title"
                  className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight"
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
                      className="flex gap-3 p-3.5 rounded-xl border border-zinc-900 bg-black/40"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00FF94] text-black flex items-center justify-center font-display font-black text-sm">
                        {index + 1}
                      </div>
                      <div className="min-w-0 text-left space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-[#00FF94]" />
                          <span className="text-sm font-semibold text-zinc-100">{step.title}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{step.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {(onAndroid || onChrome) && (
                <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 space-y-3 text-left">
                  <div className="flex items-center gap-2">
                    <Chrome className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Chrome: allow unknown apps
                    </span>
                  </div>
                  <ul className="text-xs text-zinc-400 space-y-2 list-disc list-inside leading-relaxed">
                    <li>
                      Open <strong className="text-zinc-300">Settings → Apps → Chrome</strong> (or long-press Chrome → App info).
                    </li>
                    <li>
                      Tap <strong className="text-zinc-300">Install unknown apps</strong> (or Special app access → Install unknown apps).
                    </li>
                    <li>
                      Enable <strong className="text-zinc-300">Allow from this source</strong> for Chrome.
                    </li>
                    <li>
                      Return to Downloads, tap <strong className="text-zinc-300">Flowly.apk</strong> again, then Install.
                    </li>
                  </ul>
                  <p className="text-[10px] font-mono text-zinc-500 flex items-start gap-1.5">
                    <Settings className="w-3 h-3 mt-0.5 flex-shrink-0 text-zinc-500" />
                    <span>
                      On Samsung / Xiaomi / other skins, the path may be Settings → Security → Install unknown apps → Chrome.
                    </span>
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={onDownloadAgain}
                  className="flex-1 p-3 rounded-xl bg-[#00FF94] hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all font-display"
                >
                  Download again
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold text-xs uppercase tracking-wider border border-zinc-800 transition-all font-display"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
