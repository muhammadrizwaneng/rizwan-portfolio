export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  /** Small uppercase label above the title. */
  category: string;
  /** Topics the credential covers, shown as chips. */
  topics: string[];
  /** Public verification link. */
  url: string;
  /** Shown after issuer, e.g. Credly or LinkedIn. */
  verifyVia?: string;
};

/** Matches the Training & Courses block on Muhammad Rizwan's résumé. */
export const CERTIFICATES: Certificate[] = [
  {
    id: "ai-ml-dl-metawise-2024",
    title:
      "Artificial Intelligence (Machine Learning & Deep Learning) — Professional Training",
    issuer: "Metawise",
    category: "Metawise Academy",
    topics: [
      "Neural networks & CNNs",
      "VGG / ResNet-50",
      "NLP",
      "Feature engineering",
      "Azure ML",
      "Python for ML",
    ],
    url: "https://www.linkedin.com/in/muhammad-rizwan-fullstack",
    verifyVia: "LinkedIn",
  },
  {
    id: "ai-ml-ds-pny-2025",
    title: "AI, Machine Learning and Data Science",
    issuer: "PNY Training Center",
    category: "PNY Training",
    topics: [
      "Machine learning",
      "Data science",
      "Python",
      "Supervised learning",
      "Hands-on projects",
    ],
    url: "https://www.linkedin.com/in/muhammad-rizwan-fullstack",
    verifyVia: "LinkedIn",
  },
];