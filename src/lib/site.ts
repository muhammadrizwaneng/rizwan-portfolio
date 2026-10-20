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

export const siteName = `${profile.name} | Full Stack Software Engineer Portfolio`;

export const seoDescription =
  "Muhammad Rizwan — Full Stack Software Engineer specializing in Node.js, MERN stack, AWS, React Native, Next.js, Python (FastAPI), and mobile app development. 4+ years building secure, scalable products in Lahore, Pakistan.";

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
  "portfolio",
];

export const ogImageWidth = 1600;
export const ogImageHeight = 840;
export const ogImageAlt = `${profile.name} — Full Stack Software Engineer Portfolio`;
