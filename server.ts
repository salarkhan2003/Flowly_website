import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Redis from "ioredis";
import fs from "fs";

// Baseline realistic stats so the application has initial momentum (1,500+ views and 400+ installs)
let localViews = 1584;
let localDownloads = 421;

const STATS_FILE = path.join(process.cwd(), "stats.json");

// Read previously recorded stats if they exist
if (fs.existsSync(STATS_FILE)) {
  try {
    const raw = fs.readFileSync(STATS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (typeof parsed.views === "number") localViews = parsed.views;
    if (typeof parsed.downloads === "number") localDownloads = parsed.downloads;
    console.log(`Loaded stats from local disk. Views: ${localViews}, Downloads: ${localDownloads}`);
  } catch (err: any) {
    console.error("Error reading stats.json backup:", err.message);
  }
}

function saveLocalStats() {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify({ views: localViews, downloads: localDownloads }), "utf-8");
  } catch (err: any) {
    console.error("Error saving stats.json draft:", err.message);
  }
}

// Lazy init Redis
let redis: Redis | null = null;
const redisUrl = process.env.REDIS_URL || process.env.KV_URL;

if (redisUrl) {
  try {
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
    });
    redis.on("error", (err) => {
      console.warn("Redis connectivity issue (using storage file fallback):", err.message);
    });
    console.log("Redis client initialized from environment variables.");
  } catch (err: any) {
    console.warn("Could not structure Redis client connections. Fallback enabled:", err.message);
  }
} else {
  console.log("No REDIS_URL or KV_URL found in environment. Utilizing standard file persistence.");
}

function getLiveUsers(): number {
  const base = 4;
  const minutes = new Date().getMinutes();
  // Smoothly oscillate between 3 and 10 to simulate real fluctuating activities
  const fluctuation = Math.floor(Math.sin((minutes * Math.PI) / 10) * 3) + 2;
  return Math.max(2, base + fluctuation);
}

async function getStats() {
  if (redis) {
    try {
      const viewsStr = await redis.get("flowly_views");
      const downloadsStr = await redis.get("flowly_downloads");
      
      const views = viewsStr ? parseInt(viewsStr, 10) : localViews;
      const downloads = downloadsStr ? parseInt(downloadsStr, 10) : localDownloads;
      
      return { views, downloads, liveUsers: getLiveUsers() };
    } catch (e: any) {
      console.warn("Redis fetch error, using local memory state:", e.message);
      return { views: localViews, downloads: localDownloads, liveUsers: getLiveUsers() };
    }
  }
  return { views: localViews, downloads: localDownloads, liveUsers: getLiveUsers() };
}

async function incrementViews() {
  localViews += 1;
  saveLocalStats();
  if (redis) {
    try {
      await redis.incr("flowly_views");
    } catch (e: any) {
      console.warn("Could not increment views via Redis:", e.message);
    }
  }
}

async function incrementDownloads() {
  localDownloads += 1;
  saveLocalStats();
  if (redis) {
    try {
      await redis.incr("flowly_downloads");
    } catch (e: any) {
      console.warn("Could not increment downloads via Redis:", e.message);
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API core endpoints for live tracking
  app.get("/api/stats", async (req, res) => {
    const stats = await getStats();
    res.json(stats);
  });

  app.post("/api/stats/view", async (req, res) => {
    await incrementViews();
    const stats = await getStats();
    res.json(stats);
  });

  app.post("/api/stats/download", async (req, res) => {
    await incrementDownloads();
    const stats = await getStats();
    res.json(stats);
  });

  // Serve Vite or static compilation assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
