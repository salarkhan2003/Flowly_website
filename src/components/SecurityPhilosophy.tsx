import { 
  ShieldCheck, 
  X, 
  Check, 
  Bot, 
  Clock, 
  Sparkle,
  ArrowRight,
  Database,
  Cpu,
  Lock,
  MessageSquareCode
} from 'lucide-react';
import { useState } from 'react';

export default function SecurityPhilosophy() {
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const promptingGuides = [
    {
      prompt: "Create a task to review the proposal by Friday",
      action: "Task Created",
      details: "Priority: High · Project: Marketing · Due: Friday",
      json: {
        type: "TASK",
        title: "Review the proposal",
        dueDate: "2026-05-29",
        priority: "High"
      }
    },
    {
      prompt: "Make a note about my meeting with the design team",
      action: "Note Compiled",
      details: "Tags: #design #meeting · Format: Raw Markdown",
      json: {
        type: "NOTE",
        title: "Design Team Meeting",
        tags: ["design", "meeting"],
        content: "# Meeting Notes\nPreserving designer notes local-first..."
      }
    },
    {
      prompt: "Start a new project called Website Redesign",
      action: "Project Initialized",
      details: "Color: Rose-500 · Groupings: Auto",
      json: {
        type: "PROJECT",
        name: "Website Redesign",
        color: "bg-rose-500"
      }
    }
  ];

  return (
    <section className="space-y-16 py-12" id="security-architecture">
      
      {/* 2-Column Comparatives Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Comparison Text/Intro */}
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-black text-[11px] font-mono text-[#00FF94] uppercase tracking-widest font-bold">
            <Lock className="w-3.5 h-3.5 text-[#00FF94]" />
            <span>SOVEREIGN DATA PRINCIPLE</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tight leading-tight">
            Designed for Absolute Digital Privacy
          </h2>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Every database subscription you sign up for leaves traces of your intelligence on third-party servers. Over time, your schedule, notes, drafts, and strategies become context datasets for advertising algorithms.
          </p>

          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong>Flowly</strong> enforces a physical custody limit. Since there is no central server, database tables, or sign-in endpoints, it is mathematically impossible for your details to leak, be analyzed, or sold. Your second brain remains strictly in your hand.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-3 font-mono">
            <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">DATA FLOW</span>
              <span className="text-sm font-bold text-[#00FF94]">0% Leaving Phone</span>
            </div>
            <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">SETUP FEE</span>
              <span className="text-sm font-bold text-[#00FF94]">$0.00 Forever</span>
            </div>
          </div>
        </div>

        {/* COMPARATIVE INDEX TABLE */}
        <div className="p-6 md:p-8 rounded-2xl border border-zinc-900 bg-black/40 space-y-4">
          <h3 className="text-sm font-display font-black uppercase tracking-wider text-white text-left">
            How Flowly Differs
          </h3>

          <div className="space-y-3.5 text-xs text-left">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3.5 border-b border-zinc-900/50">
              <div className="text-zinc-500 font-mono text-[10px]">THE OLD CLOUD WAY</div>
              <div className="text-[#00FF94] font-mono text-[10px] font-bold">THE FLOWLY WAY</div>
              
              <div className="flex items-center gap-2 text-zinc-400">
                <X className="w-4 h-4 text-rose-500/80 flex-shrink-0" />
                <span>Mandatory accounts, sign-ins, and cookie consent banners.</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200">
                <Check className="w-4 h-4 text-[#00FF94] flex-shrink-0" />
                <span>Zero signup. Download app, input your name once, proceed instantly.</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3.5 border-b border-zinc-900/50">
              <div className="flex items-center gap-2 text-zinc-400">
                <X className="w-4 h-4 text-rose-500/80 flex-shrink-0" />
                <span>Monthly recurring fees to cover server database synchronization overhead is costly.</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200">
                <Check className="w-4 h-4 text-[#00FF94] flex-shrink-0" />
                <span>Completely offline storage means zero infrastructure overhead. Paid zero cents.</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <X className="w-4 h-4 text-rose-500/80 flex-shrink-0" />
                <span>AI processes your text on external clouds, with risks of retention indexing.</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200">
                <Check className="w-4 h-4 text-[#00FF94] flex-shrink-0" />
                <span>AI requests route privately via your local keys or on-device LLama compilation structures.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* NATURAL LANGUAGE PARSING ILLUSTRATOR (TRANSLATIONS SECTION) */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-900 bg-black/60 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-900 bg-black text-[10px] font-mono text-[#00FF94] font-bold uppercase tracking-widest">
              <MessageSquareCode className="w-3.5 h-3.5 text-[#00FF94]" />
              <span>NATURAL LANGUAGE COMPLIANCE</span>
            </div>
            <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">
              Flowly AI Parser: Turn Intention into Structured Records
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              Ditch complicated button clicks. Speak or type completely naturally. Flowly AI translates conversational requests into instant database models without displaying confusing JSON codes to you.
            </p>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {promptingGuides.map((item, index) => (
              <button
                key={index}
                onClick={() => setActivePromptIndex(index)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] transition-all border uppercase tracking-wider font-bold ${
                  activePromptIndex === index 
                    ? 'bg-[#00FF94]/10 border-[#00FF94] text-[#00FF94]' 
                    : 'bg-[#050505] border-zinc-850 hover:border-zinc-700 text-zinc-450 text-zinc-400 hover:text-zinc-205'
                }`}
              >
                Instance {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Diagram of Translation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch text-left">
          
          {/* User Input side */}
          <div className="md:col-span-5 p-5 bg-zinc-950/80 rounded-xl border border-zinc-90 w-full flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">Input Conversational Query</span>
            <div className="p-4 rounded-xl bg-black border border-zinc-900 font-sans text-sm italic text-zinc-100 relative shadow-inner">
              "{promptingGuides[activePromptIndex].prompt}"
              <span className="absolute -bottom-1 -right-1 text-xs">✍️</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed">
              This string gets analyzed instantly inside Flowly's secure offline thread via optimized context indexing guidelines.
            </p>
          </div>

          {/* Core Processing Spark */}
          <div className="md:col-span-2 flex flex-row md:flex-col items-center justify-center p-3 gap-2">
            <div className="h-0.5 md:h-12 w-12 md:w-0.5 bg-gradient-to-r md:bg-gradient-to-b from-zinc-805 to-[#00FF94]" />
            <div className="p-2 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/30 text-[#00FF94] animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div className="h-0.5 md:h-12 w-12 md:w-0.5 bg-gradient-to-r md:bg-gradient-to-b from-[#00FF94] to-zinc-805" />
          </div>

          {/* Structured Output Side */}
          <div className="md:col-span-5 p-5 bg-zinc-950/80 rounded-xl border border-zinc-90 w-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Output Action Model</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 border border-emerald-900/30 text-[#00FF94] uppercase tracking-wider">
                {promptingGuides[activePromptIndex].action}
              </span>
            </div>

            {/* Simulated Code Block */}
            <div className="p-3 rounded-lg bg-black border border-zinc-900 font-mono text-[10px] leading-relaxed text-zinc-300">
              <pre className="text-left overflow-x-auto">
                {JSON.stringify(promptingGuides[activePromptIndex].json, null, 2)}
              </pre>
            </div>

            <p className="text-[10px] font-semibold text-zinc-500 mt-3 flex items-center gap-1.5 uppercase tracking-wider font-bold">
              <Lock className="w-3.5 h-3.5 text-zinc-600" />
              <span>Instantly loaded into local storage (0ms sync)</span>
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
