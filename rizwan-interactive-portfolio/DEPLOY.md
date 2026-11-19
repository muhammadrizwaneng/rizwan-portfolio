# Muhammad Rizwan — Interactive Portfolio (Talha-style)

This app lives in **`rizwan-interactive-portfolio/`** so your original portfolio at the repo root can stay on its current URL.

## Local dev

```bash
cd rizwan-interactive-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## New Vercel URL

1. [Vercel](https://vercel.com) → **Add New Project** → import this Git repo.
2. **Root Directory** → `rizwan-interactive-portfolio` → Save.
3. Deploy. Suggested project name: `muhammad-rizwan-interactive`.
4. Update `src/data/config.ts` → `site` with the final URL (e.g. `https://muhammad-rizwan-interactive.vercel.app`) and redeploy.

## Optional env

Copy `.env.example` and set `RESEND_API_KEY` (contact form) and multiplayer URLs if you use those features (see README in this folder).