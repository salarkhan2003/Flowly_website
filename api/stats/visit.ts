import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, handleOptions } from '../cors.js';
import { isKvConfigured, recordVisit } from '../lib/stats-store.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  applyCors(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stats = await recordVisit();
    return res.status(200).json({
      ...stats,
      storage: isKvConfigured() ? 'redis' : 'file',
    });
  } catch (error) {
    console.error('[api/stats/visit]', error);
    return res.status(500).json({ error: 'Failed to record visit' });
  }
}
