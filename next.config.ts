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
    return [
      // Old CV filenames → current résumé (stops stale downloads).
      {
        source: "/muhammad-rizwan-cv-2026-11.pdf",
        destination: "/muhammad-rizwan-cv-2026-11f.pdf",
        permanent: false,
      },
      {
        source: "/muhammad-rizwan-cv-2026-11b.pdf",
        destination: "/muhammad-rizwan-cv-2026-11f.pdf",
        permanent: false,
      },
      {
        source: "/muhammad-rizwan-cv-2026-11c.pdf",
        destination: "/muhammad-rizwan-cv-2026-11f.pdf",
        permanent: false,
      },
      {
        source: "/muhammad-rizwan-cv-2026-11d.pdf",
        destination: "/muhammad-rizwan-cv-2026-11f.pdf",
        permanent: false,
      },
      {
        source: "/muhammad-rizwan-cv-2026-11e.pdf",
        destination: "/muhammad-rizwan-cv-2026-11f.pdf",
        permanent: false,
      },
      {
        source: "/muhammad-rizwan-resume.pdf",
        destination: "/muhammad-rizwan-cv-2026-11f.pdf",
        permanent: false,
      },
      {
        source: "/Muhammad_Rizwan_Resume.pdf",
        destination: "/muhammad-rizwan-cv-2026-11f.pdf",
        permanent: false,
      },
      {
        source: "/resume.pdf",
        destination: "/muhammad-rizwan-cv-2026-11f.pdf",
        permanent: false,
      },
    ];
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
