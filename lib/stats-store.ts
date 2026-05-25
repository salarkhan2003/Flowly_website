import { Redis } from '@upstash/redis';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export interface SiteStats {
  visits: number;
  downloads: number;
  updatedAt: string;
}

const VISITS_KEY = 'flowly:visits';
const DOWNLOADS_KEY = 'flowly:downloads';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATS_FILE = path.join(__dirname, '../server/stats-data.json');

export function isKvConfigured(): boolean {
  return Boolean(
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
      (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
  );
}

function getRedis(): Redis | null {
  if (!isKvConfigured()) return null;
  try {
    return Redis.fromEnv();
  } catch {
    return null;
  }
}

function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL);
}

function normalize(stats: Partial<SiteStats>): SiteStats {
  return {
    visits: Math.max(0, Number(stats.visits) || 0),
    downloads: Math.max(0, Number(stats.downloads) || 0),
    updatedAt: stats.updatedAt || new Date().toISOString(),
  };
}

async function readFileStats(): Promise<SiteStats> {
  try {
    const raw = await fs.readFile(STATS_FILE, 'utf-8');
    return normalize(JSON.parse(raw) as SiteStats);
  } catch {
    const initial = normalize({ visits: 0, downloads: 0 });
    await fs.writeFile(STATS_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

async function writeFileStats(stats: SiteStats): Promise<SiteStats> {
  const next = normalize({ ...stats, updatedAt: new Date().toISOString() });
  await fs.writeFile(STATS_FILE, JSON.stringify(next, null, 2), 'utf-8');
  return next;
}

async function readRedisStats(redis: Redis): Promise<SiteStats> {
  const [visits, downloads] = await Promise.all([
    redis.get<number>(VISITS_KEY),
    redis.get<number>(DOWNLOADS_KEY),
  ]);
  return normalize({
    visits: visits ?? 0,
    downloads: downloads ?? 0,
  });
}

export async function getStats(): Promise<SiteStats> {
  const redis = getRedis();
  if (redis) {
    return readRedisStats(redis);
  }
  if (isVercelRuntime()) {
    return normalize({ visits: 0, downloads: 0 });
  }
  return readFileStats();
}

export async function recordVisit(): Promise<SiteStats> {
  const redis = getRedis();
  if (redis) {
    const visits = await redis.incr(VISITS_KEY);
    const downloads = (await redis.get<number>(DOWNLOADS_KEY)) ?? 0;
    return normalize({ visits, downloads });
  }
  if (isVercelRuntime()) {
    throw new Error(
      'Redis is not connected. Add Upstash Redis (or Vercel KV) in the Vercel dashboard and redeploy.',
    );
  }
  const current = await readFileStats();
  return writeFileStats({ ...current, visits: current.visits + 1 });
}

export async function recordDownload(): Promise<SiteStats> {
  const redis = getRedis();
  if (redis) {
    const downloads = await redis.incr(DOWNLOADS_KEY);
    const visits = (await redis.get<number>(VISITS_KEY)) ?? 0;
    return normalize({ visits, downloads });
  }
  if (isVercelRuntime()) {
    throw new Error(
      'Redis is not connected. Add Upstash Redis (or Vercel KV) in the Vercel dashboard and redeploy.',
    );
  }
  const current = await readFileStats();
  return writeFileStats({ ...current, downloads: current.downloads + 1 });
}
