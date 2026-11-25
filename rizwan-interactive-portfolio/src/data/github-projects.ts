export type GithubProject = {
  name: string;
  language: string;
  url: string;
  description: string;
  statusLabel?: string;
};

/** Public repos from github.com/muhammadrizwaneng */
export const GITHUB_PROJECTS: GithubProject[] = [
  {
    name: "HiveTalk",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/HiveTalk",
    description:
      "Real-time team chat monorepo — Next.js, Express, Socket.IO (live on AWS).",
    statusLabel: "In progress",
  },
  {
    name: "IRGEMS RAG Assistant",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/irgems-rag-assistant",
    description:
      "LangChain + ChromaDB RAG product assistant with Streamlit and Ollama.",
    statusLabel: "In progress",
  },
  {
    name: "coding-model",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/coding-model",
    description:
      "QLoRA adapter on Qwen2.5-Coder — trained on Kaggle T4 / Colab-style notebooks.",
    statusLabel: "In progress",
  },
  {
    name: "ZeroAds Downloader",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/zeroad_downloader",
    description:
      "Ad-free YouTube / social downloader — Android APK site + API on Vercel.",
    statusLabel: "In progress",
  },
  {
    name: "ApexBid",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/apexbid",
    description: "Next.js auction marketplace UI for listings and bidding.",
    statusLabel: "In progress",
  },
  {
    name: "PAKTourismWeb",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/PAKTourismWeb",
    description: "PAKEZY tourism web app — destinations and packages on Vercel.",
    statusLabel: "Live",
  },
  {
    name: "UtilityApp",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/UtilityApp",
    description: "Utility Hub — offline image-to-PDF and tools (React Native).",
    statusLabel: "Live",
  },
  {
    name: "FastAPI E-Commerce",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/FastAPI-E-Commerce-Platform",
    description: "Scalable e-commerce backend with FastAPI.",
    statusLabel: "In progress",
  },
  {
    name: "yolo_fastapi",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/yolo_fastapi",
    description: "Computer vision API with YOLO and FastAPI.",
    statusLabel: "In progress",
  },
  {
    name: "Plant-disease-detection",
    language: "Jupyter",
    url: "https://github.com/muhammadrizwaneng/Plant-disease-detection",
    description: "ML notebook pipeline for crop disease classification.",
    statusLabel: "Notebook",
  },
  {
    name: "data_analysis_notebook",
    language: "Jupyter",
    url: "https://github.com/muhammadrizwaneng/data_analysis_notebook",
    description: "EDA and analytics notebooks (Colab-friendly workflows).",
    statusLabel: "Notebook",
  },
  {
    name: "google-authenticator-nodejs",
    language: "JavaScript",
    url: "https://github.com/muhammadrizwaneng/google-authenticator-nodejs",
    description: "TOTP 2FA helpers — secret, QR, and token verification in Node.",
    statusLabel: "In progress",
  },
];

export const GITHUB_REPOS_URL =
  "https://github.com/muhammadrizwaneng?tab=repositories";