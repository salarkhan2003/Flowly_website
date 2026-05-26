import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Chrome, 
  FolderOpen, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  Settings, 
  Smartphone, 
  AlertTriangle 
} from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
}

export default function InstallGuideModal({ isOpen, onClose, downloadUrl }: InstallGuideModalProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const steps = [
    {
      title: "1. Allow Unknown Sources",
      short: "Unknown Apps",
      icon: <Settings className="w-5 h-5 text-[#00FF94]" />,
      description: "When downloading direct APKs on Android, your web browser (Chrome/Firefox) or file manager needs manual approval to proceed with installation.",
      instructions: [
        "Go to Settings on your Android device.",
        "Search or navigate to Apps & Notifications or Security.",
        "Tap Special App Access or Install unknown apps.",
        "Select Chrome (or your File Manager) and toggle on Allow from this source."
      ],
      interactiveView: (
        <div className="relative w-full h-48 bg-zinc-950 rounded-xl border border-zinc-900 overflow-hidden flex flex-col font-mono text-[9px] select-none text-zinc-400">
          <div className="bg-zinc-900 px-3 py-2 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] text-white font-bold flex items-center gap-1">
              <Settings className="w-3.5 h-3.5 text-[#00FF94] animate-spin-slow" />
              Settings &gt; Special Access
            </span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-center space-y-3">
            <p className="text-zinc-500 leading-tight">Install unknown apps permission</p>
            <div className="p-3 bg-zinc-900 rounded-lg flex items-center justify-between border border-zinc-800">
              <div className="flex items-center gap-2">
                <Chrome className="w-4 h-4 text-[#00FF94]" />
                <div className="text-[10px]">
                  <p className="text-white font-bold font-sans">Allow from Chrome</p>
                  <p className="text-[8px] text-zinc-500">Allow installing direct APK packages</p>
                </div>
              </div>
              <button 
                onClick={() => setIsToggled(!isToggled)}
                className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 focus:outline-none cursor-pointer ${isToggled ? 'bg-[#00FF94]' : 'bg-zinc-800'}`}
              >
                <motion.div 
                  layout
                  className="w-4 h-4 rounded-full bg-black"
                  animate={{ x: isToggled ? 16 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
            <p className="text-center text-[8px] text-zinc-500">
              {isToggled ? "✅ Permission granted! You are ready standard installer." : "👈 Tap the toggle to visualize enabling permissions"}
            </p>
          </div>
        </div>
      )
    },
    {
      title: "2. Bypass Warning Prompt",
      short: "Harmful Notice",
      icon: <ShieldAlert className="w-5 h-5 text-[#00FF94]" />,
      description: "Direct APKs trigger a generic browser safety prompt. This is completely standard since you are bypassing the Google Play Store.",
      instructions: [
        "Chrome will show 'File might be harmful. Do you want to download anyway?'",
        "Tap the button: Download anyway.",
        "Flowly is an offline-first system, fully open-source, and never connects to external servers without your direct action."
      ],
      interactiveView: (
        <div className="relative w-full h-48 bg-zinc-950 rounded-xl border border-zinc-900 overflow-hidden flex flex-col font-mono text-[9px] select-none">
          <div className="bg-zinc-900 px-3 py-1.5 border-b border-zinc-800 text-[10px] text-zinc-400 flex items-center gap-1">
            <Chrome className="w-3 h-3 text-zinc-400" />
            <span>chrome://downloads</span>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-center items-center">
            <div className="max-w-[240px] px-3.5 py-3 rounded-xl bg-zinc-900 border border-amber-500/20 text-center space-y-2.5 shadow-xl">
              <div className="flex justify-center">
                <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-sans font-bold text-white">File might be harmful</p>
                <p className="text-[8px] leading-tight text-zinc-400">Do you want to download Flowly.apk anyway?</p>
              </div>
              <div className="flex gap-2 justify-center pt-1">
                <button className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 text-[8px] font-sans cursor-not-allowed">
                  Cancel
                </button>
                <button className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-450 text-black text-[8px] font-sans font-bold animate-pulse">
                  Download anyway
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Fast Tap & Launch",
      short: "Tap & Install",
      icon: <CheckCircle2 className="w-5 h-5 text-[#00FF94]" />,
      description: "Once the download finishes, launch the package installer bubble to extract the secure resources instantly.",
      instructions: [
        "Tap Open on the browser banner or inside your notifications drawer.",
        "Your phone will prompt: 'Do you want to install this app?'",
        "Tap Install and once compiled, select Open to experience local-first work!"
      ],
      interactiveView: (
        <div className="relative w-full h-48 bg-zinc-950 rounded-xl border border-zinc-900 overflow-hidden flex flex-col font-mono text-[9px] select-none">
          <div className="bg-zinc-900 px-3 py-1.5 border-b border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Smartphone className="w-3.5 h-3.5 text-[#00FF94]" />
              Android Package Installer
            </span>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-[230px] p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[#00FF94] font-sans font-black text-xs border border-[#00FF94]/20 shadow-[#00FF94]/5 shadow-sm">
                  F
                </div>
                <div>
                  <p className="text-[10px] font-sans font-extrabold text-white">Flowly</p>
                  <p className="text-[8px] text-zinc-400">Do you want to install this app?</p>
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-1">
                <span className="text-[8px] text-zinc-500 font-sans cursor-not-allowed">Cancel</span>
                <span className="text-[8px] text-[#00FF94] font-sans font-bold animate-pulse hover:underline cursor-pointer">Install</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" id="install-guide-modal-root">
          
          {/* Backdrop blur layer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Centering frame helper */}
          <div className="flex min-h-screen items-center justify-center p-4">
            
            {/* Elegant 3D perspectived outer shell */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15, rotateY: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl shadow-[#00FF94]/5 grid grid-cols-1 md:grid-cols-12 select-none"
              style={{ perspective: 1200 }}
            >
              
              {/* Close Button top-right absolute */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-40 p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT COLUMN: Steps selector & human explanations */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                
                {/* Brand label & title */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94] text-[9px] font-mono font-bold uppercase tracking-wider">
                      Setup Guide
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      APK Installation standard
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight uppercase leading-none">
                    How to install Flowly
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1">
                    Your official direct-install download has triggered immediately! Follow these standard Android package instructions to launch the offline application.
                  </p>
                </div>

                {/* Grid tabs selector */}
                <div className="grid grid-cols-3 gap-2 py-1">
                  {steps.map((st, idx) => {
                    const isActive = idx === activeStep;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`p-2 rounded-xl border text-left transition-all relative cursor-pointer focus:outline-none ${
                          isActive 
                            ? 'bg-zinc-900 border-[#00FF94]/40 text-white shadow-sm' 
                            : 'bg-zinc-950 border-zinc-900 hover:bg-zinc-900/40 text-zinc-500'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`${isActive ? 'text-[#00FF94]' : 'text-zinc-600'}`}>
                            {st.icon}
                          </span>
                        </div>
                        <p className="text-[9px] font-mono font-extrabold tracking-wider uppercase truncate">
                          {st.short}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Tab specific guide content */}
                <div className="space-y-4 p-4 rounded-xl bg-zinc-950 border border-zinc-900 min-h-[160px] flex flex-col justify-center">
                  <div className="space-y-1.5">
                    <p className="text-xs font-mono text-[#00FF94] font-bold uppercase tracking-wider">
                      {steps[activeStep].title}
                    </p>
                    <p className="text-[11px] leading-relaxed text-zinc-300 font-sans">
                      {steps[activeStep].description}
                    </p>
                  </div>

                  <ul className="space-y-1 text-[10px] text-zinc-400 font-sans list-none pl-0">
                    {steps[activeStep].instructions.map((inst, i) => (
                      <li key={i} className="flex gap-2 items-start leading-tight">
                        <span className="text-[#00FF94] font-black font-mono shrink-0">▸</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next/Previous slide buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    className="p-2.5 px-4 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-900 hover:text-white transition-all text-[11px] font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <div className="flex gap-1.5 items-center">
                    {steps.map((_, i) => (
                      <span 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all ${i === activeStep ? 'w-4 bg-[#00FF94]' : 'w-1.5 bg-zinc-800'}`} 
                      />
                    ))}
                  </div>

                  {activeStep < steps.length - 1 ? (
                    <button
                      onClick={() => setActiveStep(prev => prev + 1)}
                      className="p-2.5 px-4 rounded-xl bg-zinc-950 border border-[#00FF94]/20 text-[#00FF94] hover:bg-[#00FF94]/10 transition-all text-[11px] font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Step</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={onClose}
                      className="p-2.5 px-4 rounded-xl bg-[#00FF94] hover:bg-emerald-400 text-black font-bold transition-all text-[11px] font-mono flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#00FF94]/10"
                    >
                      <span>Done, let's go!</span>
                    </button>
                  )}
                </div>

              </div>

              {/* RIGHT COLUMN: Immersion 3D tilt telephone mockup visualizer */}
              <div className="md:col-span-5 bg-zinc-950 border-t md:border-t-0 md:border-l border-zinc-900 p-6 sm:p-8 flex flex-col justify-center items-center shadow-inner relative overflow-hidden bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-transparent to-transparent">
                
                {/* Matrix grid backdrop */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

                <div className="relative w-full max-w-[280px] space-y-4 relative z-10 flex flex-col items-center">
                  
                  {/* Decorative hardware device */}
                  <motion.div 
                    initial={{ rotateX: 10, rotateY: -10, rotateZ: 2 }}
                    animate={{ 
                      rotateX: activeStep === 0 ? 8 : activeStep === 1 ? 12 : 5, 
                      rotateY: activeStep === 0 ? -8 : activeStep === 1 ? -12 : 0, 
                      scale: 1.02 
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="relative w-full aspect-[9/16] max-h-[340px] rounded-[32px] bg-[#0c0c0c] text-white p-2 border-[6px] border-zinc-900 shadow-2xl ring-1 ring-zinc-800 overflow-hidden flex flex-col justify-between"
                  >
                    
                    {/* Device screen components */}
                    <div className="w-full h-full bg-zinc-950 rounded-2xl overflow-hidden flex flex-col relative">
                      
                      {/* Dynamic view based on step */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="w-full h-full p-2 flex flex-col justify-between"
                        >
                          {steps[activeStep].interactiveView}
                        </motion.div>
                      </AnimatePresence>

                    </div>
                  </motion.div>

                  {/* Immediate Download Sync status under smartphone model */}
                  <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 font-mono text-[8.5px] text-zinc-500">
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <Download className="w-3 h-3 text-[#00FF94] animate-bounce" />
                      <span className="font-sans font-extrabold uppercase">Flowly.apk</span>
                    </div>
                    <span className="text-[#00FF94] font-medium uppercase tracking-wider">
                      Downloading Direct...
                    </span>
                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
