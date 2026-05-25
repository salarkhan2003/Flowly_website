export interface SiteStats {
  visits: number;
  downloads: number;
  updatedAt: string;
}

const API_BASE = import.meta.env.VITE_STATS_API_URL ?? '';

export async function fetchSiteStats(): Promise<SiteStats | null> {
  try {
    const res = await fetch(`${API_BASE}/api/stats`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as SiteStats;
  } catch {
    return null;
  }
}

export async function recordVisit(): Promise<SiteStats | null> {
  try {
    const res = await fetch(`${API_BASE}/api/stats/visit`, { method: 'POST' });
    if (!res.ok) return null;
    return (await res.json()) as SiteStats;
  } catch {
    return null;
  }
}

export async function recordDownload(): Promise<SiteStats | null> {
  try {
    const res = await fetch(`${API_BASE}/api/stats/download`, { method: 'POST' });
    if (!res.ok) return null;
    return (await res.json()) as SiteStats;
  } catch {
    return null;
  }
}

export function subscribeSiteStats(onStats: (stats: SiteStats) => void): () => void {
  let source: EventSource | null = null;

  try {
    source = new EventSource(`${API_BASE}/api/stats/stream`);
    source.onmessage = (event) => {
      try {
        onStats(JSON.parse(event.data) as SiteStats);
      } catch {
        /* ignore malformed payloads */
      }
    };
  } catch {
    /* EventSource unavailable */
  }

  return () => {
    source?.close();
  };
}

export function formatStatCount(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.max(0, value));
}
