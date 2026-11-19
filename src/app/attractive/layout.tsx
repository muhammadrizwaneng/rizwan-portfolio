import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./attractive-globals.css";
import { config } from "@ix/data/config";
import SiteFrame from "@ix/components/site-frame";
import GitHubStars from "@ix/components/header/github-stars";
import { AttractiveProviders } from "@ix/components/attractive-providers";
import { AttractiveRootShell } from "./attractive-root-shell";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.site),
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  alternates: { canonical: "/attractive" },
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    images: [
      {
        url: config.ogImg,
        width: 1200,
        height: 630,
        alt: "Muhammad Rizwan - Software Engineer",
      },
    ],
    type: "website",
  },
};

export default function AttractiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVars = [
    geistSans.variable,
    bricolage.variable,
    geistMono.variable,
    instrumentSerif.variable,
  ].join(" ");

  return (
    <AttractiveProviders>
      <AttractiveRootShell fontClassName={fontVars}>
        <SiteFrame githubStars={<GitHubStars className="mr-4" />}>
          {children}
        </SiteFrame>
      </AttractiveRootShell>
    </AttractiveProviders>
  );
}