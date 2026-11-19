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

/** Matches the Certifications / training block on Muhammad Rizwan's résumé. */
export const CERTIFICATES: Certificate[] = [
  {
    id: "ai-ml-dl-2024",
    title: "Artificial Intelligence (Machine Learning & Deep Learning)",
    issuer: "Metawise",
    category: "Metawise Academy",
    topics: [
      "Python for ML",
      "Linear & logistic regression",
      "Neural networks & CNNs",
      "VGG / ResNet",
      "NLP & text analysis",
      "Kaggle competitions",
      "Google Colab",
      "Azure ML basics",
    ],
    url: "https://www.linkedin.com/in/muhammad-rizwan-fullstack",
    verifyVia: "LinkedIn",
  },
];