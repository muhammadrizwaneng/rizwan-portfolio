import { iffatProfile } from "@/data/iffat-profile";
import { siteUrl } from "@/lib/site";

export function IffatJsonLd() {
  const url = `${siteUrl}/iffat`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: iffatProfile.name,
    jobTitle: "Content Writer",
    description: iffatProfile.summary,
    email: iffatProfile.email,
    telephone: iffatProfile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    url,
    knowsAbout: [
      "Content Writing",
      "SEO",
      "Keyword Research",
      "On-Page SEO",
      "Proofreading",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
