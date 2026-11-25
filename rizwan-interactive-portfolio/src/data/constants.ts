// thoda zada ts ho gya idhar
// order = keycap layout, 6 per row
export enum SkillNames {
  JS = "js",
  TS = "ts",
  REACT = "react",
  NEXTJS = "nextjs",
  CURSOR = "cursor",
  EXPO = "expo",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  KAGGLE = "kaggle",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  LINUX = "linux",
  GIT = "git",
  COLAB = "colab",
  DOCKER = "docker",
  NGINX = "nginx",
  CLAUDE = "claude",
  CLOUDFLARE = "cloudflare",
  GCP = "gcp",
  AWS = "aws",
  HOME_ASSISTANT = "homeassistant",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  /** Optional local artwork for the 3D key; falls back to icon. */
  keyboardIcon?: string;
  /** Plastic color of the 3D keycap; independent of the HTML brand accent. */
  keyboardColor?: string;
  /** Browser KeyboardEvent.code, e.g. KeyJ. Defaults to the displayed key order. */
  shortcut?: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "yeeting code into the DOM since '95, no cap! 💯🚀",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    keyboardIcon: "/assets/keyboard/logos/js.svg",
    keyboardColor: "#ff9408",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "JavaScript's overachieving cousin who's always flexing 💯🔒",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    keyboardIcon: "/assets/keyboard/logos/ts.svg",
    keyboardColor: "#008fd5",
  },
  [SkillNames.REACT]: {
    id: 3,
    name: "react",
    label: "React",
    shortDescription: `"use using" 
using use = useUsing("use")`,
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    keyboardIcon: "/assets/keyboard/logos/react.svg",
    keyboardColor: "#00cce8",
  },
  [SkillNames.NEXTJS]: {
    id: 4,
    name: "nextjs",
    label: "Next.js",
    shortDescription:
      "the drama queen of front-end frameworks, and we stan! 👑📜",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nextjs.svg",
    keyboardColor: "#333537",
  },
  [SkillNames.CURSOR]: {
    id: 5,
    name: "cursor",
    label: "Cursor",
    shortDescription: "AI-assisted editor — rules, agents, and ship faster ⚡",
    color: "#6b7280",
    icon: "https://cdn.simpleicons.org/cursor/6B7280",
    keyboardIcon: "/assets/keyboard/logos/cursor.svg",
    keyboardColor: "#111827",
  },
  [SkillNames.EXPO]: {
    id: 6,
    name: "expo",
    label: "Expo",
    shortDescription: "one codebase, every screen, zero Xcode tears 📱✨",
    color: "#000020",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg",
    keyboardIcon: "/assets/keyboard/logos/expo.svg",
    keyboardColor: "#1b1f2e",
  },
  [SkillNames.TAILWIND]: {
    id: 7,
    name: "tailwind",
    label: "Tailwind",
    shortDescription: "utility classes hitting different fr fr 🌪️🔥",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    keyboardIcon: "/assets/keyboard/logos/tailwind.svg",
    keyboardColor: "#00bfd8",
  },
  [SkillNames.NODEJS]: {
    id: 8,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "JavaScript said 'sike, I'm backend now', deadass! 🔙🔚",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nodejs.svg",
    keyboardColor: "#00952c",
  },
  [SkillNames.EXPRESS]: {
    id: 9,
    name: "express",
    label: "Express",
    shortDescription: "middlewares go dummy hard, no cap! 🚂💨",
    color: "#fff",
    icon: "https://cdn.simpleicons.org/express/9CA3AF",
    keyboardIcon: "/assets/keyboard/logos/express.svg",
    keyboardColor: "#343638",
  },
  [SkillNames.KAGGLE]: {
    id: 10,
    name: "kaggle",
    label: "Kaggle",
    shortDescription: "notebooks, GPUs, and competition-grade ML baselines 📊",
    color: "#20beff",
    icon: "https://cdn.simpleicons.org/kaggle/20BEFF",
    keyboardIcon: "/assets/keyboard/logos/kaggle.svg",
    keyboardColor: "#20beff",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "SQL but make it fashion, purr 💅🐘",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    keyboardIcon: "/assets/keyboard/logos/postgres.svg",
    keyboardColor: "#146888",
  },
  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "flexin' with that NoSQL drip, respectfully! 💪🍃",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    keyboardIcon: "/assets/keyboard/logos/mongodb.svg",
    keyboardColor: "#00c51b",
  },
  [SkillNames.LINUX]: {
    id: 13,
    name: "linux",
    label: "Linux",
    shortDescription: "where 'chmod 777' is the ultimate flex 🔓🙌",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    keyboardIcon: "/assets/keyboard/logos/linux.svg",
    keyboardColor: "#333537",
  },
  [SkillNames.GIT]: {
    id: 14,
    name: "git",
    label: "Git",
    shortDescription: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    keyboardIcon: "/assets/keyboard/logos/git.svg",
    keyboardColor: "#ff4622",
  },
  [SkillNames.COLAB]: {
    id: 15,
    name: "colab",
    label: "Google Colab",
    shortDescription: "T4 GPUs, notebooks, and fine-tune marathons ☁️",
    color: "#f9ab00",
    icon: "https://cdn.simpleicons.org/googlecolab/F9AB00",
    keyboardIcon: "/assets/keyboard/logos/colab.svg",
    keyboardColor: "#f9ab00",
  },
  [SkillNames.DOCKER]: {
    id: 16,
    name: "docker",
    label: "Docker",
    shortDescription: "The best containerization! 🐳🔥",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    keyboardIcon: "/assets/keyboard/logos/docker.svg",
    keyboardColor: "#009fe8",
  },
  [SkillNames.NGINX]: {
    id: 17,
    name: "nginx",
    label: "NginX",
    shortDescription: "reverse proxy go zoom zoom, sheesh! 🚗💨",
    color: "#008000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nginx.svg",
    keyboardColor: "#00a20b",
  },
  [SkillNames.CLAUDE]: {
    id: 18,
    name: "claude",
    label: "Claude",
    shortDescription: "my pair programmer that never asks for a coffee break 🤖☕",
    color: "#d97757",
    icon: "https://cdn.simpleicons.org/claude/D97757",
    keyboardIcon: "/assets/keyboard/logos/claude.svg",
    keyboardColor: "#d97757",
  },
  [SkillNames.CLOUDFLARE]: {
    id: 19,
    name: "cloudflare",
    label: "Cloudflare",
    shortDescription: "edge go brrr, my homelab hides behind this orange cloud ☁️🛡️",
    color: "#f38020",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
    keyboardIcon: "/assets/keyboard/logos/cloudflare.svg",
    keyboardColor: "#f38020",
  },
  [SkillNames.GCP]: {
    id: 20,
    name: "gcp",
    label: "Google Cloud",
    shortDescription:
      "cloud computing but make it Google vibes, living rent free! ☁️🔥",
    color: "#4285f4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    keyboardIcon: "/assets/keyboard/logos/gcp.svg",
    keyboardColor: "#008fd5",
  },
  [SkillNames.AWS]: {
    id: 21,
    name: "aws",
    label: "AWS",
    shortDescription:
      "always extra, making everything more complicated, period! 🌐👨‍💻",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
    keyboardIcon: "/assets/keyboard/logos/aws.svg",
    keyboardColor: "#ff9208",
  },
  [SkillNames.HOME_ASSISTANT]: {
    id: 22,
    name: "homeassistant",
    label: "Home Assistant",
    shortDescription: "my house runs on YAML and vibes, lights obey me fr 🏠💡",
    color: "#18bcf2",
    icon: "https://cdn.simpleicons.org/homeassistant/18BCF2",
    keyboardIcon: "/assets/keyboard/logos/homeassistant.svg",
    keyboardColor: "#03a9f4",
  },
};

export type Experience = {
  id: number;
  // multiple periods = returning stint, avoids a duplicate card
  periods: { start: string; end: string }[];
  title: string;
  company: string;
  location: string;
  // short initials shown in the logo tile
  logo: string;
  /** LinkedIn-style employment type, e.g. "Full-time", "Freelance". */
  employment?: string;
  /** On-site / Remote / Hybrid. */
  workplace?: string;
  summary: string;
  description: string[];
  skills: SkillNames[];
};

// Newest first. SeeBiz is one continuous role (intern folded into full-time).
export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    periods: [{ start: "Jan 2022", end: "Present" }],
    title: "Executive Software Engineer",
    company: "SeeBiz PVT LTD",
    location: "Lahore, Pakistan",
    logo: "SB",
    employment: "Full-time",
    workplace: "On-site",
    summary:
      "Backend, mobile, and platform engineering: enterprise SSO for 15,000+ users, Elasticsearch search, and AWS Lambda APIs.",
    description: [
      "Architected enterprise SSO with Node.js and Next.js for 15,000+ active users across platform apps.",
      "Built MFA and secure account lifecycle flows (JWT signing, password hashing, verification, recovery, deactivation), blocking 99.9% of unauthorized login attempts.",
      "Built and shipped SeeCard, a React Native digital business card app (live profiles, QR sharing, catalogs), on Play Store and App Store.",
      "Integrated Elasticsearch, cutting admin search query latency by 40%.",
      "Migrated legacy backends to AWS Lambda / serverless, reducing cloud costs by 30% and speeding deploys by 25%.",
      "Delivered Flask, FastAPI, and MongoDB APIs for mobile products with sub-200ms response times.",
    ],
    skills: [
      SkillNames.NEXTJS,
      SkillNames.REACT,
      SkillNames.EXPO,
      SkillNames.NODEJS,
      SkillNames.AWS,
      SkillNames.DOCKER,
      SkillNames.GIT,
      SkillNames.CURSOR,
    ],
  },
  {
    id: 2,
    periods: [{ start: "Jan 2024", end: "Present" }],
    title: "Software Engineer",
    company: "Turn Feat AI",
    location: "Lahore, Pakistan",
    logo: "TF",
    employment: "Contract · Part-time",
    workplace: "Hybrid",
    summary:
      "React Native / Node engineer on Turnfeat: contracts, Stripe payments, and Socket.IO chat (part-time contract).",
    description: [
      "Shipped contract and milestone flows on React Native (submissions, approvals, revisions, reviews, PDFs).",
      "Built Stripe payments on mobile: wallets, withdrawals, receipts, and subscription plans.",
      "Implemented Socket.IO chat for 1:1 and project rooms with attachments and push notifications.",
      "Refactored large screens into hooks and shared theme tokens; removed duplicate API calls across iOS and Android.",
    ],
    skills: [
      SkillNames.REACT,
      SkillNames.EXPO,
      SkillNames.TS,
      SkillNames.NODEJS,
      SkillNames.GIT,
    ],
  },
];

export type Education = {
  institution: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  location: string;
  logo: string;
};

/** Shown at the end of the Experience timeline (Talha-style), after job roles. */
export const EDUCATION: Education[] = [
  {
    institution: "Gomal University",
    degree: "Bachelor of Science in Software Engineering",
    field: "Software Engineering",
    start: "2017",
    end: "2021",
    location: "D.I. Khan, KPK",
    logo: "GU",
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
