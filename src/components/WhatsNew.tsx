import React from 'react';
import { Download, History, Sparkle } from 'lucide-react';

interface WhatsNewProps {
  onDownloadClick?: () => void;
}

export default function WhatsNew({ onDownloadClick }: WhatsNewProps) {
  const updates = [
    {
      version: "v1.0.3",
      date: "May 2026 (Latest Stable)",
      improvements: [
        "Improved SQLite storage reliability for newer Android builds",
        "Better AI key management with secure on-device storage",
        "Faster project loading times and smoother viewport transitions",
        "Full Markdown export support to extract notes as standard files",
        "OTA update improvements for smooth sideloaded app installations"
      ]
    }
  ];

  return (
    <section className="space-y-8 py-16 max-w-4xl mx-auto px-4 md:px-6" id="whats-new">
      <div className="text-left md:flex justify-between items-end gap-8 pb-4 border-b border-zinc-900">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-zinc-800 bg-black text-[10px] font-mono text-[#00FF94] tracking-widest uppercase font-bold">
            <History className="w-3 h-3 text-[#00FF94]" />
            <span>Latest Updates</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight text-white uppercase">
            What's New
          </h2>
          <p className="text-xs text-zinc-400">
            View the verified, technical changelogs for our recent stable releases below.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-4 text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00FF94] inline-block" />
            Target SDK 34 (Android 14)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
        {/* Release Status */}
        <div className="md:col-span-5 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 text-left flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">Current Build</span>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="text-xl font-display font-black text-[#00FF94]">Flowly v1.0.3</h3>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20 font-bold uppercase">STABLE</span>
              </div>
              <p className="text-[11px] text-zinc-500 font-mono mt-1">Released: May 24, 2026</p>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed">
              This stable version addresses on-device database schema validations to ensure notes are saved correctly. It works standalone and does not communicate data back to remote systems.
            </p>
          </div>

          <div className="pt-6">
            <a 
              href="https://github.com/salarkhan2003/flowly/releases/latest/download/Flowly.apk"
              onClick={onDownloadClick}
              className="w-full p-3 rounded-xl bg-[#00FF94]/10 hover:bg-[#00FF94] text-[#00FF94] hover:text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-display border border-[#00FF94]/20 hover:border-transparent cursor-pointer text-center"
            >
              <Download className="w-4 h-4" />
              <span>Download Stable v1.0.3 APK</span>
            </a>
          </div>
        </div>

        {/* Improvements List */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-zinc-900 bg-black/40 text-left space-y-4 flex flex-col justify-center">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold block mb-2">Changelog Highlights</span>
          <ul className="space-y-4">
            {updates[0].improvements.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 p-1 rounded bg-zinc-900 border border-zinc-850 text-[#00FF94]">
                  <Sparkle className="w-3 h-3" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-zinc-350 text-zinc-300 leading-relaxed font-sans">
                    {bullet}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
