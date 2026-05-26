import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  Lock, 
  Terminal, 
  CornerDownRight, 
  Copy, 
  Check, 
  FileText, 
  ArrowUpRight,
  Database,
  Smartphone,
  Cpu,
  RefreshCw,
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
  const [copiedText, setCopiedText] = useState<'cli-sideload' | 'cli-key' | null>(null);

  // Sync activeTab if defaultTab changes
  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleCopy = (text: string, label: 'cli-sideload' | 'cli-key') => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const sections = {
    guide: {
      title: "Flowly Operational Deployment Guide",
      subtitle: "Master direct sideloading, local sqlite configuration, and private token handling on Android",
      content: (
        <div className="space-y-6 text-sm text-zinc-350 leading-relaxed">
          {/* Section 1: Android Sideloading */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-[#00FF94]/10 text-[#00FF94] font-mono text-[10px] uppercase font-black">STABLE APK</span>
              <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">1. Android Installation (Sideloading Guide)</h3>
            </div>
            <p>
              Since Flowly bypasses central Google services to ensure absolute local data sandbox integrity, we distribute the stable app builds as standard **sideloadable Android Package (`.apk`) files**. This grants you full autonomy over updates.
            </p>
            
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 space-y-3">
              <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest block">STEPS TO SIDE-LOAD:</span>
              <div className="space-y-2 font-mono text-xs text-zinc-450 text-zinc-400">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#00FF94] font-black">A.</span>
                  <span>Go to <strong className="text-white">Settings &gt; Apps &gt; Special App Access</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#00FF94] font-black">B.</span>
                  <span>Select <strong className="text-white">Install Unknown Apps</strong> and toggle permission <strong className="text-emerald-400">ON</strong> for your browser (e.g. Chrome) or file browser.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#00FF94] font-black">C.</span>
                  <span>Download the stable APK package directly, tap to unpack, and select <strong className="text-white">Install</strong>.</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-90 w-full border-zinc-900 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-zinc-400 truncate font-mono">
                <Terminal className="w-4 h-4 text-[#00FF94] shrink-0" />
                <span className="truncate">adb install -r -d flowly-android-stable.apk</span>
              </div>
              <button 
                onClick={() => handleCopy("adb install -r -d flowly-android-stable.apk", "cli-sideload")}
                className="p-1.5 hover:text-[#00FF94] text-zinc-500 transition-colors"
                title="Copy Terminal Command"
              >
                {copiedText === 'cli-sideload' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <hr className="border-zinc-90 w-full border-zinc-900/60 my-5" />

          {/* Section 2: Encrypted Storage Structure */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-[#00FF94]/10 text-[#00FF94] font-mono text-[10px] uppercase font-black">SQLITE SUBSYSTEM</span>
              <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">2. Sandboxed Storage & Backups</h3>
            </div>
            <p>
              Flowly does not operate a web crawler or external storage node. Instead, the application builds a **fully sandboxed SQLite database file** inside your native Android private sandbox directory (located under <code className="text-[#00FF94] bg-zinc-950 px-1 rounded text-xs select-all">/data/user/0/com.flowly.app/databases/</code>).
            </p>
            <p>
              This architecture guarantees that even if other apps on your phone compromise secondary folders, they are physically barred from scoping your personal notes, passwords, or agendas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-900">
                <div className="flex items-center gap-1.5 text-[11px] text-[#00FF94] font-mono font-black mb-1.5 uppercase">
                  <Database className="w-3.5 h-3.5" />
                  <span>Manual Exports</span>
                </div>
                <p className="text-xs text-zinc-500">
                  Trigger an instantaneous local backup to zip format. Your data compiles directly in your hand into standard open schemas (.md for records, .json for arrays).
                </p>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-900">
                <div className="flex items-center gap-1.5 text-[11px] text-[#00FF94] font-mono font-black mb-1.5 uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>On-Device Decryption</span>
                </div>
                <p className="text-xs text-zinc-500">
                  All databases are sealed locally with SQL-Cipher hooks (AES-256 GCM). Encrypted headers are generated on-device with zero exposure to external networks.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-zinc-90 w-full border-zinc-900/60 my-5" />

          {/* Section 3: AI Inference & Keys */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-[#00FF94]/10 text-[#00FF94] font-mono text-[10px] uppercase font-black font-extrabold">SECURE TOKENS</span>
              <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">3. Managing Private LLM API Keys</h3>
            </div>
            <p>
              To give you elite intelligence without harvesting your data, Flowly makes **direct API calls from your Android handset to Groq or Gemini's official API servers**. 
            </p>
            <p>
              We bypass intermediate cloud brokers completely. Since you supply your own API token key, there is no markup fee or potential data broker interception point.
            </p>
            
            <div className="p-3.5 bg-rose-950/20 rounded-xl border border-rose-950/40 text-rose-200 text-xs">
              <strong className="block text-rose-455 font-bold mb-1 uppercase text-[#ff8181] tracking-wide text-[10px] font-mono">🔐 ABSOLUTE SECURITY MANDATE:</strong>
              Your API key resides inside the Android Keystore system. This is a hardware-backed cryptographic environment isolating keys from standard file extraction attempts. Flowly only reads the token value at the exact millisecond an AI prompt completes.
            </div>

            <p className="text-xs text-zinc-500 font-mono">
              Note: Do NOT share your API keys in screenshots or diagnostic outputs. If you compromise your key, instantly revoke it via the <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-[#00FF94] underline hover:text-emerald-400 inline-flex items-center gap-0.5">Groq Console <ExternalLink className="w-3 h-3" /></a> or Google AI Studio dashboard.
            </p>
          </div>
        </div>
      ),
    },
    terms: {
      title: "MIT Custody & Licensing Terms",
      subtitle: "Absolute data custody brings absolute self-responsibility. Review our legal paradigm rules.",
      content: (
        <div className="space-y-6 text-sm text-zinc-350 leading-relaxed">
          <div className="space-y-3">
            <p className="text-xs text-zinc-500 font-mono">
              EFFECTIVE DATE: MAY 24, 2026 · VERSION 1.1.0-STABLE · MIT CUSTODY FRAMEWORK
            </p>
            <p>
              Please read these Terms of Custody ("Terms") completely before installing, sideloading, or bootstrapping the Flowly Android Application. By utilizing this client, you explicitly agree that your relationship with data storage is self-governed and completely non-custodial.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            
            {/* Rule 1 */}
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#00FF94] uppercase tracking-wide">1. Self-Custody of Data Backups</h4>
              <p className="text-xs text-zinc-400">
                Because Flowly is designed around custom database-free schemas and strictly on-device SQLite parameters, we possess **zero central servers**, operate no remote user clouds, and keep no records of your digital identity. 
              </p>
              <p className="text-xs text-rose-300 font-bold border-l-2 border-rose-500 pl-2">
                CRITICAL WARNING: If you lose your handset, uninstall the application, or compromise your operating partition without triggering a local manual backup ZIP, your workspace records are mathematically unrecoverable. We cannot restore your notes.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#00FF94] uppercase tracking-wide">2. AI API Inferences Limit & Costs</h4>
              <p className="text-xs text-zinc-400">
                By configuring third-party integration keys (e.g. Groq, Google Gemini), you acknowledge that any queries submitted to the AI are subject directly to their licensing terms. You are fully responsible for any credit consumption incurred directly on your key arrays.
              </p>
            </div>

            {/* Rule 3 */}
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#00FF94] uppercase tracking-wide">3. Code Modification & Distribution</h4>
              <p className="text-xs text-zinc-400">
                Flowly is licensed under the standard, permissive MIT Open Source Paradigm. You are free to compile, hard-fork, adjust, or repackage Flowly binaries for distribution as long as original attribution keys are preserved.
              </p>
            </div>

            {/* Warranty Disclaimer */}
            <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-900/60 font-mono text-[11px] text-zinc-500 space-y-1">
              <p className="font-bold text-zinc-400 uppercase">NO WARRANTY (MIT LICENSE PARAGRAPH):</p>
              <p>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </p>
            </div>

          </div>
        </div>
      ),
    },
    privacy: {
      title: "Flowly Off-Grid Privacy Mandate",
      subtitle: "Zero trackers. Zero cookies. Zero telemetry. Local custody that operates completely off-grid.",
      content: (
        <div className="space-y-6 text-sm text-zinc-350 leading-relaxed justify-start text-left">
          <div className="space-y-3">
            <p className="text-xs text-zinc-500 font-mono">
              EFFECTIVE DATE: MAY 24, 2026 · ZERO TELEMETRY COLLECTION MANDATE
            </p>
            <p>
              Most traditional privacy policies describe how, when, and where your data is packaged, compiled, and distributed to third-party ad brokers or diagnostic telemetry servers. 
            </p>
            <p className="font-bold text-white">
              Flowly does not operate a telemetry registry. Therefore, the codebase maintains no pipelines to capture, process, or sell any of your digital actions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <div className="text-[10px] font-mono font-black text-[#00FF94] uppercase mb-1">0% Cookies</div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                No tracking cookies, session cookies, or device fingerprint scripts are embedded.
              </p>
            </div>
            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <div className="text-[10px] font-mono font-black text-[#00FF94] uppercase mb-1">Local Sandbox</div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Notes, schedules, and priority metrics reside firmly in the sandboxed local SQLite database.
              </p>
            </div>
            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <div className="text-[10px] font-mono font-black text-[#00FF94] uppercase mb-1">No Brokers</div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                No analytics nodes (such as Firebase or Mixpanel) track layout engagement or menu triggers.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00FF94]" />
              <h4 className="text-xs font-display font-black text-white uppercase tracking-wider">GDPR & HIPAA Self-Management</h4>
            </div>
            <p className="text-xs text-zinc-400">
              According to definitions outlined by the General Data Protection Regulation (GDPR) and the Health Insurance Portability and Accountability Act (HIPAA), data remains protected when the end-user exercises exclusive, local physical custody of their databases.
            </p>
            <p className="text-xs text-zinc-450 text-zinc-500">
              Because Flowly operates exclusively as a client-side instrument on your immediate Android hardware, we are not a "Data Controller" or a "Data Processor" under the law. You hold absolute custody.
            </p>

            <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-900 border-l-[#00FF94] border-l-2">
              <span className="text-[10px] font-mono font-black text-white uppercase block mb-1">Direct API Logs</span>
              <p className="text-xs text-zinc-400">
                When sending questions to LLM terminals (such as Groq's Llama host), the payloads are directly transmitted using industry-standard TLS 1.3 encryption. Your query never touches a middleman buffer controlled by Flowly.
              </p>
            </div>
          </div>
        </div>
      ),
    }
  };

  // Pre-filter sections based on search queries
  const filteredSectionContent = useMemo(() => {
    if (!searchQuery.trim()) return sections[activeTab].content;
    
    // Just dynamic warning for matching queries
    return (
      <div className="space-y-4">
        <p className="text-xs font-mono text-zinc-500 uppercase">Search Results for "{searchQuery}" inside {activeTab.toUpperCase()}:</p>
        <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 text-xs space-y-3">
          <p className="text-zinc-[#00FF94] text-zinc-350">
            Scanning documentation matrices... Flowly's completely local SQLite sandbox isolates all data tags related to <span className="text-[#00FF94] font-bold">"{searchQuery}"</span>.
          </p>
          <p className="text-zinc-500 leading-relaxed text-[11px]">
            Please clear the search filter or read the primary {activeTab === 'guide' ? 'Android Installation Guide' : activeTab === 'terms' ? 'MIT Custody Terms' : 'Off-Grid Privacy Mandate'} below to locate the complete security and deployment walkthrough.
          </p>
          <button 
            onClick={() => setSearchQuery('')}
            className="text-[10px] font-mono font-bold text-[#00FF94] uppercase bg-[#00FF94]/10 px-2 py-1 rounded"
          >
            Clear Search Filter
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
          {/* Main Panel Content Box */}
          <motion.div 
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-4xl h-[85vh] sm:h-[80vh] bg-[#0c0c0c] rounded-2xl flex flex-col overflow-hidden border border-zinc-900 shadow-2xl shadow-green-950/20"
          >
            {/* 1. Header Details */}
            <div className="p-4.5 sm:p-5 border-b border-zinc-900 bg-zinc-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#00FF94]/10 text-[#00FF94] shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-display font-black text-white uppercase tracking-wider">Flowly Handset Core Documentation</h2>
                  <p className="text-[10px] text-zinc-500 font-mono">SQLite Systems • Sideload Deployment Logs • Absolute Security</p>
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

            {/* 2. Sub-Header Query Finder & Menu bar */}
            <div className="px-4.5 py-3 border-b border-zinc-905 border-zinc-900 bg-[#0e0e0e] flex flex-col md:flex-row gap-3 items-center justify-between text-left">
              {/* Category tabs */}
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold shrink-0 w-full md:w-auto overflow-x-auto scrollbar-none">
                <button 
                  onClick={() => { setActiveTab('guide'); setSearchQuery(''); }}
                  className={`p-2 px-3 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === 'guide' ? 'bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94]' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  ⚡ Operational Guide
                </button>
                <button 
                  onClick={() => { setActiveTab('terms'); setSearchQuery(''); }}
                  className={`p-2 px-3 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === 'terms' ? 'bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94]' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  📖 Licence details
                </button>
                <button 
                  onClick={() => { setActiveTab('privacy'); setSearchQuery(''); }}
                  className={`p-2 px-3 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === 'privacy' ? 'bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94]' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  🛡️ Privacy Mandate
                </button>
              </div>

              {/* Instant documentation search */}
              <div className="relative flex items-center w-full md:w-64 border border-zinc-90 w-full border-zinc-900 bg-zinc-950 px-2.5 py-1.5 rounded-lg">
                <Search className="w-3.5 h-3.5 text-zinc-600 mr-2 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Query doc keys..."
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

            {/* 3. Primary Reader Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 text-left custom-scrollbar bg-black/20">
              
              {/* Current tab subtitle banner */}
              {!searchQuery && (
                <div className="space-y-1 pb-4 border-b border-zinc-900/60">
                  <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-tight">
                    {sections[activeTab].title}
                  </h3>
                  <p className="text-xs text-[#00FF94]/80 font-mono">
                    {sections[activeTab].subtitle}
                  </p>
                </div>
              )}

              {/* Render dynamic tab content */}
              <div className="pt-2">
                {filteredSectionContent}
              </div>

            </div>

            {/* 4. Mini Footer Indicator */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-905 border-zinc-900 text-[10px] font-mono text-zinc-500 flex justify-between items-center sm:px-6 select-none">
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-3 h-3 text-[#00FF94]" />
                <span>Optimized purely for Android Handset Sandbox</span>
              </div>
              <span className="hidden sm:inline">Flowly v1.0.3 • Verified Stable Sideload Package</span>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
