import React from 'react';
import { Sparkle, ShieldCheck, Download, ExternalLink, ArrowRight, Save, History, Bot } from 'lucide-react';

export default function WhatsNew() {
  const updates = [
    {
      version: "v1.0.3",
      date: "May 2026 (Latest Stable)",
      features: [
        {
          name: "Direct SQLite Directory Ingestion",
          benefit: "Backs up structured tables onto your Android sandbox container for rapid query responses."
        },
        {
          name: "User-Controlled AI Token Encryption",
          benefit: "Encodes your private Gemini/Groq API keys in the hardware-backed keystore for local-only transmission."
        },
        {
          name: "Markdown Vault & Task Deck Isolation",
          benefit: "Isolates project folders natively so your private logs are kept off-grid and tracker-free."
        },
        {
          name: "One-Click JSON/Markdown Archive Export",
          benefit: "Assembles raw markup (.md) zip bundles instantly, avoiding proprietary format locking."
        }
      ]
    }
  ];

  return (
    <section className="space-y-12 py-16 max-w-6xl mx-auto px-4 md:px-6 border-t border-zinc-900" id="whats-new">
      <div className="text-left md:flex justify-between items-end gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-black text-[11px] font-mono text-[#00FF94] tracking-widest uppercase font-bold">
            <History className="w-3.5 h-3.5 text-[#00FF94]" />
            <span>VERSION RELEASE HISTORY</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight text-white uppercase">
            What's New in Flowly
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Read verified, technical changes in our secure local-first release cycles. We avoid bloated feature trees and prioritize code efficiency and direct storage ownership.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-4 text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00FF94] inline-block" />
            Active Core SDK 34+
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left column featuring the version block */}
        <div className="md:col-span-4 p-6 rounded-2xl border border-zinc-900 bg-zinc-950 text-left space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-black">ACTIVE HANDSET RELEASE</span>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-display font-black text-[#00FF94]">Flowly v1.0.3</h3>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20 font-bold uppercase">STABLE</span>
            </div>
            <p className="text-xs text-zinc-550 text-zinc-500 font-mono">Released: May 24, 2026</p>
          </div>
          
          <hr className="border-zinc-90 w-full border-zinc-900/60" />

          <p className="text-xs text-zinc-405 leading-relaxed text-zinc-400">
            This version introduces critical adjustments for native sandbox storage directory integrity on newer mobile handsets. It ensures complete isolation of tasks and drafts without needing cloud-hosted databases.
          </p>

          <a 
            href="https://github.com/salarkhan2003/flowly/releases/latest/download/Flowly.apk"
            className="w-full p-3 rounded-xl bg-[#00FF94]/10 hover:bg-[#00FF94] text-[#00FF94] hover:text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-display border border-[#00FF94]/20 hover:border-transparent cursor-pointer text-center"
          >
            <Download className="w-4 h-4" />
            <span>Install Stable v1.0.3 APK</span>
          </a>
        </div>

        {/* Right column listing features */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {updates[0].features.map((pkg, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-zinc-900 bg-black/40 hover:border-[#00FF94]/20 transition-all group">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono text-zinc-650 text-zinc-650 text-zinc-600 font-bold text-[10px]">FIXED / IMPROVED {idx + 1}</span>
                <Sparkle className="w-3.5 h-3.5 text-[#00FF94] opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-sm font-display font-black text-white uppercase tracking-tight mb-1.5 group-hover:text-[#00FF94] transition-colors">
                {pkg.name}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {pkg.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
