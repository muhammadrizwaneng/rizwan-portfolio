import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Software Engineer",
    description: profile.summary,
    email: profile.email,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [
      "Node.js",
      "Next.js",
      "React Native",
      "MERN Stack",
      "AWS",
      "FastAPI",
      "MongoDB",
      "TypeScript",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} Portfolio`,
    url: siteUrl,
    description: profile.summary,
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };

  const professional = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: `${profile.name} Professional Profile`,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professional) }}
      />
    </>
  );
}
