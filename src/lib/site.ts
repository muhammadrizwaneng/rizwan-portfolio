import { profile } from "@/data/profile";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://muhammadrizwan.dev";

export const iffatPortfolioUrl =
  process.env.NEXT_PUBLIC_IFFAT_PORTFOLIO_URL?.replace(/\/$/, "") ??
  "https://iffat-portfolio-eight.vercel.app";

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
