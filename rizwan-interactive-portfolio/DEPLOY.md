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
2. **Root Directory** → **Edit** → choose `rizwan-interactive-portfolio` → **Continue** (required — do not deploy from repo root).
3. Framework: **Next.js**; install/build use `vercel.json` in this folder (`npm install` / `npm run build`).
4. **Deploy**. Suggested project name: `muhammad-rizwan-interactive`.
5. Update `src/data/config.ts` → `site` with the final URL and redeploy.

If the build fails with errors under `rizwan-interactive-portfolio/...` while the Root Directory is empty, you are building the wrong app — set the root directory as in step 2 and redeploy.

## Optional env

Copy `.env.example` and set `RESEND_API_KEY` (contact form) and multiplayer URLs if you use those features (see README in this folder).