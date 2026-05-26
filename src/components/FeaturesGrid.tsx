import React, { ReactNode } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Folder, 
  Bot, 
  Calendar, 
  Database, 
  FileDown, 
  RefreshCw,
  Layers
} from 'lucide-react';

interface FeatureCardProps {
  key?: React.Key | number;
  icon: ReactNode;
  title: string;
  description: string;
  techDetail?: string;
}

function FeatureCard({ icon, title, description, techDetail }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between group text-left relative overflow-hidden">
      <div>
        <div className="p-3 rounded-xl bg-zinc-90 w-11 h-11 flex items-center justify-center text-[#00FF94] bg-zinc-950 border border-zinc-900 mb-4">
          {icon}
        </div>
        
        <h3 className="text-sm font-display font-black text-white uppercase tracking-tight mb-2">
          {title}
        </h3>
        
        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
          {description}
        </p>
      </div>

      {techDetail && (
        <div className="mt-2 pt-2 border-t border-zinc-900/40 flex items-center gap-1.5 text-[9px] font-mono text-zinc-550 text-zinc-500 uppercase tracking-wider font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-750 bg-zinc-700" />
          <span>{techDetail}</span>
        </div>
      )}
    </div>
  );
}

export default function FeaturesGrid() {
  const coreFeatures = [
    {
      icon: <FileText className="w-5 h-5 shrink-0" />,
      title: "Markdown Notes",
      description: "Write structured notes with headings, checklists, tags, and code blocks. Stored locally on your device.",
      techDetail: "Format: Raw Markdown (.md)"
    },
    {
      icon: <CheckSquare className="w-5 h-5 shrink-0" />,
      title: "Task Management",
      description: "Track your tasks and todos with flags, checklists, star states, and priority rankings easily.",
      techDetail: "Format: Local SQLite DB"
    },
    {
      icon: <Folder className="w-5 h-5 shrink-0" />,
      title: "Projects",
      description: "Organize items into folders and categories to keep your workspace structured and focus clean.",
      techDetail: "Format: Nested SQLite directories"
    },
    {
      icon: <Calendar className="w-5 h-5 shrink-0" />,
      title: "Calendar Planner",
      description: "View your upcoming deadlines, timed checklists, and milestones in a compact planner layout.",
      techDetail: "Format: Direct timeline scheduler"
    },
    {
      icon: <Bot className="w-5 h-5 shrink-0" />,
      title: "AI Assistant",
      description: "Use optional AI capabilities with your own API keys. Prompts run directly to the provider via HTTPS.",
      techDetail: "Privacy: Local-only API requests"
    },
    {
      icon: <Database className="w-5 h-5 shrink-0" />,
      title: "Offline-First Storage",
      description: "Keep all your workspace assets in offline-first SQLite files that respond instantly anytime.",
      techDetail: "Privacy: Zero background tracker nodes"
    },
    {
      icon: <FileDown className="w-5 h-5 shrink-0" />,
      title: "JSON/Markdown Export",
      description: "Export your notes and tasks as raw ZIP files anytime so you are never locked into a proprietary format.",
      techDetail: "Export: Standard ZIP files (.zip)"
    },
    {
      icon: <RefreshCw className="w-5 h-5 shrink-0" />,
      title: "OTA Updates",
      description: "Get official updates delivered smoothly beyond the Google Play Store directly from GitHub releases.",
      techDetail: "System: Sideload helper"
    }
  ];

  return (
    <section className="space-y-10 py-12" id="grid-features">
      {/* Title */}
      <div className="text-left max-w-xl space-y-3 pb-6 border-b border-zinc-900">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-black text-[10px] font-mono text-[#00FF94] tracking-widest uppercase font-bold">
          <Layers className="w-3 h-3 text-[#00FF94]" />
          <span>Product Overview</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight text-white uppercase">
          Key Features
        </h2>
        
        <p className="text-xs text-zinc-400">
          Simplify your day with an Android-native workspace designed around complete data custody and optional AI helpers.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coreFeatures.map((feat, index) => (
          <FeatureCard 
            key={index}
            icon={feat.icon}
            title={feat.title}
            description={feat.description}
            techDetail={feat.techDetail}
          />
        ))}
      </div>
    </section>
  );
}
