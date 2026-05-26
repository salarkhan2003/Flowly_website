import React, { useState } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Bot, 
  Calendar, 
  Folder, 
  Settings, 
  Share2, 
  Check, 
  Lock, 
  WifiOff, 
  Plus, 
  Sparkle,
  Bookmark
} from 'lucide-react';

export default function AppScreenshots() {
  const [activeScreen, setActiveScreen] = useState<number>(0);

  const screens = [
    {
      title: "Notes Screen",
      subtitle: "A clean markdown notes editor",
      badge: "Markdown Core",
      render: (
        <div className="flex-grow flex flex-col h-full text-left bg-[#080808] text-zinc-100 font-sans select-none">
          {/* Header */}
          <div className="p-3 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
            <span className="text-[10px] font-mono font-bold text-zinc-400">All Notes (12)</span>
            <Plus className="w-3.5 h-3.5 text-[#00FF94]" />
          </div>
          {/* Content */}
          <div className="p-3 flex-grow space-y-2.5 overflow-hidden">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-bold text-white uppercase">Product Launch Strategy</span>
                <span className="text-[8px] text-zinc-500">10 mins ago</span>
              </div>
              <p className="text-[9.5px] text-zinc-400 line-clamp-2">Plan the local releases structure using raw directories. Host the downloads on GitHub stable...</p>
              <div className="flex gap-1.5 mt-2">
                <span className="text-[7.5px] px-1.5 py-0.2 rounded bg-zinc-950 text-zinc-450 border border-zinc-850">#marketing</span>
                <span className="text-[7.5px] px-1.5 py-0.2 rounded bg-zinc-950 text-zinc-450 border border-zinc-850">#draft</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-zinc-900 opacity-60">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-bold text-zinc-300 uppercase">Database Architecture</span>
                <span className="text-[8px] text-zinc-650 text-zinc-500">Yesterday</span>
              </div>
              <p className="text-[9.5px] text-zinc-500 line-clamp-1">Every core index resides strictly locally inside local Android handset sandbox...</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Tasks Board",
      subtitle: "A simple list tracker for todos",
      badge: "Task Deck",
      render: (
        <div className="flex-grow flex flex-col h-full text-left bg-[#080808] text-zinc-100 font-sans select-none">
          {/* Header */}
          <div className="p-3 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
            <span className="text-[10px] font-mono font-bold text-zinc-400">Task Backlog (5)</span>
            <span className="text-[8px] font-mono text-[#00FF94] px-1 bg-[#00FF94]/10 border border-[#00FF94]/20 rounded">SQLite</span>
          </div>
          {/* Content */}
          <div className="p-3 flex-grow space-y-2 overflow-hidden">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850">
              <div className="flex items-center gap-2 truncate">
                <div className="w-3.5 h-3.5 rounded border border-zinc-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#00FF94]" />
                </div>
                <span className="text-[10px] text-zinc-200 truncate">Draft v1.0.3 release notes</span>
              </div>
              <span className="text-[7px] font-mono font-bold px-1 rounded bg-[#00FF94]/10 text-[#00FF94]">MEDIUM</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-900">
              <div className="flex items-center gap-2 truncate">
                <div className="w-3.5 h-3.5 rounded border border-zinc-750 shrink-0" />
                <span className="text-[10px] text-zinc-100 truncate">Review product release package</span>
              </div>
              <span className="text-[7px] font-mono font-bold px-1 rounded bg-rose-955 bg-rose-500/10 text-rose-455 text-rose-400 border border-rose-900/30">HIGH</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-900 opacity-60">
              <div className="flex items-center gap-2 truncate">
                <div className="w-3.5 h-3.5 rounded border border-zinc-750 shrink-0" />
                <span className="text-[10px] text-zinc-350 truncate">Integrate Markdown export option</span>
              </div>
              <span className="text-[7px] font-mono font-bold px-1 rounded bg-zinc-90 w-full bg-zinc-900 text-zinc-500">LOW</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Assistant",
      subtitle: "Contextual advice with your keys",
      badge: "On-Device Queries",
      render: (
        <div className="flex-grow flex flex-col h-full text-left bg-[#080808] text-zinc-100 font-sans select-none">
          {/* Header */}
          <div className="p-3 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
            <span className="text-[10px] font-mono font-bold text-[#00FF94]">Flowly Assistant</span>
            <span className="text-[8px] font-mono text-zinc-550 text-zinc-500 uppercase">Provider Direct</span>
          </div>
          {/* Content */}
          <div className="p-3 flex-grow space-y-2.5 overflow-hidden text-[9px]">
            <div className="p-2.5 bg-[#00FF94]/10 border border-[#00FF94]/20 rounded-xl">
              <p className="text-zinc-300">Summarizing: "Marketing Strategy Pitch" Markdown entry...</p>
            </div>
            <div className="p-2.5 bg-zinc-900/50 border border-zinc-850 rounded-xl space-y-1">
              <span className="text-[#00FF94] font-mono font-bold text-[8px] block">Llama-3.3-70b:</span>
              <p className="text-zinc-400 leading-normal">
                You plan to distribute v1.0.3 sideload builds directly via GitHub releases. I've earmarked 3 potential action points for tasks.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Calendar Planner",
      subtitle: "Visual scheduling and deadlines",
      badge: "Timeline",
      render: (
        <div className="flex-grow flex flex-col h-full text-left bg-[#080808] text-zinc-100 font-sans select-none">
          {/* Header */}
          <div className="p-3 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
            <span className="text-[10px] font-mono font-bold text-zinc-400">Calendar Agenda</span>
            <Calendar className="w-3.5 h-3.5 text-[#00FF94]" />
          </div>
          {/* Content */}
          <div className="p-3 flex-grow space-y-3 overflow-hidden text-[9px] font-mono">
            <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-900 text-center text-zinc-300">
              <div className="flex justify-between font-bold text-white mb-1 px-1">
                <span>MAY 2026</span>
              </div>
              <div className="grid grid-cols-7 gap-1 font-bold text-zinc-550 text-zinc-500 mb-1">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                <span>20</span><span>21</span><span>22</span><span>23</span>
                <span className="bg-[#00FF94] text-black rounded font-black">24</span>
                <span className="bg-zinc-800 text-white rounded">25</span>
                <span>26</span>
              </div>
            </div>
            <div className="p-2 bg-zinc-900/40 rounded border border-zinc-850 flex justify-between items-center text-[8px]">
              <span className="text-zinc-400 font-bold">25th: Review designer's package</span>
              <span className="text-rose-400">14:00</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Projects View",
      subtitle: "Folder organization directories",
      badge: "Categories",
      render: (
        <div className="flex-grow flex flex-col h-full text-left bg-[#080808] text-zinc-100 font-sans select-none">
          {/* Header */}
          <div className="p-3 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
            <span className="text-[10px] font-mono font-bold text-zinc-400">Project list</span>
            <Plus className="w-3.5 h-3.5 text-[#00FF94]" />
          </div>
          {/* Content */}
          <div className="p-3 flex-grow space-y-2 overflow-hidden text-[10px]">
            <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-rose-500" />
                <span className="font-bold text-white">Website Redesign</span>
              </div>
              <span className="text-zinc-500 text-[8.5px] font-mono">4 items</span>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-sky-500" />
                <span className="font-bold text-zinc-300">Marketing Launch</span>
              </div>
              <span className="text-zinc-600 text-[8.5px] font-mono">2 items</span>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                <span className="font-bold text-zinc-300">Personal Finances</span>
              </div>
              <span className="text-zinc-600 text-[8.5px] font-mono">1 item</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Settings / Privacy",
      subtitle: "Verify storage verification states",
      badge: "Verified Local",
      render: (
        <div className="flex-grow flex flex-col h-full text-left bg-[#080808] text-zinc-100 font-sans select-none">
          {/* Header */}
          <div className="p-3 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
            <span className="text-[10px] font-mono font-bold text-zinc-400">Settings Dashboard</span>
            <Settings className="w-3.5 h-3.5 text-zinc-450" />
          </div>
          {/* Content */}
          <div className="p-3 flex-grow space-y-3 overflow-hidden text-[9px] font-mono">
            <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-2">
              <div className="flex justify-between border-b border-zinc-800 pb-1">
                <span className="text-zinc-400">Storage Backend</span>
                <span className="text-[#00FF94] font-bold">SQLITE (Local)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1">
                <span className="text-zinc-400">Cloud Sync Server</span>
                <span className="text-rose-455 text-rose-400 font-bold uppercase">Disabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-450 text-zinc-550 text-zinc-400">AI Key Configuration</span>
                <span className="text-[#00FF94] font-bold">User Supplied</span>
              </div>
            </div>

            <div className="p-2 rounded bg-zinc-950 border border-zinc-90 w-full border-zinc-900 text-center text-[8.5px] text-zinc-400">
              No tracking, telemetry, or remote storage nodes are active.
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="space-y-10 py-16 max-w-4xl mx-auto px-4 md:px-6 border-t border-zinc-900" id="screenshots">
      <div className="text-left space-y-3 pb-6 border-b border-zinc-90 w-full border-zinc-905 border-b border-zinc-900">
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-zinc-800 bg-zinc-950 text-[#00FF94] tracking-wider uppercase inline-block">
          App Walkthrough
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight">
          Application Interface
        </h2>
        <p className="text-xs text-zinc-400 max-w-lg">
          Take a look at the key screens designed for quick interactions and offline workspace management on Android.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
        {/* Navigation buttons */}
        <div className="md:col-span-4 space-y-1.5 text-left">
          {screens.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => setActiveScreen(idx)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                activeScreen === idx 
                  ? 'bg-zinc-950 border-[#00FF94]' 
                  : 'bg-black/35 border-transparent hover:border-zinc-90 w-full border-zinc-900'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-display font-black text-white uppercase tracking-tight">
                  {sc.title}
                </span>
                <span className="text-[7.5px] font-mono px-1.5 py-0.2 rounded bg-zinc-90 w-full bg-zinc-900 text-zinc-400 font-bold uppercase shrink-0 select-none">
                  {sc.badge}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 truncate">{sc.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Display Frame */}
        <div className="md:col-span-8 flex justify-center">
          {/* Handset Frame */}
          <div className="relative w-[280px] xs:w-[300px] h-[420px] xs:h-[450px] rounded-[36px] bg-[#0c0c0c] text-white shadow-2xl flex flex-col overflow-hidden border-[8px] border-zinc-900 ring-1 ring-zinc-800">
            {/* Front Camera cutout */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-black z-50 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
            </div>

            {/* Simulated Android Status Bar */}
            <div className="flex justify-between items-center px-4 pt-2 pb-0.5 text-[8px] font-mono text-zinc-500 bg-black z-40 select-none">
              <span>14:56</span>
              <div className="flex items-center gap-1">
                <span className="text-[#00FF94] text-[7px] flex items-center gap-0.5 uppercase tracking-wide">
                  <WifiOff className="w-2 h-2 text-[#00FF94]" /> local
                </span>
              </div>
            </div>

            {/* Active Render Area */}
            <div className="flex-grow flex flex-col overflow-hidden">
              {screens[activeScreen].render}
            </div>

            {/* Home gesture line */}
            <div className="py-1 flex items-center justify-center bg-black">
              <div className="w-12 h-0.5 bg-zinc-800 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
