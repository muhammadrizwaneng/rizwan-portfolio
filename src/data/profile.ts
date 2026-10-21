export const profile = {
  name: "Muhammad Rizwan",
  title: "Software Engineer",
  tagline: "Full Stack & Mobile · Backend · AI Integrations",
  location: "Lahore, Pakistan",
  email: "muhammadrizwaneng@gmail.com",
  phone: "+92 300 0795296",
  linkedin: "https://linkedin.com/in/muhammad-rizwan-fullstack",
  github: "https://github.com/muhammadrizwaneng",
  githubUsername: "muhammadrizwaneng",
  avatar: "https://avatars.githubusercontent.com/u/102026105?v=4",
  summary:
    "Software Engineer with 4+ years of experience building secure, scalable backend systems and cross-platform mobile applications. Specialized in Node.js, Next.js, Python (FastAPI/Flask), and React Native, with hands-on delivery of enterprise authentication, search, and AI-integrated products serving 15,000+ active users.",
  stats: [
    { label: "Years experience", value: "4+" },
    { label: "Active users served", value: "15K+" },
    { label: "API latency", value: "<200ms" },
    { label: "Public repos", value: "36" },
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
    title: "Languages",
    description: "Core languages for web, mobile, and data backends.",
    items: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    description: "Modern UI stacks for web and cross-platform mobile.",
    items: ["React.js", "Next.js", "React Native", "Tailwind CSS", "HTML/CSS"],
  },
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
      "Foundations from Artificial Intelligence (ML & DL) training — regression, CNNs, NLP, and applied model workflows.",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "CNN / Convolutions",
      "VGG & ResNet",
      "NLP & Text Analysis",
      "Linear & Logistic Regression",
      "K-Means Clustering",
      "Feature Engineering",
      "Pandas / NumPy",
      "Data Preprocessing",
      "LLM Integrations",
    ],
  },
];

export const experience = [
  {
    company: "SeeBiz PVT LTD",
    location: "Lahore, Pakistan",
    role: "Software Engineer",
    period: "July 2022 – Present",
    highlights: [
      "Architected enterprise SSO with Node.js and Next.js for 15,000+ active users across platform apps.",
      "Built MFA and cryptographic account lifecycle workflows, reducing unauthorized access attempts by 99.9%.",
      "Integrated Elasticsearch, cutting admin search query latency by 40%.",
      "Migrated legacy backends to serverless, reducing cloud costs by 30% and speeding deploys by 25%.",
      "Delivered Flask, FastAPI, and MongoDB APIs for mobile products with sub-200ms response times.",
    ],
  },
  {
    company: "SeeBiz PVT LTD",
    location: "Lahore, Pakistan",
    role: "Software Engineer Intern",
    period: "Jan 2022 – June 2022",
    highlights: [
      "Modeled 10+ database schemas and scalable backends with MySQL and MongoDB.",
      "Implemented JWT auth and input validation across 5+ microservices.",
      "Supported agile delivery, integration, and debugging with 99.9% uptime during releases.",
    ],
  },
];

export const featuredProjects: FeaturedProject[] = [
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
    name: "PAKEZY Tourism",
    stack: ["React Native", "FastAPI", "MongoDB", "Maps"],
    summary:
      "Regional travel ecosystem with optimized geo-spatial APIs and map microservices.",
    github: "https://github.com/muhammadrizwaneng/PakTourism",
    demo: null,
    playStore: "https://play.google.com/store/apps/details?id=com.paktourism",
    previewImage:
      "https://play-lh.googleusercontent.com/Ey7TsbNBLnbZ5PQ1Jpfi0wGaqaEH85yAcOO9jBf29WCyPcKSvJ7pcbdpZK5MDWimChOWM5UzYUOwTWy_SoIjuQ=w512-h512",
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
    name: "AI Sales Analytics",
    stack: ["Python", "BERT", "TAPAS", "Random Forest"],
    summary:
      "Demand forecasting and semantic product search with fine-tuned NLP models.",
    github: "https://github.com/muhammadrizwaneng/coding-model",
    demo: null,
    featured: true,
  },
  {
    name: "Smart Shopping (AI)",
    stack: ["Next.js", "TypeScript", "MERN", "AI"],
    summary:
      "AI-assisted e-commerce storefront with modern Next.js UX patterns.",
    github: "https://github.com/muhammadrizwaneng/SmartShopWithAINextRepo",
    demo: null,
    featured: true,
  },
];

export const githubProjects = [
  {
    name: "FastAPI E-Commerce",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/FastAPI-E-Commerce-Platform",
    description: "Scalable e-commerce backend with FastAPI.",
  },
  {
    name: "YOLO FastAPI",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/yolo_fastapi",
    description: "Computer vision API service with YOLO and FastAPI.",
  },
  {
    name: "coding-model (rizwan-code-model)",
    language: "Python",
    url: "https://github.com/muhammadrizwaneng/coding-model",
    description:
      "QLoRA adapter on Qwen2.5-Coder — curated SFT data, Kaggle training workflow, local FastAPI chat server.",
  },
  {
    name: "Plant Disease Detection",
    language: "Jupyter",
    url: "https://github.com/muhammadrizwaneng/Plant-disease-detection",
    description: "ML notebook pipeline for crop disease classification.",
  },
  {
    name: "Smart Shopping (AI)",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/SmartShopWithAINextRepo",
    description: "Next.js storefront with AI-assisted shopping flows.",
  },
  {
    name: "Travel Booking App",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/travel-booking-app",
    description: "Modern travel booking experience in Next.js.",
  },
  {
    name: "TinyGems",
    language: "TypeScript",
    url: "https://github.com/muhammadrizwaneng/tinygems",
    description: "Lightweight TypeScript utility / app project.",
  },
];

export const education = [
  {
    school: "ML, DL & NLP — Professional Training",
    location: "Instructor-led (Abdul Bari Khan)",
    degree: "Artificial Intelligence (Machine Learning & Deep Learning)",
    period: "2024 – 2025",
    note: "Labs and coursework: Python for ML, linear & logistic regression, polynomial regression, k-means, neural networks, CNNs (convolution, VGG, ResNet-50), NLP & text analysis, feature engineering, Azure ML basics, and model evaluation.",
  },
  {
    school: "Gomal University",
    location: "D.I. Khan, KPK",
    degree: "Bachelor of Science in Software Engineering",
    period: "2017 – 2021",
  },
  {
    school: "Govt. College Boys Fatehpur",
    location: "Layyah",
    degree: "FSc (Pre-Engineering)",
    period: "2015 – 2017",
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
];
