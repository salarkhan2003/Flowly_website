import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getStats, recordDownload, recordVisit } from '../lib/stats-store';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3001;
const isProd =
  process.env.NODE_ENV === 'production' || process.argv.includes('--production');

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.options('/api/*', (_req, res) => res.sendStatus(204));

app.get('/api/stats', async (_req, res) => {
  try {
    res.json(await getStats());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read stats' });
  }
});

app.post('/api/stats/visit', async (_req, res) => {
  try {
    res.json(await recordVisit());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to record visit' });
  }
});

app.post('/api/stats/download', async (_req, res) => {
  try {
    res.json(await recordDownload());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to record download' });
  }
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
      : `Flowly stats API (local file storage) → http://localhost:${PORT}`,
  );
});
