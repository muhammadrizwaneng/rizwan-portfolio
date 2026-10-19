import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-10-19",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/iffat`,
      lastModified: "2026-10-19",
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
