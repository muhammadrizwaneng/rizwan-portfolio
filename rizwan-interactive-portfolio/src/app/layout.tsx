import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { config } from "@ix/data/config";

import Script from "next/script";
import SiteFrame from "@ix/components/site-frame";
import GitHubStars from "@ix/components/header/github-stars";
import { Providers } from "@ix/components/providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { UMAMI_SRC } from "@ix/lib/umami";

/* Body/base font — Geist, bound to --font-sans (applied as `font-sans`
 * on <html>). Everything that isn't a heading inherits this. */
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* Heading font — Bricolage Grotesque, bound to --font-display and applied to h1–h6. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/* Mono — code snippets, eyebrow labels and stat captions. */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* Accent serif — italic company names in the experience timeline. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  // pins every relative/OG url to the .dev origin so nothing canonicalises back to .site
  metadataBase: new URL(config.site),
  alternates: { canonical: "./" },
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
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
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        geistSans.variable,
        bricolage.variable,
        geistMono.variable,
        instrumentSerif.variable,
        "font-sans",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head>
        {/* ternary, not &&: an empty env value ("") would render a text
            node inside <head> and break hydration */}
        {process.env.UMAMI_SITE_ID ? (
          <Script
            defer
            src={UMAMI_SRC}
            data-website-id={process.env.UMAMI_SITE_ID}
          />
        ) : null}
      </head>
      <body>
        <Providers>
          <SiteFrame githubStars={<GitHubStars className="mr-4" />}>
            {children}
          </SiteFrame>
        </Providers>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
