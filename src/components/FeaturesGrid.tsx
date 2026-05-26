import React, { ReactNode } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Folder, 
  Bot, 
  Sparkles, 
  Calendar, 
  Search, 
  Moon, 
  CloudOff, 
  Layers, 
  Sparkle,
  Lock,
  ArrowUpRight,
  Bookmark
} from 'lucide-react';

interface FeatureCardProps {
  key?: any;
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

function FeatureCard({ icon, title, description, badge, className = '' }: FeatureCardProps) {
  return (
    <div className={`p-6 rounded-2xl border border-zinc-900 bg-black/60 hover:border-[#00FF94]/30 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#00FF94]/2 relative overflow-hidden group ${className}`}>
      {/* Decorative blurred blob */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FF94]/3 rounded-full blur-2xl group-hover:bg-[#00FF94]/8 transition-colors pointer-events-none" />
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-90 w-11 h-11 flex items-center justify-center text-[#00FF94] group-hover:text-emerald-300 transition-colors inline-block">
            {icon}
          </div>
          {badge && (
            <span className="text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-900/30 bg-zinc-950 text-[#00FF94] tracking-wider uppercase">
              {badge}
            </span>
          )}
        </div>
        
        <h3 className="text-base font-display font-black text-white tracking-tight uppercase mb-2">
          {title}
        </h3>
        
        <p className="text-xs text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 flex items-center gap-1 text-[10px] font-mono text-zinc-600 group-hover:text-[#00FF94] transition-colors uppercase tracking-wider font-bold">
        <span>LEARN ARCHITECTURE</span>
        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

export default function FeaturesGrid() {
  const coreFeatures = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Rich Markdown Notes",
      description: "Structure concepts with standard heading formats, checklists, embedded codeblocks, and contextual tagging. Toggle pins dynamically or archive old reference frames with zero latency.",
      badge: "Local-First Core"
    },
    {
      icon: <CheckSquare className="w-5 h-5" />,
      title: "Tactical Task Deck",
      description: "Ditch convoluted dashboards. Assign priorities, schedule strict deadlines, track granular subtasks, or toggle starred locks. Simple, bulletproof execution metrics.",
      badge: "High Density"
    },
    {
      icon: <Folder className="w-5 h-5" />,
      title: "Color-Coded Projects",
      description: "Aggregate related task decks and modular markdown files under unified thematic projects. Visualize work scopes and isolate contexts in single taps.",
      badge: "Highly Structured"
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: "User-Controlled AI Integration",
      description: "Optional AI assistance powered by your custom API keys (Groq / Gemini) saved securely on-device. Dispatches prompts directly via HTTPS to deliver contextual analysis without third-party brokers holding your keys.",
      badge: "User Keys"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Morning Workspace Summary",
      description: "Compile offline metrics from your backlog upon startup. Prepares a local high-density diagnostic overview summarizing pending projects, due task structures, and priority cards.",
      badge: "Local Telemetry"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Visual Timeline Grid",
      description: "Interact with an beautiful monthly and weekly calendar planner. Colored status markers link due deadlines directly back to custom projects for visual alignment.",
      badge: "Interactive Scheduler"
    }
  ];

  return (
    <section className="space-y-12 py-12" id="grid-features">
      {/* Set Title Panel */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-black text-[11px] font-mono text-[#00FF94] tracking-widest uppercase font-bold">
          <Layers className="w-3.5 h-3.5 text-[#00FF94]" />
          <span>GRANULAR CAPABILITIES</span>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight text-white uppercase">
          A Fully Managed Local System
        </h2>
        
        <p className="text-xs text-zinc-400 leading-relaxed">
          Flowly replaces a dozen fragmented cloud web applications. No subscriptions, no tracking, complete ownership of every single text byte.
        </p>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreFeatures.map((feat, index) => (
          <FeatureCard 
            key={index}
            icon={feat.icon}
            title={feat.title}
            description={feat.description}
            badge={feat.badge}
          />
        ))}

        {/* Highlight Banner Card (spanning 1 or more columns depending on layout) */}
        <div className="p-6 md:col-span-2 lg:col-span-3 rounded-2xl border border-dashed border-zinc-800 bg-black/40 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="space-y-2 text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black border border-zinc-800 text-[10px] font-mono text-[#00FF94] font-bold uppercase tracking-wider">
              <CloudOff className="w-3 h-3 inline text-[#00FF94]" />
              <span>CLIENT-SIDE OFFLINE INTEGRITY</span>
            </div>
            <h3 className="text-base font-display font-black text-white uppercase">
              Private Local Database System
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Every core entity — notes, tags, checklists, schedule events, and metadata records — resides safely inside on-device SQLite directories. Your productivity sandbox remains functional in any environment, without exposing raw data to central hosted cloud clusters or synchronization brokers.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl relative">
              <Bot className="w-6 h-6 text-[#00FF94]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00FF94] rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00FF94] rounded-full" />
            </div>
            <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
              Local Core Verified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
