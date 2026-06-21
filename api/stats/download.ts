import Redis from "ioredis";

const DEFAULT_VIEWS = 1584;

// Auto mock function: Starts with 1584 + 4000 = 5584 views, and adds 100 every single day smoothly
function getLiveMockViews(): number {
  const baseViews = 5584; // 1584 default + 4000 added
  const startDate = new Date("2026-06-01T00:00:00Z").getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - startDate);
  const ratePerMs = 100 / (24 * 60 * 60 * 1000); // 100 views per day
  return baseViews + Math.floor(diffMs * ratePerMs);
}

// Auto mock function: Starts with 421 + 2000 = 2421 downloads, and adds 100 every single day smoothly
function getLiveMockDownloads(): number {
  const baseDownloads = 2421; // 421 default + 2000 added
  const startDate = new Date("2026-06-01T00:00:00Z").getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - startDate);
  const ratePerMs = 100 / (24 * 60 * 60 * 1000); // 100 downloads per day
  return baseDownloads + Math.floor(diffMs * ratePerMs);
}

let redis: Redis | null = null;
const redisUrl = process.env.REDIS_URL || process.env.KV_URL;

if (redisUrl) {
  try {
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
    });
  } catch (e) {
    console.warn("Redis download connection failed in serverless function:", e);
  }
}

function getLiveUsers(): number {
  const base = 21; // center between 15 and 30
  const seconds = new Date().getSeconds();
  const fluctuation = Math.floor(Math.sin((seconds * Math.PI) / 10) * 4) + Math.floor(Math.random() * 3);
  return Math.min(30, Math.max(15, base + fluctuation));
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  let views = getLiveMockViews();
  let downloads = getLiveMockDownloads() + 1;

  if (redis) {
    try {
      const val = await redis.incr("flowly_downloads");
      downloads = getLiveMockDownloads() + val;
      const v = await redis.get("flowly_views");
      if (v) views = getLiveMockViews() + parseInt(v, 10);
    } catch (err) {
      console.warn("Redis download update failed in serverless API:", err);
    }
  }

  return res.status(200).json({
    views,
    downloads,
    liveUsers: getLiveUsers(),
  });
}
