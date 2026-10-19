import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import { IffatJsonLd } from "@/components/iffat/IffatJsonLd";
import { iffatProfile } from "@/data/iffat-profile";
import { siteUrl } from "@/lib/site";
import "./iffat.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const description = `${iffatProfile.name} — professional content writer in Lahore specializing in SEO-friendly articles, keyword research, on-page optimization, editing, and web research.`;

export const metadata: Metadata = {
  title: `${iffatProfile.name} | Content Writer & SEO Writing Portfolio`,
  description,
  keywords: [
    "Iffat Zahra",
    "content writer Lahore",
    "SEO content writer",
    "freelance content writer Pakistan",
    "blog writer",
    "keyword research",
    "on-page SEO",
    "English literature graduate writer",
  ],
  authors: [{ name: iffatProfile.name }],
  alternates: {
    canonical: "/iffat",
  },
  openGraph: {
    title: `${iffatProfile.name} | Content Writer`,
    description,
    url: `${siteUrl}/iffat`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${iffatProfile.name} | Content Writer`,
    description,
  },
};

export default function IffatLayout({ children }: LayoutProps<"/iffat">) {
  return (
    <div className={`iffat-root ${lora.variable} ${dmSans.variable}`}>
      <IffatJsonLd />
      {children}
    </div>
  );
}
