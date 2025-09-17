# TravelGenius (v11-cjs)

**CommonJS-only** build: no ESM configs, no `"type":"module"`.
- `postcss.config.cjs` & `tailwind.config.cjs`
- `next.config.js` uses `module.exports`
- Client components place `'use client'` at the top
- SEO city pages pre-rendered

## Deploy
1) Upload/overwrite in GitHub.
2) In Vercel → Deployments → Redeploy → **Clear build cache**.
