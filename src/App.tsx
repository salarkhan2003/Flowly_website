import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CloudOff, 
  ShieldCheck, 
  Key, 
  Bot, 
  HelpCircle, 
  Heart,
  ChevronDown,
  Sparkle,
  Smartphone
} from 'lucide-react';
import InteractiveAppMockup from './components/InteractiveAppMockup';
import FeaturesGrid from './components/FeaturesGrid';
import SecurityPhilosophy from './components/SecurityPhilosophy';
import DownloadButton from './components/DownloadButton';
import FooterStats from './components/FooterStats';
import { GITHUB_REPO_URL } from './lib/constants';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Where exactly is my data saved?",
      a: "Everything is kept secure on-device inside your Android platform's native sandboxed storage (AsyncStorage with local persistence). There are no cloud sync pipelines, no third-party web servers, and zero data leaves your handset unless you request a JSON export from Profile → Export All Data."
    },
    {
      q: "How does the private AI Assistant connect to Groq or Gemini?",
      a: "Flowly connects directly from your device to the inference endpoints (e.g., Groq's llama-3.3-70b server) using HTTPS. You store your own personal API key locally on your device's encrypted Keychain. No middleman servers proxy or retain your query or data payloads."
    },
    {
      q: "Is there an export system for backups?",
      a: "Yes. From the settings menu, you can trigger a 1-click package construction. Your entire markdown notes vault downloads as a clean ZIP of `.md` files, and your task backlog extracts as structured `.json` collections. You can take your data with you anywhere, anytime."
    },
    {
      q: "Why is Flowly free and open source?",
      a: "We believe privacy and organizational control shouldn't be constrained behind monthly subscriptions. By building a local-first software architecture, we eliminate server hosting overhead completely. No databases to manage means we have zero overhead to pass down to you!"
    }
  ];

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#050505] text-[#ffffff] selection:bg-[#00FF94]/30 selection:text-black" id="main-landing-root">
      
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00FF94]/8 via-zinc-950/0 to-transparent pointer-events-none" />
      
      {/* Giant Typography Background Text — hidden on small phones to avoid overflow */}
      <div className="absolute top-[100px] left-3 sm:left-4 md:left-[5%] z-0 pointer-events-none select-none opacity-[0.04] hidden sm:block max-w-[100vw] overflow-hidden">
        <h1 className="font-display font-black text-5xl sm:text-8xl md:text-[140px] leading-[0.85] tracking-[-2px] sm:tracking-[-4px] md:tracking-[-8px] text-zinc-100 uppercase text-left">
          OFFLINE<br />PRIVATE<br />BRAIN
        </h1>
      </div>

      {/* 1. HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-900/90 bg-black/80 backdrop-blur-md safe-area-top">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 min-h-14 sm:h-16 flex items-center justify-between gap-2">
          
          {/* Logo & Version badge */}
          <a href="#" className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-shrink focus:outline-none" id="brand-logo">
            <div className="p-1.5 rounded-lg bg-[#00FF94] text-black font-black flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight uppercase text-white truncate">
              Flowly
            </span>
            <span className="hidden min-[400px]:inline text-[8px] sm:text-[9px] font-mono px-1 sm:px-1.5 py-0.2 rounded bg-zinc-950 border border-zinc-900 text-[#00FF94] font-semibold flex-shrink-0">
              v1.0.3
            </span>
          </a>

          {/* Quick Jump Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            <a href="#grid-features" className="hover:text-[#00FF94] transition-colors">Features</a>
            <a href="#interactive-demo" className="hover:text-[#00FF94] transition-colors">Interactive App</a>
            <a href="#security-architecture" className="hover:text-[#00FF94] transition-colors">Local Trust</a>
            <a href="#faq" className="hover:text-[#00FF94] transition-colors">FAQS</a>
          </nav>

          {/* Call-to-Action Header Button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a 
              href={GITHUB_REPO_URL}
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors hidden sm:inline"
            >
              Github
            </a>
            
            <DownloadButton variant="header" />
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative px-3 sm:px-4 pt-16 sm:pt-20 pb-8 md:pt-28 md:pb-12 text-center overflow-hidden" id="hero">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          
          {/* Top Tagline Badge Overlay */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-850 bg-black/80 text-[10px] font-mono text-[#00FF94] font-bold tracking-widest uppercase mb-2 mx-auto shadow-sm"
          >
            <CloudOff className="w-3.5 h-3.5 text-[#00FF94] animate-pulse" />
            <span>The local-first AI assistant</span>
          </motion.div>

          {/* Heavy Editorial Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white tracking-tight leading-[1.05] text-center"
          >
            Own your data.<br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Scale your mind.</span>
          </motion.h1>

          {/* Clean Sub-headline */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-zinc-405 text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            No cloud. No sign-in. Your notes, tasks, and projects are stored locally on your Android device using AsyncStorage — offline-first, private, and supercharged with on-device AI.
          </motion.p>

          {/* Interactive Platform Downloads Row */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4"
          >
            <DownloadButton variant="primary" label="Download Android APK" />

            <button 
              disabled={true}
              className="w-full sm:w-auto p-3.5 px-6 rounded-xl bg-zinc-950 text-zinc-500 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-display border border-zinc-900 cursor-not-allowed"
            >
              <Smartphone className="w-4 h-4 text-zinc-700" />
              <span>Google Play Store (Soon)</span>
            </button>
          </motion.div>

          <p className="text-[10px] font-mono text-zinc-500 pt-1 select-none">
            iOS, macOS, and Windows workstation clients are coming soon!
          </p>

          {/* Compliant Badging */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-6 text-[11px] font-mono text-zinc-500"
          >
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF94]" />
              <span>100% GDPR & HIPAA Compliant Architecture</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-[#00FF94]" />
              <span>Uses Local Encrypted Index Keys</span>
            </div>
          </motion.div>

        </div>

        {/* 3. APP INTERACTIVE DEMO SIMULATOR CONTAINER */}
        <div className="max-w-5xl mx-auto mt-16 md:mt-24 px-2 sm:px-4" id="interactive-demo">
          <div className="text-center mb-6 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/80 text-[10px] font-mono text-zinc-500 tracking-wide uppercase">
              <Sparkle className="w-3 h-3 text-[#00FF94] animate-pulse" />
              <span>Try Sandbox Live Preview</span>
            </div>
            <h2 className="text-xl md:text-3xl font-display font-black tracking-tight text-white uppercase">Test-drive the Flowly Core Deck</h2>
            <p className="text-xs text-zinc-400">Click notes, tasks, or prompt the AI on the widget below</p>
          </div>
          
          <InteractiveAppMockup />
        </div>
      </section>

      {/* 4. DETAILS FEATURES EXPOSURE SECTION */}
      <section className="bg-zinc-950/25 border-y border-zinc-900/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <FeaturesGrid />
        </div>
      </section>

      {/* 5. COGNITIVE RELIEF COMPARISON & ARCHITECTURE */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <SecurityPhilosophy />
      </section>

      {/* 6. EXPANDED FAQS */}
      <section className="bg-black/40 border-t border-zinc-900" id="faq">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 space-y-10 text-left">
          
          {/* FAQ Headline */}
          <div className="space-y-4 border-b border-zinc-900 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-black text-[11px] font-mono text-[#00FF94] tracking-widest uppercase font-bold">
              <HelpCircle className="w-3.5 h-3.5 text-[#00FF94]" />
              <span>TECHNICAL FAQs</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight">
              Operational Inquiries
            </h2>
            <p className="text-xs text-zinc-400">Everything you need to know about setting up Flowly's local storage indexes</p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <DownloadButton variant="compact" label="Download APK" />
            </div>
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
                    className="w-full flex items-center justify-between p-4 text-sm font-semibold text-zinc-100 focus:outline-none"
                  >
                    <span className="text-left leading-relaxed">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 flex-shrink-0 ml-3 ${
                      isOpen ? 'transform rotate-180 text-[#00FF94]' : ''
                    }`} />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[min(70vh,28rem)] border-t border-zinc-900 p-4' : 'max-h-0'
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
      <section className="relative overflow-hidden py-20 md:py-28 text-center" id="download">
        {/* Ambient background accent */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00FF94]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto px-4 space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-900 bg-black text-[11px] font-mono text-[#00FF94] tracking-widest font-bold uppercase">
            <span>GET FLOWLY TODAY</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase leading-none">
            CUSTODY OF YOUR<br />DIGITAL STORAGE
          </h2>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-lg mx-auto">
            Ready to deploy your offline second brain? Download the native Flowly APK for your Android device below. Open-source, zero tracking servers, zero accounts required.
          </p>

          {/* Secondary Download Button Panel Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <DownloadButton
              variant="primary"
              label="Download Stable APK"
              className="p-3 px-6 hover:shadow-lg hover:shadow-[#00FF94]/10 border border-zinc-800"
            />
            
            <button 
              disabled={true}
              className="p-3 px-6 rounded-xl bg-zinc-950 text-zinc-500 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-display border border-zinc-90 w-full border-zinc-900 cursor-not-allowed"
            >
              <Smartphone className="w-4 h-4 text-zinc-700" />
              <span>Google Play Store (Soon)</span>
            </button>
          </div>

          <p className="text-[10px] font-mono text-zinc-500 pt-2">
            iOS, macOS and Windows client builds are coming soon! Currently fully optimized for on-device Android deployment.
          </p>

        </div>
      </section>

      {/* 8. HIGH-POLISHED STARK FOOTER */}
      <footer className="border-t border-zinc-900/80 bg-zinc-950 py-10 sm:py-12 safe-area-bottom">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-1.5 text-center md:text-left w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-start gap-1.5">
              <span className="font-display font-black text-sm tracking-tight text-white">Flowly</span>
              <span className="text-[9px] font-mono px-1 border border-zinc-800 text-zinc-500 rounded bg-zinc-900/50">OFFGRID</span>
            </div>
            <p className="text-[11px] text-zinc-500">Your second brain. Offline. Private. AI-powered.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-zinc-500 font-mono">
            <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors">GitHub Repository</a>
            <span>•</span>
            <a href="https://t.me/FlowlyAITeam" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors">Telegram Community</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Custody</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300 transition-colors">Local Safety Shield</a>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-[11px] text-zinc-600 select-none">
              "Offline is the ultimate luxury." 🦉
            </p>
            <p className="text-[10px] text-zinc-600 flex items-center justify-center md:justify-end gap-1 select-none">
              <span>Made with local-first</span>
              <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
              <span>in 2026</span>
            </p>
          </div>

        </div>

        <FooterStats />
        </div>
      </footer>

    </div>
  );
}
