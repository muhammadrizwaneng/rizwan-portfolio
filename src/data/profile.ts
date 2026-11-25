export const profile = {
  name: "Muhammad Rizwan",
  title: "Full Stack & Mobile Developer",
  tagline: "Full Stack & Mobile · Backend · Vibe Coding · AI Agents",
  location: "Lahore, Pakistan",
  email: "muhammadrizwaneng@gmail.com",
  phone: "+92 300 0795296",
  linkedin: "https://linkedin.com/in/muhammad-rizwan-fullstack",
  github: "https://github.com/muhammadrizwaneng",
  githubUsername: "muhammadrizwaneng",
  /** Versioned public path so CDNs/browsers do not keep serving an old PDF. */
  /** Unique path — avoids CDN/browser serving a stale PDF after CV updates. */
  resumeUrl: "/muhammad-rizwan-cv-2026-11.pdf",
  avatar: "https://avatars.githubusercontent.com/u/102026105?v=4",
  summary:
    "Full Stack & Mobile Developer with 4+ years shipping secure backends, APIs, and React Native apps (Node.js, Next.js, Python/FastAPI). Delivered enterprise SSO and search for 15,000+ users; builds faster with Cursor/Claude-assisted workflows when useful.",
  stats: [
    { label: "Years experience", value: "4+" },
    { label: "Active users served", value: "15K+" },
    { label: "API latency", value: "<200ms" },
    { label: "Public repos", value: "39" },
  ],
};

export type FeaturedProject = {
  name: string;
  summary: string;
  stack: string[];
  github?: string | null;
  demo?: string | null;
  playStore?: string | null;
  appStore?: string | null;
  /** Official app icon from Google Play (high-res CDN) */
  previewImage?: string | null;
  kaggle?: string | null;
  /** e.g. active Kaggle competition */
  statusLabel?: string | null;
  featured?: boolean;
};

export const skillGroups = [
  {
    title: "Backend",
    description: "APIs, auth, search, and data layers at scale.",
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "Flask",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Elasticsearch",
      "REST",
      "JWT",
    ],
  },
  {
    title: "Mobile",
    description: "Cross-platform apps for iOS and Android.",
    items: [
      "React Native",
      "Expo",
      "Push Notifications",
      "Stripe",
      "Socket.IO",
    ],
  },
  {
    title: "Frontend",
    description: "Modern UI stacks for web products.",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Languages",
    description: "Core languages for web, mobile, and data backends.",
    items: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Cloud / DevOps",
    description: "Deployment, observability, and cloud-native delivery.",
    items: [
      "AWS",
      "Azure",
      "Serverless",
      "Docker",
      "Git",
      "CI/CD",
      "Postman",
      "JIRA",
    ],
  },
  {
    title: "AI / ML & Deep Learning",
    description:
      "Applied ML/RAG work plus training foundations — CNNs, NLP, and fine-tuning workflows.",
    items: [
      "LangChain / RAG",
      "QLoRA fine-tuning",
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "CNN / Convolutions",
      "NLP & Text Analysis",
      "Feature Engineering",
      "Pandas / NumPy",
      "LLM Integrations",
    ],
  },
];

export const experience = [
  {
    company: "SeeBiz PVT LTD",
    location: "Lahore, Pakistan",
    role: "Full Stack & Mobile Developer",
    period: "Jan 2022 – Present",
    highlights: [
      "Architected enterprise SSO with Node.js and Next.js for 15,000+ active users across platform apps.",
      "Built MFA and cryptographic account lifecycle workflows, reducing unauthorized access attempts by 99.9%.",
      "Integrated Elasticsearch, cutting admin search query latency by 40%.",
      "Migrated legacy backends to serverless, reducing cloud costs by 30% and speeding deploys by 25%.",
      "Delivered Flask, FastAPI, and MongoDB APIs for mobile products with sub-200ms response times.",
    ],
  },
  {
    company: "Turn Feat AI",
    location: "Lahore, Pakistan",
    role: "Full Stack & Mobile Developer",
    period: "Jan 2024 – Present",
    highlights: [
      "Shipped contract and milestone flows: work submission, approvals, revision rounds, reviews, and contract PDFs.",
      "Built Stripe payments: wallets, withdrawals, receipts, and subscription plans on mobile.",
      "Implemented Socket.IO chat for 1:1 and project rooms with attachments and push notifications.",
      "Refactored large screens into hooks and shared theme tokens; cut duplicate API calls across iOS and Android.",
    ],
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    name: "HiveTalk",
    stack: [
      "Next.js",
      "Express",
      "Socket.IO",
      "PostgreSQL",
      "TypeScript",
      "AWS",
    ],
    summary:
      "Real-time team messaging with workspaces, channels, and live Socket.IO updates — Next.js frontend and Express API monorepo, deployed on AWS.",
    github: "https://github.com/muhammadrizwaneng/HiveTalk",
    demo: "http://16.178.144.77:3000",
    statusLabel: "Live on AWS",
    featured: true,
  },
  {
    name: "PAKEZY Tourism",
    stack: ["Next.js", "React Native", "FastAPI", "MongoDB", "Maps"],
    summary:
      "Pakistan travel platform with destinations, attractions, packages, and maps — Next.js web app on Vercel plus React Native mobile.",
    github: "https://github.com/muhammadrizwaneng/PAKToursimWeb",
    demo: "https://pakezy.vercel.app",
    playStore: "https://play.google.com/store/apps/details?id=com.paktourism",
    previewImage:
      "https://play-lh.googleusercontent.com/Ey7TsbNBLnbZ5PQ1Jpfi0wGaqaEH85yAcOO9jBf29WCyPcKSvJ7pcbdpZK5MDWimChOWM5UzYUOwTWy_SoIjuQ=w512-h512",
    statusLabel: "Live on Vercel",
    featured: true,
  },
  {
    name: "Utility Hub",
    stack: ["React Native", "Native modules"],
    summary:
      "Offline image-to-PDF and compression utilities with native file system bridges.",
    github: "https://github.com/muhammadrizwaneng/UtilityApp",
    demo: null,
    playStore: "https://play.google.com/store/apps/details?id=com.utilityhub.app",
    previewImage:
      "https://play-lh.googleusercontent.com/3cMJu--3RfLa3yZidAK9SK9zSwJ4hKLlzY7PICYuEpwUihxjWZsf70rSdpo5fD_UV5l_YzMIoFCWAV2DOV26=w512-h512",
    featured: true,
  },
  {
    name: "IRGEMS RAG Assistant",
    stack: [
      "Python",
      "LangChain",
      "ChromaDB",
      "Streamlit",
      "Ollama",
      "Hugging Face",
    ],
    summary:
      "Product RAG assistant: ingest docs into Chroma, retrieve with sentence-transformers, and answer via LangChain + Ollama in a Streamlit UI.",
    github: "https://github.com/muhammadrizwaneng/irgems-rag-assistant",
    demo: null,
    statusLabel: "In progress",
    featured: true,
  },
  {
    name: "rizwan-code-model",
    stack: [
      "Python",
      "QLoRA",
      "Qwen2.5-Coder",
      "Hugging Face",
      "Fine-tuning",
      "Kaggle",
    ],
    summary:
      "Custom coding adapter: QLoRA fine-tune on ~400 curated instruction pairs (FastAPI, React Native, Node, debugging) — trained on Kaggle T4 with a 4-hour budget, without noisy public tutorial datasets.",
    github: "https://github.com/muhammadrizwaneng/coding-model",
    demo: null,
    featured: true,
  },
  {
    name: "Enterprise SSO System",
    stack: ["Node.js", "Next.js", "Elasticsearch", "AWS", "Serverless"],
    summary:
      "Centralized identity platform with MFA, audit trails, and admin search for 15,000+ users. See case study for architecture and metrics.",
    github: null,
    demo: null,
    featured: true,
  },
  {
    name: "Turnfeat.ai",
    stack: ["React Native", "Node.js", "PostgreSQL", "OpenAI"],
    summary:
      "AI freelance marketplace with bidding, escrow, milestones, and skill matching.",
    github: null,
    demo: null,
    playStore: "https://play.google.com/store/apps/details?id=com.turnfeat.ai",
    previewImage:
      "https://play-lh.googleusercontent.com/HZkmZ8gKDMvVPWZbOILArMmCcpWyKMxr0KCR3X-y6iHpBLhy3dCjranwX_jh975kWVJIGzTgM1cQncrm2o796Q=w512-h512",
    featured: true,
  },
  {
    name: "SeeCard",
    stack: ["React Native", "REST APIs", "QR"],
    summary:
      "Digital business cards with live profile editing, QR sharing, and phonebook sync.",
    github: null,
    demo: null,
    playStore: "https://play.google.com/store/apps/details?id=com.seecard",
    appStore: "https://apps.apple.com/pk/app/seecard/id6502513661",
    previewImage:
      "https://play-lh.googleusercontent.com/ZFH4qLEB1TYkD_bnKb9fXcPJzAB97A4StqINjxefFo1_FqRszVyHL_jHolSp1gxbMsCPBgwwVk9tJ9l0vWRK=w512-h512",
    featured: true,
  },
  {
    name: "SeeTask",
    stack: ["React Native", "Real-time", "Multi-tenant"],
    summary:
      "Team workspace app with projects, deadlines, and low-latency notifications.",
    github: null,
    demo: null,
    playStore: "https://play.google.com/store/apps/details?id=com.seetask",
    appStore: "https://apps.apple.com/pk/app/seetask/id6742219504",
    previewImage:
      "https://play-lh.googleusercontent.com/r_RJh534slArjIEubL1A69HkVP4PCwhZcEHzR-SGXrjnNxPlZHUjrwTaT-BeFqkdJy6U0yVKAjehChGdnD6yX5Y=w512-h512",
    featured: true,
  },
  {
    name: "SeeBiz Marketplace",
    stack: ["React Native", "B2B", "Marketplace"],
    summary:
      "B2B marketplace mobile app connecting businesses with catalog and trade workflows.",
    github: null,
    demo: null,
    playStore:
      "https://play.google.com/store/apps/details?id=b2b.seebiz.marketplace",
    appStore: "https://apps.apple.com/pk/app/seebiz/id1624880662",
    previewImage:
      "https://play-lh.googleusercontent.com/VWeT9knKI-zvRC09QVCjAjsy2rI3IFs2ZcRd1KMobAWA0JjJ7fEduBTA5ucCCtIG_jpk6lbqMiZRMMYiqqvL=w512-h512",
    featured: true,
  },
  {
    name: "Krub.ai",
    stack: ["React Native", "B2B", "AI"],
    summary:
      "B2B community and AI-assisted platform for business networking and discovery.",
    github: null,
    demo: null,
    playStore: "https://play.google.com/store/apps/details?id=com.b2bcommunity",
    appStore: "https://apps.apple.com/pk/app/krub-ai/id6747217722",
    previewImage:
      "https://play-lh.googleusercontent.com/Uj41PlecUvYj3Ts-35HNLEJ3WUKFkziLc5auzUTzSO7N99Zvmbi-3HI7OlnxsRr_JhEYTPhcAc9OJJCw41a6BQ=w512-h512",
    featured: true,
  },
  {
    name: "ZeroAds Downloader",
    stack: ["Next.js", "Android", "Vercel", "YouTube"],
    summary:
      "Ad-free YouTube and social media downloader for Android — APK distribution site plus download API, deployed on Vercel.",
    github: "https://github.com/muhammadrizwaneng/zeroad_downloader",
    demo: "https://zeroad-downloader.vercel.app",
    statusLabel: "Live on Vercel",
    featured: true,
  },
  {
    name: "Enveda CASMI 2026 — Molecule ID",
    stack: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "Mass Spectrometry",
      "Cheminformatics",
      "Kaggle",
    ],
    summary:
      "Active Kaggle challenge: identify small molecules from tandem mass spectra using ML baselines, fingerprint channels, validation sweeps, and ranked retrieval pipelines.",
    github: null,
    demo: null,
    kaggle:
      "https://www.kaggle.com/competitions/enveda-CASMI26-molecule-id-mass-spectra",
    statusLabel: "Active competition",
    featured: true,
  },
  {
    name: "ApexBid",
    stack: ["Next.js", "TypeScript", "Auction"],
    summary:
      "Online auction web app for listing, bidding, and live auction flows — Next.js frontend work in progress.",
    github: "https://github.com/muhammadrizwaneng/apexbid",
    demo: null,
    statusLabel: "In progress",
    featured: false,
  },
  {
    name: "AI Sales Analytics",
    stack: ["Python", "BERT", "TAPAS", "Random Forest"],
    summary:
      "Demand forecasting and semantic product search with fine-tuned NLP models.",
    github: "https://github.com/muhammadrizwaneng/coding-model",
    demo: null,
    featured: false,
  },
  {
    name: "Smart Shopping (AI)",
    stack: ["Next.js", "TypeScript", "MERN", "AI"],
    summary:
      "AI-assisted e-commerce storefront with modern Next.js UX patterns.",
    github: "https://github.com/muhammadrizwaneng/SmartShopWithAINextRepo",
    demo: null,
    featured: false,
  }

];

export const githubProjects = [
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
    name: "coding-model (rizwan-code-model)",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/coding-model",
    description:
      "QLoRA adapter on Qwen2.5-Coder — curated SFT data and local FastAPI chat.",
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
    name: "Auction Platform",
    language: "JavaScript",
    url: "https://github.com/muhammadrizwaneng/aution-platform",
    description: "Auction platform experiment with Next.js bidding flows.",
    statusLabel: "In progress",
  },
  {
    name: "FastAPI E-Commerce",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/FastAPI-E-Commerce-Platform",
    description: "Scalable e-commerce backend with FastAPI.",
    statusLabel: "In progress",
  },
  {
    name: "YOLO FastAPI",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/yolo_fastapi",
    description: "Computer vision API service with YOLO and FastAPI.",
    statusLabel: "In progress",
  },
  {
    name: "FastAPI ML Service",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/fastapi-ml-service",
    description: "ML inference service scaffolded with FastAPI.",
    statusLabel: "In progress",
  },
  {
    name: "Google Authenticator (Node)",
    language: "JavaScript",
    url: "https://github.com/muhammadrizwaneng/google-authenticator-nodejs",
    description: "TOTP 2FA helpers — secret, QR, and token verification in Node.",
    statusLabel: "In progress",
  },
  {
    name: "Smart Shopping (AI)",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/SmartShopWithAINextRepo",
    description: "Next.js storefront with AI-assisted shopping flows.",
    statusLabel: "In progress",
  },
  {
    name: "SmartShopping (Mobile)",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/SmartShopping",
    description: "React Native companion app for AI-assisted shopping.",
    statusLabel: "In progress",
  },
  {
    name: "Travel Booking App",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/travel-booking-app",
    description: "Modern travel booking experience in Next.js.",
    statusLabel: "In progress",
  },
  {
    name: "PakTourism (Mobile)",
    language: "JavaScript",
    url: "https://github.com/muhammadrizwaneng/PakTourism",
    description: "React Native tourism app for destinations and travel flows.",
    statusLabel: "In progress",
  },
  {
    name: "Utility Hub",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/UtilityApp",
    description: "Offline image-to-PDF and compression utilities (React Native).",
    statusLabel: "In progress",
  },
  {
    name: "Plant Disease Detection",
    language: "Jupyter",
    url: "https://github.com/muhammadrizwaneng/Plant-disease-detection",
    description: "ML notebook pipeline for crop disease classification.",
    statusLabel: "In progress",
  },
  {
    name: "Data Analysis Notebooks",
    language: "Jupyter",
    url: "https://github.com/muhammadrizwaneng/data_analysis_notebook",
    description: "EDA and analytics notebooks from data science practice work.",
    statusLabel: "In progress",
  },
  {
    name: "TinyGems",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/tinygems",
    description: "Lightweight TypeScript utility / app project.",
    statusLabel: "In progress",
  },
  {
    name: "Pixio App",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/pixioApp",
    description: "React Native media / photo app experiment.",
    statusLabel: "In progress",
  },
  {
    name: "AI Will",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/AI_Will",
    description: "Python AI project exploring document / will assistant flows.",
    statusLabel: "In progress",
  },
];

export type EducationItem = {
  school: string;
  location: string;
  degree: string;
  period: string;
  note?: string;
};

export const education: EducationItem[] = [
  {
    school: "Gomal University",
    location: "D.I. Khan, KPK",
    degree: "Bachelor of Science in Software Engineering",
    period: "2017 – 2021",
  },
];

export type CertificationItem = {
  title: string;
  issuer: string;
  period: string;
  note: string;
};

/** Certifications / professional training (shown on CV + certificates UI). */
export const certifications: CertificationItem[] = [
  {
    title:
      "Artificial Intelligence (Machine Learning & Deep Learning) — Professional Training",
    issuer: "Metawise",
    period: "2024 – 2025",
    note: "Neural networks, CNNs (VGG, ResNet-50), NLP, feature engineering, Azure ML.",
  },
  {
    title: "AI, Machine Learning and Data Science",
    issuer: "PNY Training Center",
    period: "Mar 2025 – Jun 2025",
    note: "Four-month instructor-led course covering ML fundamentals, data science workflows, and hands-on projects.",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#case-study", label: "Case study" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
  { href: "/attractive", label: "Interactive" },
];
