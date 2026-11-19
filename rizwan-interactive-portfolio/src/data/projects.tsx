import AceTernityLogo from "@ix/components/logos/aceternity";
import SlideShow from "@ix/components/slide-show";
import { Button } from "@ix/components/ui/button";
import { TypographyH3, TypographyP } from "@ix/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({
  live,
  repo,
  kaggle,
}: {
  live?: string;
  repo?: string;
  kaggle?: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {kaggle && kaggle !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={kaggle}
        >
          <Button variant={"default"} size={"sm"}>
            Kaggle
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  chakra: brand("Chakra UI", "chakra-ui-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  prisma: brand("Prisma", "prisma-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  reactQuery: brand("React Query", "react-query-mono.svg"),
  shadcn: brand("shadcn/ui", "shadcn-ui-mono.svg"),
  // Not in the thesvg registry — keep the existing custom logo.
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: brand("Firebase", "firebase-mono.svg"),
  sockerio: brand("Socket.io", "socketdotio-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  vue: brand("Vue.js", "vuedotjs-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  sanity: brand("Sanity", "sanity-mono.svg"),
  gsap: brand("GSAP", "gsap-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  hono: brand("Hono", "hono-mono.svg"),
  redis: brand("Redis / BullMQ", "redis-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  // React Native reuses the React mark.
  reactNative: brand("React Native", "react-mono.svg"),
  betterAuth: brand("Better Auth", "better-auth-mono.svg"),
  // Not in the thesvg registry — keep the text marks.
  zustand: {
    title: "Zustand",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Zu</span>,
  },
  partykit: {
    title: "PartyKit",
    bg: "black",
    fg: "white",
    icon: <span className="text-base">🎈</span>,
  },
  hocuspocus: {
    title: "Hocuspocus",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Hp</span>,
  },
  // React Flow ships under the xyflow brand.
  reactFlow: brand("React Flow", "xyflow-mono.svg"),
  codemirror: brand("CodeMirror", "codemirror-mono.svg"),
  // "Satori / sharp" — uses the sharp mark.
  satori: brand("Satori / sharp", "sharp-mono.svg"),
  turborepo: brand("Turborepo", "turborepo-mono.svg"),
  // Vercel AI SDK uses the Vercel mark.
  aiSDK: brand("Vercel AI SDK", "vercel-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  mistral: brand("Mistral AI", "mistral-ai-mono.svg"),
  electron: brand("Electron", "electron-mono.svg"),
  vite: brand("Vite", "vite-mono.svg"),
  astro: brand("Astro", "astro-mono.svg"),
  sqlite: brand("SQLite", "sqlite-mono.svg"),
  ffmpeg: brand("FFmpeg", "ffmpeg-mono.svg"),
  ollama: brand("Ollama", "ollama-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  nextIntl: {
    title: "next-intl",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">i18n</span>,
  },
  // Not in the thesvg registry — keep the text marks.
  expo: {
    title: "Expo",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Expo</span>,
  },
  mcp: {
    title: "MCP",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">MCP</span>,
  },
  // Not in the thesvg registry — keep the text marks.
  redux: {
    title: "Redux Toolkit",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">RTK</span>,
  },
  stripe: {
    title: "Stripe",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">S</span>,
  },
  php: {
    title: "PHP (CodeIgniter)",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">PHP</span>,
  },
  elasticsearch: {
    title: "Elasticsearch",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">ES</span>,
  },
  kafka: {
    title: "Kafka",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Kf</span>,
  },  laravel: {
    title: "Laravel",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Lv</span>,
  },
  mysql: {
    title: "MySQL",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">SQL</span>,
  },
  awsS3: {
    title: "AWS S3",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">S3</span>,
  },
  kaggle: {
    title: "Kaggle",
    bg: "black",
    fg: "white",
    icon: <MaskIcon src="/assets/keyboard/logos/kaggle.svg" title="Kaggle" />,
  },
  colab: {
    title: "Google Colab",
    bg: "black",
    fg: "white",
    icon: <MaskIcon src="/assets/keyboard/logos/colab.svg" title="Google Colab" />,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  /** One-line pitch shown on the stacked card. */
  summary: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  kaggle?: string;
  /** Optional wallpaper behind the preview, e.g. "/assets/backgrounds/<id>.jpg". */
  bg?: string;
  live: string;
};

const asset = (id: string, file: string) => `${BASE_PATH}/${id}/${file}`;

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="font-mono mb-2 list-disc pl-6 space-y-2">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const projects: Project[] = [
  {
    id: "enterprise-sso",
    category: "Identity platform",
    title: "Enterprise SSO",
    summary:
      "Centralized SSO with MFA, audit trails, and Elasticsearch admin search for 15,000+ users.",
    src: asset("enterprise-sso", "home.webp"),
    screenshots: ["home.webp"],
    live: "#",
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.react, PROJECT_SKILLS.ts],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.elasticsearch,
        PROJECT_SKILLS.postgres,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Centralized identity for SeeBiz platform apps — MFA, lifecycle
            workflows, and fast admin search.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Security &amp; MFA</TypographyH3>
          <Bullets
            items={[
              "Enterprise SSO across multiple apps with JWT sessions and role-based access.",
              "MFA and cryptographic account lifecycle flows; unauthorized access attempts down 99.9%.",
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Search &amp; ops</TypographyH3>
          <Bullets
            items={[
              "Elasticsearch-backed admin search — query latency improved by 40%.",
              "Serverless migration cut AWS costs ~30% and deploy time ~25%.",
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "turnfeat",
    category: "Freelance marketplace app",
    title: "Turnfeat",
    summary:
      "Android and iOS app for a freelance marketplace: contracts, payments and real-time chat.",
    src: asset("turnfeat", "home.webp"),
    screenshots: ["home.webp"],
    live: "https://turnfeat.ai/",
    skills: {
      frontend: [
        PROJECT_SKILLS.reactNative,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.redux,
      ],
      backend: [
        PROJECT_SKILLS.sockerio,
        PROJECT_SKILLS.stripe,
        PROJECT_SKILLS.firebase,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Android and iOS app for a freelance marketplace: contracts, payments
            and real-time chat.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Contracts &amp; jobs</TypographyH3>
          <Bullets
            items={[
              "Built the full contract and job flow: job progress bar with a live contract clock, deadline extensions, work submission and approval, revision rounds, two-way reviews and contract PDF generation.",
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Payments</TypographyH3>
          <Bullets
            items={[
              "Built the payments features with Stripe: payment cards, wallet, withdrawals, transactions and receipts, and subscription plans.",
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Real-time chat</TypographyH3>
          <Bullets
            items={[
              "Built real-time 1:1 and project chat over Socket.IO, with attachments and push notifications.",
              "Built a support-agent admin app with a live-chat queue and Cloudflare Turnstile login protection.",
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Code quality</TypographyH3>
          <Bullets
            items={[
              "Improved code quality and design consistency over 185+ commits: split large screens into hooks and components, moved colours to shared theme tokens, removed duplicate API calls, and restyled screens to match the web app on phone and tablet.",
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "seebiz-b2b",
    category: "B2B marketplace",
    title: "SeeBiz B2B",
    summary:
      "A B2B wholesale marketplace connecting manufacturers, distributors and retailers for bulk trade.",
    src: asset("seebiz-b2b", "home.webp"),
    screenshots: ["home.webp"],
    live: "https://play.google.com/store/apps/details?id=b2b.seebiz.marketplace",
    skills: {
      frontend: [
        PROJECT_SKILLS.reactNative,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.redux,
      ],
      backend: [
        PROJECT_SKILLS.sockerio,
        PROJECT_SKILLS.stripe,
        PROJECT_SKILLS.firebase,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A B2B wholesale marketplace connecting manufacturers, distributors
            and retailers for bulk trade.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Inventory &amp; billing</TypographyH3>
          <Bullets
            items={[
              "Implemented inventory management and invoicing so wholesalers can track stock, manage multiple warehouses and automate billing.",
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Vendor &amp; buyer tools</TypographyH3>
          <Bullets
            items={[
              "Built secure vendor-buyer modules with custom group pricing, bulk order processing and direct B2B messaging.",
              "Optimized large product catalogs and search to handle thousands of verified vendors and product lines.",
            ]}
          />
        </div>
      );
    },
  },
];
type SimpleProject = Omit<Project, "src" | "screenshots" | "content"> & { about: string };

/**
 * Product added before its screenshots: the card shows a "screenshots coming soon"
 * panel until `/assets/projects-screenshots/<id>/home.webp` exists, then picks it up.
 */
const simpleProject = (
  p: SimpleProject,
  image: string = "home.webp"
): Project => ({
  ...p,
  src: asset(p.id, image),
  screenshots: [image],
  get content() {
    return (
      <div>
        <TypographyP className="font-mono text-2xl text-center">{p.summary}</TypographyP>
        <ProjectsLinks live={p.live} repo={p.github} kaggle={p.kaggle} />
        <TypographyH3 className="my-4 mt-8">About</TypographyH3>
        <TypographyP className="font-mono">{p.about}</TypographyP>
      </div>
    );
  },
});

const S = PROJECT_SKILLS;

const RIZWAN_PRODUCTS: Project[] = [
  {
    id: "enveda-casmi",
    category: "Kaggle · active competition",
    title: "Enveda CASMI 2026 — Molecule ID",
    summary:
      "Identify small molecules from tandem mass spectra — ML baselines, fingerprints, and ranked retrieval on Kaggle.",
    src: asset("enveda-casmi", "home.svg"),
    screenshots: ["home.svg"],
    live: "#",
    kaggle:
      "https://www.kaggle.com/competitions/enveda-CASMI26-molecule-id-mass-spectra",
    skills: {
      frontend: [S.python],
      backend: [S.python, S.kaggle, S.colab],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Active Kaggle competition (CASMI 2026): molecule identification from
            tandem mass spectrometry using cheminformatics and deep learning
            baselines.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} kaggle={this.kaggle} />
          <TypographyH3 className="my-4 mt-8">Problem &amp; approach</TypographyH3>
          <Bullets
            items={[
              "Build ranked-retrieval pipelines over mass spectra with fingerprint channels and validation sweeps.",
              "Experiment in Kaggle notebooks and Google Colab GPUs (T4) for training and inference loops.",
              "Apply ML/DL coursework (CNNs, embeddings, evaluation) to real-world cheminformatics data.",
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Status</TypographyH3>
          <Bullets
            items={[
              "Competition live on Kaggle — iterative submissions and leaderboard tracking.",
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "seecard",
    category: "Mobile app",
    title: "SeeCard",
    summary:
      "Digital business cards with live profile edits, QR sharing, catalogs, and phonebook sync.",
    src: asset("seecard", "home.png"),
    screenshots: ["home.png"],
    live: "https://play.google.com/store/apps/details?id=com.seecard",
    skills: {
      frontend: [S.reactNative, S.ts, S.react],
      backend: [S.node, S.express],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Cross-platform digital business cards — instant exchange, QR sharing,
            and attachable product catalogs.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Connectivity</TypographyH3>
          <Bullets
            items={[
              "Profile cards with phone, email, and address actions plus one-tap save to contacts.",
              "Downloadable QR codes and shareable profile links for networking at events.",
              "Catalog attachments so every card can showcase products without a separate site.",
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Mobile delivery</TypographyH3>
          <Bullets
            items={[
              "React Native app on Google Play and App Store with fast setup and live profile editing.",
              "Shipped with SeeBiz mobile squad — REST APIs, validation, and release pipelines.",
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "seetask",
    category: "Mobile app",
    title: "SeeTask",
    summary:
      "Team workspaces for tasks, assignments, notifications, and on-the-go project tracking.",
    src: asset("seetask", "home.png"),
    screenshots: ["home.png"],
    live: "https://play.google.com/store/apps/details?id=com.seetask",
    skills: {
      frontend: [S.reactNative, S.ts],
      backend: [S.node, S.sockerio, S.mongo],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Task and team management for mobile-first teams — create, assign, and
            track work with low-latency updates.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Task flows</TypographyH3>
          <Bullets
            items={[
              "Task boards with priority, assignees, due dates, and status from open to done.",
              "Structured task forms and team creation so managers onboard groups in minutes.",
              "Notifications and activity views so owners see progress without desktop admin tools.",
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Platform</TypographyH3>
          <Bullets
            items={[
              "Multi-tenant React Native client backed by Node APIs and real-time channels.",
              "Published on Play Store and App Store for distributed field and operations teams.",
            ]}
          />
        </div>
      );
    },
  },
  simpleProject({
    id: "krub",
    category: "B2B / AI",
    title: "Krub.ai",
    summary: "B2B community and AI-assisted platform for business networking and discovery.",
    about:
      "Mobile app connecting businesses with AI-assisted discovery and community features.",
    live: "https://play.google.com/store/apps/details?id=com.b2bcommunity",
    skills: { frontend: [S.reactNative, S.ts], backend: [S.node, S.mongo] },
  }),
  simpleProject({
    id: "hivetalk",
    category: "Web platform",
    title: "HiveTalk",
    summary: "Real-time team messaging — workspaces, channels, and Socket.IO on AWS.",
    about:
      "Next.js + Express monorepo with live messaging; demo deployed on AWS.",
    live: "http://16.178.144.77:3000",
    github: "https://github.com/muhammadrizwaneng/HiveTalk",
    skills: {
      frontend: [S.next, S.ts],
      backend: [S.express, S.sockerio, S.postgres],
    },
  }),
  simpleProject({
    id: "zeroads",
    category: "Web + Android",
    title: "ZeroAds Downloader",
    summary: "Ad-free YouTube and social downloader — APK site and API on Vercel.",
    about: "Public Android APK distribution with a Next.js frontend and download API.",
    live: "https://zeroad-downloader.vercel.app",
    github: "https://github.com/muhammadrizwaneng/zeroad_downloader",
    skills: { frontend: [S.next], backend: [S.node] },
  }),
  {
    id: "pakezy",
    category: "Travel",
    title: "PAKEZY Tourism",
    summary:
      "Pakistan travel platform — destinations, packages, tours, and maps on web plus mobile.",
    src: asset("pakezy", "home.png"),
    screenshots: ["home.png"],
    live: "https://pakezy.vercel.app",
    github: "https://github.com/muhammadrizwaneng/PAKToursimWeb",
    skills: {
      frontend: [S.next, S.reactNative, S.tailwind],
      backend: [S.python, S.mongo],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            End-to-end tourism product for Pakistan — discovery on the web,
            booking flows, and a React Native companion app.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Discovery</TypographyH3>
          <Bullets
            items={[
              "Browse destinations, attractions, and tour packages with search and category filters.",
              "Exclusive offers and packaged trips (e.g. Hunza, Skardu) with pricing on web and mobile.",
              "Maps and location-aware content for travelers planning domestic trips.",
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Stack &amp; delivery</TypographyH3>
          <Bullets
            items={[
              "Next.js marketing site on Vercel; FastAPI/MongoDB APIs; React Native Play Store app.",
              "Open-source web repo on GitHub for itineraries, destinations, and UI iterations.",
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "utility-hub",
    category: "Mobile utilities",
    title: "Utility Hub",
    summary:
      "Offline-first toolbox: image-to-PDF, QR tools, text utilities, and password generator.",
    src: asset("utility-hub", "home.png"),
    screenshots: ["home.png"],
    live: "https://play.google.com/store/apps/details?id=com.utilityhub.app",
    github: "https://github.com/muhammadrizwaneng/UtilityApp",
    skills: { frontend: [S.reactNative, S.ts], backend: [S.node] },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            All-in-one utility app — document conversion, QR, text transforms, and
            security tools that run on-device.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Utilities</TypographyH3>
          <Bullets
            items={[
              "Image-to-PDF and compression with native file-system bridges for offline use.",
              "QR generator/scanner, unit and currency helpers, and rich text transformation tools.",
              "Password generator with strength meter and configurable character sets.",
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Open source</TypographyH3>
          <Bullets
            items={[
              "React Native app published on Google Play; source available on GitHub for review.",
            ]}
          />
        </div>
      );
    },
  },
  simpleProject({
    id: "irgems-rag",
    category: "AI / RAG",
    title: "IRGEMS RAG Assistant",
    summary: "Product RAG assistant — LangChain, ChromaDB, Streamlit, and Ollama.",
    about: "Ingest docs, retrieve with embeddings, and answer in a Streamlit UI.",
    live: "#",
    github: "https://github.com/muhammadrizwaneng/irgems-rag-assistant",
    skills: { frontend: [S.react], backend: [S.python, S.ollama] },
  }),
  {
    id: "coding-model",
    category: "ML · Kaggle / Colab",
    title: "rizwan-code-model",
    summary:
      "QLoRA fine-tune on Qwen2.5-Coder — ~400 curated pairs; trained on Kaggle T4 GPUs.",
    src: asset("coding-model", "home.svg"),
    screenshots: ["home.svg"],
    live: "#",
    github: "https://github.com/muhammadrizwaneng/coding-model",
    skills: {
      frontend: [S.react],
      backend: [S.python, S.kaggle, S.colab, S.ollama],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Custom coding adapter for FastAPI, React Native, and Node.js —
            fine-tuned with QLoRA on curated instruction data.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Training</TypographyH3>
          <Bullets
            items={[
              "Trained on Kaggle T4 notebooks within a 4-hour GPU budget — no noisy public tutorial dumps.",
              "Google Colab–friendly workflow for experimentation and smaller adapter sweeps.",
              "Pairs cover debugging, API design, and mobile patterns from real delivery work.",
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Open source</TypographyH3>
          <Bullets
            items={[
              "Training scripts, dataset notes, and local FastAPI chat harness on GitHub.",
            ]}
          />
        </div>
      );
    },
  },
  simpleProject({
    id: "apexbid",
    category: "Web",
    title: "ApexBid",
    summary: "Next.js auction marketplace for listings, bidding, and live flows.",
    about: "Open-source UI and auction flows in progress on GitHub.",
    live: "#",
    github: "https://github.com/muhammadrizwaneng/apexbid",
    skills: { frontend: [S.next, S.ts], backend: [S.node] },
  }),
];

projects.push(...RIZWAN_PRODUCTS);
export default projects;
