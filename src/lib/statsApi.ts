export interface SiteStats {
  visits: number;
  downloads: number;
  updatedAt: string;
}

const API_BASE = (import.meta.env.VITE_STATS_API_URL ?? '').replace(/\/$/, '');

function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}

export async function fetchSiteStats(): Promise<SiteStats | null> {
  try {
    const res = await fetch(apiUrl('/api/stats'), {
      method: 'GET',
      cache: 'no-store',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as SiteStats;
    return {
      visits: Number(data.visits) || 0,
      downloads: Number(data.downloads) || 0,
      updatedAt: data.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function recordVisit(): Promise<SiteStats | null> {
  try {
    const res = await fetch(apiUrl('/api/stats/visit'), {
      method: 'POST',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as SiteStats;
    return {
      visits: Number(data.visits) || 0,
      downloads: Number(data.downloads) || 0,
      updatedAt: data.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function recordDownload(): Promise<SiteStats | null> {
  try {
    const res = await fetch(apiUrl('/api/stats/download'), {
      method: 'POST',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as SiteStats;
    return {
      visits: Number(data.visits) || 0,
      downloads: Number(data.downloads) || 0,
      updatedAt: data.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function formatStatCount(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.max(0, value));
}
