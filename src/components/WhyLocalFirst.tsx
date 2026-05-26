import React from 'react';
import { UserMinus, WifiOff, Database, FileDown, Key, Zap, Check } from 'lucide-react';

export default function WhyLocalFirst() {
  const points = [
    {
      icon: <UserMinus className="w-5 h-5 text-[#00FF94]" />,
      label: "No sign-up required",
      benefit: "Start instantly",
      desc: "There are no mandatory email inputs, registrations, or verification steps. Download the app and get right into your workflow."
    },
    {
      icon: <WifiOff className="w-5 h-5 text-[#00FF94]" />,
      label: "Offline support",
      benefit: "Works without internet",
      desc: "Create and search notes deep in nature, in plane cabins, or on remote transit. No connection required for core productivity."
    },
    {
      icon: <Database className="w-5 h-5 text-[#00FF94]" />,
      label: "Local SQLite storage",
      benefit: "Your notes stay on your device",
      desc: "All draft assets and databases are structured on your own local files, completely safe from cloud-based breaches."
    },
    {
      icon: <FileDown className="w-5 h-5 text-[#00FF94]" />,
      label: "Export support",
      benefit: "No vendor lock-in",
      desc: "Package and export your notebook items as clean JSON/Markdown zip files anytime. You maintain full ownership of your work."
    },
    {
      icon: <Key className="w-5 h-5 text-[#00FF94]" />,
      label: "Optional AI integration",
      benefit: "Use your own API key",
      desc: "Get context assistance locally by plugging in personal keys. Keeps prompting direct without third-party proxy tracking."
    },
    {
      icon: <Zap className="w-5 h-5 text-[#00FF94]" />,
      label: "Fast performance",
      benefit: "No sync delays",
      desc: "Local read/write means instantaneous feedback. Skip page spinners, network timeouts, and load-time latency."
    }
  ];

  return (
    <section className="space-y-10 py-16 max-w-4xl mx-auto px-4 md:px-6" id="why-local-first">
      <div className="text-left space-y-2 pb-6 border-b border-zinc-90 w-full border-zinc-905 border-b border-zinc-900">
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-zinc-800 bg-zinc-950 text-[#00FF94] tracking-wider uppercase inline-block">
          Architecture
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight">
          Why Local-First?
        </h2>
        <p className="text-xs text-zinc-400 max-w-lg">
          By storing data directly where you work, we bypass the need for centralized remote accounts and constant sync tunnels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
        {points.map((pt, idx) => (
          <div 
            key={idx} 
            className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/45 hover:bg-zinc-950/80 hover:border-zinc-800 transition-all flex gap-4 items-start"
          >
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex-shrink-0">
              {pt.icon}
            </div>
            
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <h4 className="text-sm font-display font-black text-white">{pt.label}</h4>
                <span className="text-[9px] text-[#00FF94] font-mono flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" /> {pt.benefit}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
                {pt.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
