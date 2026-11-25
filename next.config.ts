import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Old CV aliases → single canonical PDF (extra files removed from /public).
    const toCurrent = "/muhammad-rizwan-cv-2026-11g.pdf";
    return [
      "/muhammad-rizwan-resume.pdf",
      "/Muhammad_Rizwan_Resume.pdf",
      "/resume.pdf",
      "/resume-previous.pdf",
      "/muhammad-rizwan-cv-2026-11.pdf",
      "/muhammad-rizwan-cv-2026-11b.pdf",
      "/muhammad-rizwan-cv-2026-11c.pdf",
      "/muhammad-rizwan-cv-2026-11d.pdf",
      "/muhammad-rizwan-cv-2026-11e.pdf",
      "/muhammad-rizwan-cv-2026-11f.pdf",
    ].map((source) => ({
      source,
      destination: toCurrent,
      permanent: false,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
