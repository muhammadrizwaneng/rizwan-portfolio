# Interactive portfolio (`/attractive`)

The Talha-style interactive app lives in **`rizwan-interactive-portfolio/`** and is served from the **main** Vercel project at:

| URL | App |
|-----|-----|
| `https://rizwan-portfolio-eight.vercel.app/` | Classic (Metro) portfolio |
| `https://rizwan-portfolio-eight.vercel.app/attractive` | Interactive portfolio |
| `https://rizwan-portfolio-eight.vercel.app/attractive/resume` | Interactive résumé viewer |
| `https://rizwan-portfolio-eight.vercel.app/muhammad-rizwan-resume.pdf` | CV PDF (shared) |

## Vercel

1. **Root Directory** = repo root (not `rizwan-interactive-portfolio`).
2. Install / build: default `npm install` and `npm run build` from root `package.json`.
3. Push to GitHub → Vercel redeploys both `/` and `/attractive`.

## Local dev

From repo root (classic + interactive on one server):

```bash
npm install
npm run dev
```

- Classic: [http://localhost:3000](http://localhost:3000)
- Interactive: [http://localhost:3000/attractive](http://localhost:3000/attractive)

Standalone dev for the interactive folder only (optional):

```bash
cd rizwan-interactive-portfolio
npm install
npm run dev
```

## Config

- Interactive site URL: `rizwan-interactive-portfolio/src/data/config.ts` → `site` (canonical for OG under `/attractive`).
- Classic site URL: `src/lib/site.ts`.

## Optional env

Contact form on the interactive side: `RESEND_API_KEY` in Vercel (see interactive `.env.example`).