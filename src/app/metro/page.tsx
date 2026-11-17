import type { Metadata } from "next";
import { Suspense } from "react";
import { MetroExperience } from "@/components/metro/MetroExperience";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Metro Portfolio",
  description: `Ride ${profile.name}'s metro portfolio — career, projects, skills, and contact as stations on the line.`,
  alternates: {
    canonical: "/metro",
  },
  openGraph: {
    title: `${profile.name} — Metro Portfolio`,
    description:
      "A subway-map portfolio experience with stations for about, career, projects, skills, education, and contact.",
    url: `${siteUrl}/metro`,
  },
};

export default function MetroPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-dvh place-items-center bg-[#07111f] text-sm text-slate-200">
          Boarding Rizwan Metro…
        </div>
      }
    >
      <MetroExperience />
    </Suspense>
  );
}
