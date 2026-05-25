import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, handleOptions } from './_cors';
import { getStats, isKvConfigured } from '../lib/stats-store';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  applyCors(res);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stats = await getStats();
    return res.status(200).json({
      ...stats,
      storage: isKvConfigured() ? 'redis' : 'file',
    });
  } catch (error) {
    console.error('[api/stats]', error);
    return res.status(500).json({ error: 'Failed to read stats' });
  }
}
