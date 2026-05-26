import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CloudOff, 
  ShieldCheck, 
  Lock, 
  Check, 
  Download, 
  ChevronRight, 
  HelpCircle, 
  Heart,
  ChevronDown,
  Sparkle,
  Smartphone,
  BookOpen,
  Github,
  Eye,
  Activity,
  Users
} from 'lucide-react';
import InteractiveAppMockup from './components/InteractiveAppMockup';
import FeaturesGrid from './components/FeaturesGrid';
import SecurityPhilosophy from './components/SecurityPhilosophy';
import WhyLocalFirst from './components/WhyLocalFirst';
import AppScreenshots from './components/AppScreenshots';
import DocsReader from './components/DocsReader';
import WhatsNew from './components/WhatsNew';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Real-time tracking stats state (initialized as null, will fetch on load)
  const [stats, setStats] = useState<{ views: number; downloads: number; liveUsers: number } | null>(null);

  useEffect(() => {
    // 1. Report a page view on load and retrieve current statistics
    fetch('/api/stats/view', { method: 'POST' })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => {
        console.warn('Could not post view status on mount:', err);
        // Fallback to simple stats GET query
        fetch('/api/stats')
          .then(res => res.json())
          .then(data => setStats(data))
          .catch(() => {});
      });

    // 2. Refresh statistics periodically every 8 seconds
    const interval = setInterval(() => {
      fetch('/api/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(() => {});
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleDownloadClick = () => {
    fetch('/api/stats/download', { method: 'POST' })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => {
        console.warn('Could not register download click event:', err);
        // Instant response optimistically incrementing locally so UI feedback remains active
        if (stats) {
          setStats({ ...stats, downloads: stats.downloads + 1 });
        }
      });
  };

  // Docs Modal states
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [docsDefaultTab, setDocsDefaultTab] = useState<'guide' | 'terms' | 'privacy'>('guide');

  const openDocsTab = (tab: 'guide' | 'terms' | 'privacy') => {
    setDocsDefaultTab(tab);
    setIsDocsOpen(true);
  };

  const faqs = [
    {
      q: "Where exactly is my data saved?",
      a: "Everything is kept on-device inside your Android platform's safe storage (using local SQLite storage). There are no cloud sync backends, no tracking servers, and zero data leaves your phone unless you request a manual JSON or Markdown ZIP backup."
    },
    {
      q: "How does the optional AI assistant connect to services?",
      a: "Flowly connects directly from your device to providers like Groq or Gemini using secure HTTPS requests. You save your own API key locally on your device. We run no database or proxy server to capture or store your query content."
    },
    {
      q: "Is there a backup and export feature?",
      a: "Yes. In the settings menu, you can export your notes as standard Markdown (.md) files and task list logs as JSON. You can move your notes to applications like Obsidian, Logseq, or VS Code instantly."
    },
    {
      q: "Why is Flowly free and open source?",
      a: "By building a local-first service, we pay zero central hosting or database synchronization fees, meaning we have no overhead costs to pass down to you. Our source code is fully public on GitHub."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ffffff] selection:bg-[#00FF94]/30 selection:text-black" id="main-landing-root">
      
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00FF94]/5 via-zinc-950/0 to-transparent pointer-events-none" />

      {/* 1. HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/85 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 md:gap-5">
            {/* Logo & Version badge */}
            <a href="#" className="flex items-center gap-2 px-1 focus:outline-none animate-fade-in animate-duration-500" id="brand-logo">
              <span className="font-display font-black text-sm md:text-base tracking-tight uppercase text-white">
                Flowly
              </span>
              <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-zinc-950 border border-zinc-900 text-[#00FF94] font-bold hidden sm:inline-block">
                v1.0.3
              </span>
            </a>

            {/* Real-time statistics pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 select-none">
              {/* Live active users pill */}
              <div className="relative flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00FF94]/5 border border-[#00FF94]/20 text-[#00FF94] text-[9px] sm:text-[10px] font-mono font-bold leading-none shadow-sm shadow-[#00FF94]/5 shrink-0">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF94]"></span>
                </span>
                <span>
                  {stats ? stats.liveUsers : '...'} ACTIVE
                </span>
              </div>

              {/* Total views pill */}
              <div className="hidden sm:flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-[9px] sm:text-[10px] font-mono leading-none text-zinc-300 shrink-0">
                <Eye className="w-3 h-3 text-[#00FF94]/80" />
                <span className="font-semibold text-zinc-550 mr-0.5 hidden md:inline uppercase text-zinc-500">VIEWS:</span>
                <span className="font-black text-white">
                  {stats ? stats.views.toLocaleString() : '...'}
                </span>
              </div>

              {/* Total downloads pill */}
              <div className="hidden sm:flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-[9px] sm:text-[10px] font-mono leading-none text-zinc-300 shrink-0">
                <Download className="w-3 h-3 text-[#00FF94]/80" />
                <span className="font-semibold text-zinc-550 mr-0.5 hidden md:inline uppercase text-zinc-500">INSTALLS:</span>
                <span className="font-black text-white">
                  {stats ? stats.downloads.toLocaleString() : '...'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Jump Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            <a href="#grid-features" className="hover:text-[#00FF94] transition-colors">Features</a>
            <a href="#why-local-first" className="hover:text-[#00FF94] transition-colors font-mono">Why Local-First</a>
            <a href="#screenshots" className="hover:text-[#00FF94] transition-colors">Walkthrough</a>
            <a href="#whats-new" className="hover:text-[#00FF94] transition-colors">What's New</a>
            <a href="#faq" className="hover:text-[#00FF94] transition-colors font-mono">FAQS</a>
          </nav>

          {/* Call-to-Action Header Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button 
              onClick={() => openDocsTab('guide')}
              className="text-xs font-mono text-[#00FF94] hover:text-emerald-300 cursor-pointer focus:outline-none font-bold"
            >
              Guide 📖
            </button>
            
            <a 
              href="https://github.com/salarkhan2003/flowly" 
              target="_blank"
              rel="noreferrer"
              className="p-1.5 px-3 rounded-lg bg-zinc-950 hover:bg-zinc-900 text-zinc-300 font-bold text-xs tracking-wide flex items-center gap-1.5 transition-all font-display"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <a 
              href="https://github.com/salarkhan2003/flowly/releases/latest/download/Flowly.apk" 
              onClick={handleDownloadClick}
              className="p-1.5 px-2.5 sm:px-3 rounded-lg bg-[#00FF94] hover:bg-emerald-400 text-black font-bold text-[10px] sm:text-xs tracking-wide uppercase flex items-center gap-1 transition-all shadow-md shadow-[#00FF94]/10 font-display font-semibold shrink-0"
            >
              <span className="hidden sm:inline">Download APK</span>
              <span className="sm:hidden">Get APK</span>
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative px-4 pt-16 pb-8 md:pt-24 md:pb-12 text-center overflow-hidden animate-fade-in" id="hero">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          
          {/* Main Title Setup */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight leading-none text-center uppercase"
            >
              Flowly
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-base md:text-xl text-[#00FF94] font-mono tracking-wide uppercase font-extrabold"
            >
              Local-first workspace for Android
            </motion.p>
          </div>

          {/* Core Explainer Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed"
          >
            Notes, tasks, projects, and optional AI assistance — stored directly on your device with zero sign-up required.
          </motion.p>

          {/* Primary CTA Row */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4"
          >
            <a 
              href="https://github.com/salarkhan2003/flowly/releases/latest/download/Flowly.apk"
              onClick={handleDownloadClick}
              className="w-full sm:w-auto p-3 px-6 rounded-xl bg-[#00FF94] hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-display shadow-md shadow-[#00FF94]/10 text-center"
            >
              <Download className="w-4 h-4" />
              <span>Download APK</span>
            </a>

            <a 
              href="https://github.com/salarkhan2003/flowly"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto p-3 px-6 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-[#00FF94] hover:text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-display border border-zinc-90 w-full border-zinc-900"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
          </motion.div>

          {/* Small Trust Indicators Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-6 text-[10px] font-mono text-zinc-500 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#00FF94]" />
              <span>Local SQLite storage</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#00FF94]" />
              <span>No mandatory account</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#00FF94]" />
              <span>Optional AI integration</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#00FF94]" />
              <span>Offline-ready</span>
            </div>
          </motion.div>

        </div>

        {/* 3. APP INTERACTIVE DEMO SIMULATOR CONTAINER */}
        <div className="max-w-4xl mx-auto mt-14 md:mt-20 px-2 sm:px-4" id="interactive-demo">
          <div className="text-center mb-6 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/80 text-[9.5px] font-mono text-zinc-500 tracking-wide uppercase">
              <Sparkle className="w-3 h-3 text-[#00FF94] animate-pulse" />
              <span>Live Application Sandbox</span>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black tracking-tight text-white uppercase">Test-drive the Flowly Interface</h2>
            <p className="text-xs text-zinc-400">Interact with tasks, drafts, or ask Llama questions inside the mockup handset below.</p>
          </div>
          
          <InteractiveAppMockup />
        </div>
      </section>

      {/* 4. DETAILS FEATURES EXPOSURE SECTION */}
      <section className="bg-zinc-950/20 border-y border-zinc-900/45">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <FeaturesGrid />
        </div>
      </section>

      {/* Why Local-First Section */}
      <WhyLocalFirst />

      {/* Interactive App Screenshots Walkthrough Section */}
      <AppScreenshots />

      {/* 5. COGNITIVE RELIEF COMPARISON & ARCHITECTURE */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <SecurityPhilosophy />
      </section>

      {/* 5.5 WHAT'S NEW SECTION */}
      <WhatsNew onDownloadClick={handleDownloadClick} />

      {/* 6. EXPANDED FAQS */}
      <section className="bg-black/40 border-t border-zinc-900" id="faq">
        <div className="max-w-3xl mx-auto px-4 py-16 space-y-8 text-left">
          
          {/* FAQ Headline */}
          <div className="space-y-3 border-b border-zinc-900 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-black text-[10px] font-mono text-[#00FF94] tracking-widest uppercase font-bold">
              <HelpCircle className="w-3.5 h-3.5 text-[#00FF94]" />
              <span>FAQS</span>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight">
              Common Questions
            </h2>
            <p className="text-xs text-zinc-400">Everything you need to know about setting up and running Flowly local database files.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-xl transition-all duration-200 ${
                    isOpen 
                      ? 'bg-zinc-950 border-zinc-800 shadow-lg' 
                      : 'bg-black/25 border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-xs font-semibold text-zinc-100 focus:outline-none"
                  >
                    <span className="text-left leading-relaxed">{faq.q}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 flex-shrink-0 ml-3 ${
                      isOpen ? 'transform rotate-180 text-[#00FF94]' : ''
                    }`} />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-56 border-t border-zinc-900 p-4' : 'max-h-0'
                  }`}>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. BOTTOM CALL-TO-ACTION (CTA) SECTION */}
      <section className="relative overflow-hidden py-16 md:py-24 text-center border-t border-zinc-900" id="download">
        {/* Ambient background accent */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00FF94]/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-xl mx-auto px-4 space-y-6 relative z-10 text-center">
          
          <h2 className="text-2xl md:text-4xl font-display font-black text-white tracking-tight uppercase leading-none">
            Get Flowly Today
          </h2>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
            Ready to set up your offline notebook? Download the native Flowly APK for your Android device below. Free, open source, and no accounts required.
          </p>

          {/* Secondary Download Button Panel Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a 
              href="https://github.com/salarkhan2003/flowly/releases/latest/download/Flowly.apk"
              onClick={handleDownloadClick}
              className="w-full sm:w-auto p-3 px-6 rounded-xl bg-[#00FF94] hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#00FF94]/10 transition-all font-display border border-zinc-850 text-center"
            >
              <Download className="w-4 h-4 text-black" />
              <span>Download APK</span>
            </a>

            <a 
              href="https://github.com/salarkhan2003/flowly"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto p-3 px-6 rounded-xl bg-zinc-90 w-full bg-zinc-950 hover:bg-zinc-900 text-[#00FF94] hover:text-[#00FF94] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-display border border-zinc-85 w-full border-zinc-900 text-center"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
            
            <button 
              onClick={() => openDocsTab('guide')}
              className="w-full sm:w-auto p-3 px-6 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-display border border-zinc-90 w-full border-zinc-900"
            >
              <BookOpen className="w-4 h-4" />
              <span>User Guide</span>
            </button>
          </div>

          <p className="text-[10px] font-mono text-zinc-500 pt-2">
            AI features require internet access when retrieving results from providers like Groq or Gemini.
          </p>

        </div>
      </section>

      {/* 8. HIGH-POLISHED STARK FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5">
              <span className="font-display font-black text-sm tracking-tight text-white">FLOWLY</span>
              <span className="text-[8px] font-mono px-1 border border-zinc-800 text-zinc-500 rounded bg-zinc-900/50">LOCAL DB</span>
            </div>
            <p className="text-[11px] text-zinc-550 text-zinc-500">Your notes and tasks under local ownership. Optional AI helper.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[10px] text-zinc-500 font-mono">
            <a href="https://github.com/salarkhan2003/flowly" target="_blank" rel="noreferrer" className="hover:text-zinc-350 transition-colors">GitHub</a>
            <span>•</span>
            <button 
              onClick={() => openDocsTab('terms')} 
              className="hover:text-zinc-350 transition-colors focus:outline-none cursor-pointer"
            >
              Terms & Licenses
            </button>
            <span>•</span>
            <button 
              onClick={() => openDocsTab('privacy')} 
              className="hover:text-zinc-350 transition-colors focus:outline-none cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-[10px] text-zinc-500 flex items-center justify-center md:justify-end gap-1 select-none font-mono">
              <span>Stable Release Build v1.0.3</span>
              <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
              <span>2026</span>
            </p>
          </div>

        </div>
      </footer>

      {/* Embedded High-contrast Documentation Reader */}
      <DocsReader 
        isOpen={isDocsOpen} 
        onClose={() => setIsDocsOpen(false)} 
        defaultTab={docsDefaultTab} 
      />

    </div>
  );
}
