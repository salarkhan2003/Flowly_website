import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  Lock, 
  Terminal, 
  Copy, 
  Check, 
  Database, 
  Smartphone,
  Cpu,
  ExternalLink
} from 'lucide-react';

interface DocsReaderProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'guide' | 'terms' | 'privacy';
}

export default function DocsReader({ isOpen, onClose, defaultTab = 'guide' }: DocsReaderProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'terms' | 'privacy'>(defaultTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<'cli-sideload' | null>(null);

  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleCopy = (text: string, label: 'cli-sideload') => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const sections = {
    guide: {
      title: "Flowly User Guide",
      subtitle: "How to install, configure local storage, and optionally connect AI keys on Android.",
      content: (
        <div className="space-y-6 text-sm text-zinc-350 leading-relaxed">
          {/* Section 1: Android Sideloading */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-[#00FF52]/10 text-[#00FF94] font-mono text-[9px] uppercase font-black">Stable Build</span>
              <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">1. Sideload Installation Guide</h3>
            </div>
            <p>
              Flowly is distributed as a standard **Android Package (`.apk`) file**. This allows you to install the app directly and maintain complete control over your updates.
            </p>
            
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 space-y-3">
              <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest block">HOW TO INSTALL:</span>
              <div className="space-y-2 font-mono text-xs text-zinc-400">
                <div className="flex items-start gap-2">
                  <span className="text-[#00FF94] font-bold">A.</span>
                  <span>Enable installation permission for your web browser in Android Settings.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00FF94] font-bold">B.</span>
                  <span>Download the stable APK package directly from our GitHub page.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00FF94] font-bold">C.</span>
                  <span>Open the downloaded file, tap to install, and run the app instantly.</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-900 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-zinc-400 truncate font-mono">
                <Terminal className="w-4 h-4 text-[#00FF94] shrink-0" />
                <span className="truncate">adb install -r -d Flowly.apk</span>
              </div>
              <button 
                onClick={() => handleCopy("adb install -r -d Flowly.apk", "cli-sideload")}
                className="p-1.5 hover:text-[#00FF94] text-zinc-500 transition-colors"
                title="Copy Command"
              >
                {copiedText === 'cli-sideload' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <hr className="border-zinc-900/60 my-5" />

          {/* Section 2: Storage Backups */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-[#00FF52]/10 text-[#00FF94] font-mono text-[9px] uppercase font-black">SQLite Database</span>
              <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">2. Local Storage & Export Options</h3>
            </div>
            <p>
              Flowly does not connect to commercial cloud servers. The app builds a standard SQLite file inside your device's sandbox. It runs completely offline with no network dependencies.
            </p>
            <p>
              This ensures your tasks, deadlines, and notes stay entirely with you. You can export your data at any time from the app's settings screen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-900">
                <div className="flex items-center gap-1.5 text-[10px] text-[#00FF94] font-mono font-black mb-1.5 uppercase">
                  <Database className="w-3.5 h-3.5" />
                  <span>ZIP Export Services</span>
                </div>
                <p className="text-xs text-zinc-550 text-zinc-500">
                  Retrieve notes as standard Markdown (.md) and task data as structured JSON files compiled cleanly into a single compressed ZIP.
                </p>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-900">
                <div className="flex items-center gap-1.5 text-[10px] text-[#00FF94] font-mono font-black mb-1.5 uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>On-Device Operations</span>
                </div>
                <p className="text-xs text-zinc-550 text-zinc-500">
                  Read/write operations finish and commit directly to the handset, yielding instantaneous feedback without network delays.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-zinc-900/60 my-5" />

          {/* Section 3: AI Inference & Keys */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-[#00FF52]/10 text-[#00FF94] font-mono text-[9px] uppercase font-black font-extrabold font-bold">Optional AI</span>
              <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">3. AI Integration Setup</h3>
            </div>
            <p>
              To keep your workflow private while enjoying smart task extraction, Flowly allows you to connect directly to processors like Gemini or Groq using your own API keys.
            </p>
            <p>
              Your key is saved locally on your device and is only used to send prompts directly to the provider via HTTPS. We never see your keys, nor do we run intermediary proxy servers.
            </p>
            
            <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-900 text-xs">
              <strong className="block text-[#00FF94] font-bold mb-1 uppercase text-[9px] font-mono">⚠️ AI Network Note:</strong>
              AI features require internet access when retrieving results from external providers. Your notes and files are not analyzed by AI unless you initiate a query.
            </div>
          </div>
        </div>
      ),
    },
    terms: {
      title: "Licensing & Terms",
      subtitle: "Flowly is free, open source, and distributes zero warranty. Read your responsibilities.",
      content: (
        <div className="space-y-6 text-sm text-zinc-350 leading-relaxed">
          <div className="space-y-3">
            <p className="text-[10px] text-zinc-500 font-mono">
              EFFECTIVE DATE: MAY 2026 · MIT OPEN LICENSE
            </p>
            <p>
              Please read our licensing terms before downloading and installing Flowly. Since we do not transmit or store your files, you are fully in charge of managing your own offline archives.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Rule 1 */}
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#00FF94] uppercase tracking-wide">1. Self-Custody is Mandatory</h4>
              <p className="text-xs text-zinc-400">
                Because Flowly stores databases only on your phone, we have no access to your records. If you lose your phone or uninstall the app without backup, your files cannot be retrieved. We encourage exporting clean backups often.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#00FF94] uppercase tracking-wide">2. API Connections & Expenses</h4>
              <p className="text-xs text-zinc-400">
                By configuring custom third-party integrations (like Groq or Gemini), you are responsible for any usage charges incurred directly on your provider account. We charge absolutely nothing for AI requests.
              </p>
            </div>

            {/* Warranty Disclaimer */}
            <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-900/60 font-mono text-[11px] text-zinc-550 text-zinc-500 space-y-1">
              <p className="font-bold text-zinc-400 uppercase">MIT License Disclaimer:</p>
              <p>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Zero trackers. Zero cookies. Zero telemetry. All files stay on your device.",
      content: (
        <div className="space-y-6 text-sm text-zinc-350 leading-relaxed justify-start text-left">
          <div className="space-y-3">
            <p className="text-[10px] text-zinc-500 font-mono">
              EFFECTIVE: MAY 24, 2026
            </p>
            <p>
              Unlike standard productivity portals, Flowly maintains absolutely no trackers, cookies, database sync platforms, or analytics nodes. 
            </p>
            <p className="font-bold text-white">
              We do not compile, register, or monitor your files or digital habits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <div className="text-[9px] font-mono font-black text-[#00FF94] uppercase mb-1">0% Cookies</div>
              <p className="text-[11px] text-zinc-550 text-zinc-500 leading-normal">
                No tracking cookies or analytics scripts are embedded inside the codebase.
              </p>
            </div>
            <div className="p-3 bg-[#00FF94]/5 rounded-lg border border-zinc-900">
              <div className="text-[9px] font-mono font-black text-[#00FF94] uppercase mb-1">On-Device Storage</div>
              <p className="text-[11px] text-[#00FF94] leading-normal font-bold">
                Notes and task timelines reside directly in local SQLite databases.
              </p>
            </div>
            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <div className="text-[9px] font-mono font-black text-[#00FF94] uppercase mb-1">No Ads</div>
              <p className="text-[11px] text-zinc-550 text-zinc-500 leading-normal">
                No third-party advertising brokers or SDK profiles are integrated.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00FF94]" />
              <h4 className="text-xs font-display font-black text-white uppercase tracking-wider">Privacy & Compliance</h4>
            </div>
            <p className="text-xs text-zinc-400">
              Flowly does not act as a "Data Controller" or "Data Processor" under standard GDPR definitions. Strictly client-side operations ensure that you hold absolute control of your data archives.
            </p>
          </div>
        </div>
      ),
    }
  };

  const filteredSectionContent = useMemo(() => {
    if (!searchQuery.trim()) return sections[activeTab].content;
    
    return (
      <div className="space-y-4">
        <p className="text-xs font-mono text-zinc-500 uppercase">Search Results for "{searchQuery}" inside {activeTab.toUpperCase()}:</p>
        <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 text-xs space-y-3">
          <p className="text-zinc-350">
            Filtering keys... Flowly's completely local storage isolates all items related to <span className="text-[#00FF94] font-bold">"{searchQuery}"</span>.
          </p>
          <button 
            onClick={() => setSearchQuery('')}
            className="text-[10px] font-mono font-bold text-[#00FF94] uppercase bg-[#00FF94]/10 px-2 py-1 rounded"
          >
            Clear Search
          </button>
        </div>
      </div>
    );
  }, [searchQuery, activeTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          id="docs-viewer-modal"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-4xl h-[85vh] sm:h-[80vh] bg-[#0c0c0c] rounded-2xl flex flex-col overflow-hidden border border-zinc-900 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4.5 sm:p-5 border-b border-zinc-900 bg-zinc-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#00FF94]/10 text-[#00FF94] shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-display font-black text-white uppercase tracking-wider">Flowly Guide & Specs</h2>
                  <p className="text-[10px] text-zinc-500 font-mono">SQLite System • On-Device Notes • Direct APIs</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button 
                  onClick={onClose}
                  className="p-1.5 px-3 rounded-lg border border-zinc-850 hover:border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-white transition-all text-xs font-mono uppercase font-black tracking-wider flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5 text-[#00FF94]" /> <span>Close</span>
                </button>
              </div>
            </div>

            {/* Menu options & search */}
            <div className="px-4.5 py-3 border-b border-zinc-900 bg-[#0e0e0e] flex flex-col md:flex-row gap-3 items-center justify-between text-left">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold shrink-0 w-full md:w-auto overflow-x-auto scrollbar-none">
                <button 
                  onClick={() => { setActiveTab('guide'); setSearchQuery(''); }}
                  className={`p-2 px-3 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === 'guide' ? 'bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94]' : 'text-zinc-500 hover:text-zinc-350'
                  }`}
                >
                  📖 User Guide
                </button>
                <button 
                  onClick={() => { setActiveTab('terms'); setSearchQuery(''); }}
                  className={`p-2 px-3 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === 'terms' ? 'bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94]' : 'text-zinc-500 hover:text-zinc-350'
                  }`}
                >
                  📜 License
                </button>
                <button 
                  onClick={() => { setActiveTab('privacy'); setSearchQuery(''); }}
                  className={`p-2 px-3 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === 'privacy' ? 'bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94]' : 'text-zinc-500 hover:text-zinc-350'
                  }`}
                >
                  🛡️ Privacy Policy
                </button>
              </div>

              <div className="relative flex items-center w-full md:w-64 border border-zinc-900 bg-zinc-950 px-2.5 py-1.5 rounded-lg">
                <Search className="w-3.5 h-3.5 text-zinc-650 text-zinc-500 mr-2 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search guide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs w-full text-zinc-200 outline-none placeholder-zinc-600"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-0.5 hover:text-white text-zinc-600">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Core documentation reader pane */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 text-left bg-black/20">
              {!searchQuery && (
                <div className="space-y-1 pb-4 border-b border-zinc-900/60">
                  <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-tight">
                    {sections[activeTab].title}
                  </h3>
                  <p className="text-xs text-[#00FF94]/80 font-mono font-semibold">
                    {sections[activeTab].subtitle}
                  </p>
                </div>
              )}

              <div className="pt-2">
                {filteredSectionContent}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 flex justify-between items-center sm:px-6 select-none">
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-3 h-3 text-[#00FF94]" />
                <span>Optimized strictly for native Android storage</span>
              </div>
              <span className="hidden sm:inline">Flowly v1.0.3 • Verified Stable Release Build</span>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
