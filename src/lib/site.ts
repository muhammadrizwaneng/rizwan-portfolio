import { profile } from "@/data/profile";

/** Legacy Vercel env pointed here; that host has no deployment (OG image 404). */
const BROKEN_SITE_URL = "https://rizwan-portfolio.vercel.app";

/** Canonical URL for metadata, sitemap, and JSON-LD. */
export function getConfiguredSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  if (fromEnv && fromEnv !== BROKEN_SITE_URL) {
    return fromEnv;
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /^https?:\/\//,
    "",
  );
  if (vercelProduction) {
    return `https://${vercelProduction}`;
  }

  if (fromEnv) return fromEnv;

  return "https://rizwan-portfolio-eight.vercel.app";
}

export const siteUrl = getConfiguredSiteUrl();

export const siteName = `${profile.name} | Full Stack & Mobile Developer`;

export const seoDescription =
  "Muhammad Rizwan — Full Stack & Mobile Developer with 4+ years shipping secure backends, APIs, and React Native apps (Node.js, Next.js, Python/FastAPI). Enterprise SSO and search for 15,000+ users. Lahore, Pakistan.";

export const seoKeywords = [
  "Muhammad Rizwan",
  "software engineer",
  "full stack developer",
  "Node.js developer",
  "MERN stack developer",
  "React Native developer",
  "Next.js developer",
  "AWS developer",
  "mobile app developer",
  "backend developer",
  "Lahore software engineer",
  "Pakistan software developer",
  "FastAPI",
  "TypeScript",
  "vibe coding",
  "Cursor",
  "Claude",
  "AI agents",
  "portfolio",
];

export const ogImageWidth = 1600;
export const ogImageHeight = 840;
export const ogImageAlt = `${profile.name} — Full Stack & Mobile Developer`;
