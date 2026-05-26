import { 
  ShieldCheck, 
  X, 
  Check, 
  Bot, 
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
        content: "# Meeting Notes\nReviewing final visual layouts locally..."
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
    <section className="space-y-12 py-12" id="security-architecture">
      
      {/* 2-Column Comparison Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Comparison Text/Intro */}
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-black text-[10px] font-mono text-[#00FF94] uppercase tracking-widest font-bold">
            <Lock className="w-3 h-3 text-[#00FF94]" />
            <span>Data Comparison</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight leading-tight">
            Designed for Local Ownership
          </h2>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Unlike cloud-based tools that keep your files on proprietary databases, Flowly stores notes, schedules, and drafts on your own device.
          </p>

          <p className="text-xs text-zinc-400 leading-relaxed">
            This avoids sync delays, protects you from remote data breaches, and guarantees that you retain access to your work even without an internet network.
          </p>

          <p className="text-xs text-zinc-500 italic">
            * AI features require internet access when using external providers like Groq or Gemini. Your API keys are saved locally.
          </p>
        </div>

        {/* COMPARATIVE INDEX TABLE */}
        <div className="p-6 rounded-2xl border border-zinc-900 bg-black/40 space-y-4">
          <h3 className="text-xs font-display font-black uppercase tracking-wider text-white text-left">
            How Flowly Differs
          </h3>

          <div className="space-y-4 text-xs text-left">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3.5 border-b border-zinc-900/50">
              <div className="text-zinc-500 font-mono text-[9px] uppercase tracking-wide">Standard Cloud Apps</div>
              <div className="text-[#00FF94] font-mono text-[9px] font-bold uppercase tracking-wide">The Flowly App</div>
              
              <div className="flex items-start gap-2 text-zinc-400">
                <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>Mandatory cloud accounts, persistent sign-ins, and cookie track identifiers.</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-200">
                <Check className="w-3.5 h-3.5 text-[#00FF94] shrink-0 mt-0.5" />
                <span>No sign-up. Get started instantly without registering an email address.</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3.5 border-b border-zinc-900/50">
              <div className="flex items-start gap-2 text-zinc-400">
                <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>Monthly recurring fees to cover centralized hosting servers and sync.</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-200">
                <Check className="w-3.5 h-3.5 text-[#00FF94] shrink-0 mt-0.5" />
                <span>Completely offline-ready setup with zero monthly subscription fees.</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2 text-zinc-400">
                <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>API integrations that route through external proxies, logging your queries.</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-200">
                <Check className="w-3.5 h-3.5 text-[#00FF94] shrink-0 mt-0.5" />
                <span>Optional AI endpoints are queried directly from your device using your own keys.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* NATURAL LANGUAGE PARSING ILLUSTRATOR (TRANSLATIONS SECTION) */}
      <div className="p-6 rounded-2xl border border-zinc-900 bg-black/60 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-900 bg-black text-[10px] font-mono text-[#00FF94] font-bold uppercase tracking-widest">
              <MessageSquareCode className="w-3.5 h-3.5 text-[#00FF94]" />
              <span>Language Processing</span>
            </div>
            <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">
              Simple AI Task Extraction
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              Use voice or text commands inside the app to quickly add tasks and projects. Our on-device assistant maps intent into clean lists.
            </p>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {promptingGuides.map((item, index) => (
              <button
                key={index}
                onClick={() => setActivePromptIndex(index)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[9px] transition-all border uppercase tracking-wider font-bold ${
                  activePromptIndex === index 
                    ? 'bg-[#00FF94]/10 border-[#00FF94] text-[#00FF94]' 
                    : 'bg-[#050505] border-zinc-850 hover:border-zinc-750 text-zinc-400'
                }`}
              >
                Example {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch text-left">
          
          {/* User Input side */}
          <div className="md:col-span-5 p-5 bg-zinc-950/80 rounded-xl border border-zinc-90 w-full flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">Input Command</span>
            <div className="p-4 rounded-xl bg-black border border-zinc-900 font-sans text-sm italic text-zinc-100 relative shadow-inner">
              "{promptingGuides[activePromptIndex].prompt}"
              <span className="absolute -bottom-1 -right-1 text-xs">✍️</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed">
              This prompt gets processed on-device and formatted into clean lists using secure localized code paths.
            </p>
          </div>

          {/* Icon Link */}
          <div className="md:col-span-2 flex flex-row md:flex-col items-center justify-center p-3 gap-2">
            <div className="h-0.5 md:h-12 w-12 md:w-0.5 bg-gradient-to-r md:bg-gradient-to-b from-zinc-800 to-[#00FF94]" />
            <div className="p-2 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/30 text-[#00FF94]">
              <Bot className="w-4 h-4" />
            </div>
            <div className="h-0.5 md:h-12 w-12 md:w-0.5 bg-gradient-to-r md:bg-gradient-to-b from-[#00FF94] to-zinc-800" />
          </div>

          {/* Structured Output Side */}
          <div className="md:col-span-5 p-5 bg-zinc-950/80 rounded-xl border border-zinc-90 w-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Parsed Result</span>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 border border-emerald-950 text-[#00FF94] uppercase tracking-wider">
                {promptingGuides[activePromptIndex].action}
              </span>
            </div>

            {/* Simulated Code Block */}
            <div className="p-3 rounded-lg bg-black border border-zinc-900 font-mono text-[9px] leading-relaxed text-zinc-300">
              <pre className="text-left overflow-x-auto">
                {JSON.stringify(promptingGuides[activePromptIndex].json, null, 2)}
              </pre>
            </div>

            <p className="text-[10px] font-semibold text-zinc-505 text-zinc-500 mt-3 flex items-center gap-1.5 uppercase tracking-wider font-bold">
              <Lock className="w-3.5 h-3.5 text-zinc-650" />
              <span>Instantly saved to local device SQLite database</span>
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
