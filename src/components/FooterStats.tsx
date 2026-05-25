import { Eye, Download, Radio } from 'lucide-react';
import { formatStatCount } from '../lib/statsApi';
import { useSiteStats } from '../hooks/useSiteStats';

export default function FooterStats() {
  const { stats, live } = useSiteStats();

  const visits = stats ? formatStatCount(stats.visits) : '—';
  const downloads = stats ? formatStatCount(stats.downloads) : '—';

  return (
    <div
      className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-3 border-t border-zinc-900/80 w-full"
      aria-label="Live site statistics"
    >
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
        {live ? (
          <Radio className="w-3 h-3 text-[#00FF94] animate-pulse" aria-hidden />
        ) : (
          <span className="w-2 h-2 rounded-full bg-zinc-700" aria-hidden />
        )}
        <span className="text-zinc-600 uppercase tracking-wider text-[9px]">Live stats</span>
      </div>

      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800">
        <Eye className="w-3.5 h-3.5 text-[#00FF94]" aria-hidden />
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Visits</span>
        <span className="text-sm font-display font-black text-white tabular-nums">{visits}</span>
      </div>

      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800">
        <Download className="w-3.5 h-3.5 text-[#00FF94]" aria-hidden />
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Downloads</span>
        <span className="text-sm font-display font-black text-white tabular-nums">{downloads}</span>
      </div>
    </div>
  );
}
