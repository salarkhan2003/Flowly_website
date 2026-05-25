# Live stats on Vercel

The footer **Visits** and **Downloads** counters need **Redis** on Vercel. Static hosting alone cannot store counts.

## One-time setup (about 2 minutes)

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your **Flowly** project.
2. Go to **Storage** → **Create Database** → choose **Upstash Redis** (or **KV**, which uses the same Redis env vars).
3. Name it (e.g. `flowly-stats`) → **Create**, then **Connect to Project** → select this website repo.
4. **Deployments** → **Redeploy** the latest deployment (must redeploy after connecting storage).

These env vars are added automatically: `KV_REST_API_URL` + `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`).

## Verify

- Open your site on your phone.
- Footer should show numbers (not `—`) and **Live stats** with a green pulse.
- Refresh — visit count should increase once per browser session.
- Tap **Download** — download count should increase.

## Local development

```bash
npm run dev:server   # terminal 1 — file-based stats
npm run dev          # terminal 2 — site with /api proxy
```

Or use KV locally: copy `KV_REST_API_URL` and `KV_REST_API_TOKEN` from Vercel into a local `.env` file and run `vercel dev`.
