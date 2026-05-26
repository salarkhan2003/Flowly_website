import Redis from "ioredis";

const DEFAULT_VIEWS = 1584;
const DEFAULT_DOWNLOADS = 421;

let redis: Redis | null = null;
const redisUrl = process.env.REDIS_URL || process.env.KV_URL;

if (redisUrl) {
  try {
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
    });
  } catch (e) {
    console.warn("Redis connection failed in serverless function:", e);
  }
}

function getLiveUsers(): number {
  const base = 12;
  const seconds = new Date().getSeconds();
  const fluctuation = Math.floor(Math.sin((seconds * Math.PI) / 10) * 3) + Math.floor(Math.random() * 3);
  return Math.max(7, base + fluctuation);
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  let views = DEFAULT_VIEWS;
  let downloads = DEFAULT_DOWNLOADS;

  if (redis) {
    try {
      const v = await redis.get("flowly_views");
      const d = await redis.get("flowly_downloads");
      if (v) views = parseInt(v, 10);
      if (d) downloads = parseInt(d, 10);
    } catch (err) {
      console.warn("Redis lookup failed in serverless API:", err);
    }
  }

  return res.status(200).json({
    views,
    downloads,
    liveUsers: getLiveUsers(),
  });
}
