# Muhammad Rizwan — Portfolio

Personal portfolio site built with **Next.js 16**, **Tailwind CSS 4**, and **Framer Motion**, ready to deploy on [Vercel](https://vercel.com).

## Develop locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this folder to a GitHub repository (e.g. `muhammadrizwaneng/portfolio`).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Use default settings (Framework: Next.js). Deploy.

Or use the CLI:

```bash
npm i -g vercel
vercel
```

## SEO & indexing

- Set `NEXT_PUBLIC_SITE_URL` to your production domain (see `.env.example`).
- Sitemap: `/sitemap.xml` · Robots: `/robots.txt`
- JSON-LD (`Person`, `WebSite`) is injected from `src/components/JsonLd.tsx`.
- Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` after registering in Google Search Console.

## Contact form (Resend)

1. Create a [Resend](https://resend.com) account and verify your sending domain.
2. In Vercel → Settings → Environment Variables, add:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL` (e.g. `Portfolio <hello@yourdomain.com>`)
   - `CONTACT_TO_EMAIL` (defaults to your profile email)

## Customize

- Edit content in `src/data/profile.ts`.
- Replace `public/resume.pdf` with an updated resume.
- Add live demo URLs on projects via the `demo` field in `featuredProjects`.
