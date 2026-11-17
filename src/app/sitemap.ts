import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-11-17",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/metro`,
      lastModified: "2026-11-17",
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}
