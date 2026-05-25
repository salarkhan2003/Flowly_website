import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, handleOptions } from '../_cors';
import { isKvConfigured, recordDownload } from '../../lib/stats-store';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  applyCors(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isKvConfigured()) {
    console.warn('[api/stats/download] KV_REST_API_URL / KV_REST_API_TOKEN not set on Vercel');
  }

  try {
    const stats = await recordDownload();
    return res.status(200).json({
      ...stats,
      storage: isKvConfigured() ? 'redis' : 'file',
    });
  } catch (error) {
    console.error('[api/stats/download]', error);
    return res.status(500).json({ error: 'Failed to record download' });
  }
}
