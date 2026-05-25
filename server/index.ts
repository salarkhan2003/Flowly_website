import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATS_FILE = path.join(__dirname, 'stats-data.json');
const PORT = Number(process.env.PORT) || 3001;
const isProd =
  process.env.NODE_ENV === 'production' || process.argv.includes('--production');

export interface SiteStats {
  visits: number;
  downloads: number;
  updatedAt: string;
}

const defaultStats = (): SiteStats => ({
  visits: 0,
  downloads: 0,
  updatedAt: new Date().toISOString(),
});

let writeQueue: Promise<void> = Promise.resolve();
const sseClients = new Set<express.Response>();

function broadcast(stats: SiteStats) {
  const payload = `data: ${JSON.stringify(stats)}\n\n`;
  for (const client of sseClients) {
    client.write(payload);
  }
}

async function readStats(): Promise<SiteStats> {
  try {
    const raw = await fs.readFile(STATS_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as SiteStats;
    return {
      visits: Math.max(0, Number(parsed.visits) || 0),
      downloads: Math.max(0, Number(parsed.downloads) || 0),
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    const stats = defaultStats();
    await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8');
    return stats;
  }
}

function mutateStats(mutator: (stats: SiteStats) => SiteStats): Promise<SiteStats> {
  const task = writeQueue.then(async () => {
    const current = await readStats();
    const next = mutator(current);
    next.updatedAt = new Date().toISOString();
    await fs.writeFile(STATS_FILE, JSON.stringify(next, null, 2), 'utf-8');
    broadcast(next);
    return next;
  });
  writeQueue = task.then(() => undefined);
  return task;
}

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('/api/*', (_req, res) => res.sendStatus(204));

app.get('/api/stats', async (_req, res) => {
  try {
    res.json(await readStats());
  } catch {
    res.status(500).json({ error: 'Failed to read stats' });
  }
});

app.post('/api/stats/visit', async (_req, res) => {
  try {
    const stats = await mutateStats((s) => ({ ...s, visits: s.visits + 1 }));
    res.json(stats);
  } catch {
    res.status(500).json({ error: 'Failed to record visit' });
  }
});

app.post('/api/stats/download', async (_req, res) => {
  try {
    const stats = await mutateStats((s) => ({ ...s, downloads: s.downloads + 1 }));
    res.json(stats);
  } catch {
    res.status(500).json({ error: 'Failed to record download' });
  }
});

app.get('/api/stats/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  const stats = await readStats();
  res.write(`data: ${JSON.stringify(stats)}\n\n`);
  sseClients.add(res);

  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 25000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
});

if (isProd) {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    isProd
      ? `Flowly site + stats API → http://localhost:${PORT}`
      : `Flowly stats API → http://localhost:${PORT}`,
  );
});
