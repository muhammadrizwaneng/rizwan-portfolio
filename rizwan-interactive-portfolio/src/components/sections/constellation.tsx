"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { cn } from "@ix/lib/utils";
import { useMediaQuery } from "@ix/hooks/use-media-query";
import { usePerfProfile } from "@ix/hooks/use-perf-profile";
import SectionWrapper from "../ui/section-wrapper";

type Star = { name: string; core?: boolean };
type Constellation = { id: string; label: string; color: string; stars: Star[] };

// core = what I use day to day; drawn bigger and brighter
const CONSTELLATIONS: Constellation[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#fb923c",
    stars: [
      { name: "React", core: true }, { name: "Next.js", core: true }, { name: "TypeScript", core: true },
      { name: "JavaScript" }, { name: "Redux Toolkit" }, { name: "Tailwind CSS", core: true },
      { name: "HTML & CSS" }, { name: "Responsive UI" }, { name: "Motion & GSAP" }, { name: "Reusable Components" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    color: "#38bdf8",
    stars: [
      { name: "React Native", core: true }, { name: "Expo", core: true }, { name: "iOS & Android" },
      { name: "Push Notifications" }, { name: "Real-time Chat" }, { name: "Stripe Payments", core: true },
      { name: "Firebase" }, { name: "Store Releases" }, { name: "Tablet Layouts" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#a78bfa",
    stars: [
      { name: "Node.js", core: true }, { name: "Express", core: true }, { name: "REST APIs", core: true },
      { name: "FastAPI" }, { name: "Flask" }, { name: "Socket.IO", core: true }, { name: "JWT / SSO", core: true },
      { name: "MFA" }, { name: "Serverless" }, { name: "Webhooks" },
    ],
  },
  {
    id: "data",
    label: "Databases & Search",
    color: "#f472b6",
    stars: [
      { name: "MongoDB", core: true }, { name: "MySQL", core: true }, { name: "PostgreSQL" },
      { name: "Elasticsearch", core: true }, { name: "Caching" }, { name: "Data Modeling" },
      { name: "Query Optimization" }, { name: "ETL Workflows" },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    color: "#fbbf24",
    stars: [
      { name: "Machine Learning", core: true }, { name: "Deep Learning" }, { name: "LangChain" },
      { name: "RAG Pipelines", core: true }, { name: "Kaggle", core: true }, { name: "Google Colab", core: true },
      { name: "Fine-tuning (QLoRA)" }, { name: "LLM Integrations" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    color: "#22d3ee",
    stars: [
      { name: "AWS", core: true }, { name: "S3" }, { name: "Docker", core: true }, { name: "Nginx" },
      { name: "Linux" }, { name: "CI/CD" }, { name: "Vercel" }, { name: "Cloudflare" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Workflow",
    color: "#fb7185",
    stars: [
      { name: "Git", core: true }, { name: "GitHub" }, { name: "Postman" }, { name: "Jira" },
      { name: "Cursor", core: true }, { name: "Claude", core: true }, { name: "Vibe Coding", core: true },
      { name: "Agile / Scrum" },
    ],
  },
];

type Point = { x: number; y: number };

// tabs advance on their own while the section is on screen
const AUTOPLAY_MS = 5000;
// a click hands control to the visitor for this long before autoplay resumes
const MANUAL_PAUSE_MS = 15000;

// deterministic per-constellation randomness, so each map always looks the same
const seeded = (seed: string) => {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
};

/**
 * Stars on a jittered grid (so labels don't collide), linked by a minimum spanning
 * tree plus a couple of short extra links so it reads as a constellation, not a list.
 */
function layout(c: Constellation, narrow: boolean) {
  const rand = seeded(c.id + (narrow ? "n" : "w"));
  const n = c.stars.length;
  const cols = narrow ? 2 : Math.ceil(Math.sqrt(n * 1.6));
  const rows = Math.ceil(n / cols);
  // Fisher–Yates, not sort(() => rand() - 0.5): comparator-based shuffles depend on the
  // engine's sort algorithm, so server and browser placed the stars differently (hydration mismatch)
  const cells = Array.from({ length: cols * rows }, (_, i) => i);
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  cells.length = n;
  const round = (v: number) => Math.round(v * 100) / 100;
  const points: Point[] = cells.map((cell) => {
    const col = cell % cols;
    const row = Math.floor(cell / cols);
    // stagger alternate rows so the grid doesn't show
    const shift = row % 2 ? 0.25 : -0.15;
    return {
      x: round(10 + ((col + 0.5 + shift + (rand() - 0.5) * 0.45) / cols) * 80),
      y: round(12 + ((row + 0.5 + (rand() - 0.5) * 0.5) / rows) * 74),
    };
  });
  // aspect-correct distance (the panel is wider than tall on desktop)
  const ax = narrow ? 0.6 : 2;
  const dist = (a: Point, b: Point) => Math.hypot((a.x - b.x) * ax, a.y - b.y);
  const edges: [number, number][] = [];
  const inTree = new Set([0]);
  while (inTree.size < n) {
    let best: [number, number] | null = null;
    let bestD = Infinity;
    for (const i of inTree) for (let j = 0; j < n; j++) {
      if (inTree.has(j)) continue;
      const d = dist(points[i], points[j]);
      if (d < bestD) { bestD = d; best = [i, j]; }
    }
    if (!best) break;
    edges.push(best);
    inTree.add(best[1]);
  }
  const extra: [number, number, number][] = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    if (!edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) extra.push([i, j, dist(points[i], points[j])]);
  }
  extra.sort((a, b) => a[2] - b[2]).slice(0, 2).forEach(([i, j]) => edges.push([i, j]));
  return { points, edges };
}

const ConstellationSection = () => {
  const [activeId, setActiveId] = useState(CONSTELLATIONS[0].id);
  const [hovered, setHovered] = useState<number | null>(null);
  const narrow = !useMediaQuery("(min-width: 768px)");
  const { reducedMotion } = usePerfProfile();
  const active = CONSTELLATIONS.find((c) => c.id === activeId) ?? CONSTELLATIONS[0];
  const { points, edges } = useMemo(() => layout(active, narrow), [active, narrow]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const [paused, setPaused] = useState(false);
  const [manualUntil, setManualUntil] = useState(0);
  const autoplay = inView && !paused && !reducedMotion && hovered === null;

  useEffect(() => {
    if (!autoplay) return;
    const wait = Math.max(AUTOPLAY_MS, manualUntil - Date.now());
    const id = window.setTimeout(() => {
      setActiveId((current) => {
        const i = CONSTELLATIONS.findIndex((c) => c.id === current);
        return CONSTELLATIONS[(i + 1) % CONSTELLATIONS.length].id;
      });
    }, wait);
    return () => window.clearTimeout(id);
  }, [autoplay, activeId, manualUntil]);

  const lit = (i: number) => hovered === null || hovered === i || edges.some(([a, b]) => (a === hovered && b === i) || (b === hovered && a === i));

  return (
    <SectionWrapper id="constellation" className="flex flex-col items-center py-20">
      <div ref={sectionRef} className="mx-auto w-full max-w-6xl px-4 md:px-8 2xl:max-w-7xl">
        <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          My stack, charted as{" "}
          <span className="relative inline-block font-serif font-normal italic text-orange-500">
            stars
            <svg aria-hidden viewBox="0 0 120 12" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none">
              <path d="M2 8 Q 30 2 60 7 T 118 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          pick a constellation <span className="text-orange-500">↓</span>
        </p>

        <div role="tablist" aria-label="Skill groups" className="mt-8 flex flex-wrap gap-2">
          {CONSTELLATIONS.map((c) => {
            const on = c.id === activeId;
            return (
              <button
                key={c.id}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="constellation-panel"
                onClick={() => { setActiveId(c.id); setHovered(null); setManualUntil(Date.now() + MANUAL_PAUSE_MS); }}
                className={cn(
                  "relative overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                  on
                    ? "border-transparent text-[#1a0c02] shadow-lg"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
                style={on ? { background: c.color, boxShadow: `0 8px 24px -8px ${c.color}` } : undefined}
              >
                {c.label}
                {/* autoplay timer: fills until the next constellation takes over */}
                {on && autoplay && manualUntil <= Date.now() && (
                  <motion.span
                    key={activeId}
                    aria-hidden
                    className="absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-black/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          id="constellation-panel"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          role="tabpanel"
          aria-label={`${active.label} skills`}
          className="relative mt-6 aspect-[3/4] w-full overflow-hidden rounded-[28px] border border-slate-900/[0.07] bg-white shadow-[0_30px_60px_-35px_rgba(15,23,42,0.35)] dark:border-white/10 dark:card-surface sm:aspect-[16/9] md:aspect-[2/1]"
        >
          {/* tinted glow in the constellation's colour (own layer, so the card surface stays opaque) */}
          <div
            aria-hidden
            className="absolute inset-0 transition-[background] duration-700"
            style={{ background: `radial-gradient(70% 60% at 50% 45%, ${active.color}26, transparent 70%)` }}
          />
          {/* faint dust */}
          <div aria-hidden className="absolute inset-0 opacity-[0.25] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:28px_28px] text-neutral-400 dark:text-neutral-600" />

          <p className="absolute left-5 top-4 z-[2] font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-[11px]">
            Constellation <span style={{ color: active.color }}>·</span> {active.label}{" "}
            <span style={{ color: active.color }}>·</span> {active.stars.length} stars
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + (narrow ? "n" : "w")}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {edges.map(([a, b], i) => (
                  <motion.line
                    key={i}
                    x1={points[a].x} y1={points[a].y} x2={points[b].x} y2={points[b].y}
                    stroke={active.color}
                    strokeWidth={1.4}
                    strokeDasharray="5 6"
                    vectorEffect="non-scaling-stroke"
                    initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: hovered === null || hovered === a || hovered === b ? 0.75 : 0.15 }}
                    transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.25 + i * 0.05 }}
                  />
                ))}
              </svg>

              {active.stars.map((star, i) => (
                <motion.button
                  key={star.name}
                  type="button"
                  className="group absolute z-[1] flex flex-col items-center gap-1 focus-visible:outline-none"
                  // centre the diamond (top 20px row) on the star's point; motion owns the
                  // transform (for scale), so the offset goes through x/y, not Tailwind translate
                  style={{ left: `${points[i].x}%`, top: `${points[i].y}%`, x: "-50%", y: -10 }}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.4 }}
                  animate={{ opacity: lit(i) ? 1 : 0.35, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: reducedMotion ? 0 : i * 0.05 }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                >
                  <span className="flex h-5 items-center justify-center">
                  <span
                    className={cn(
                      "block rotate-45 rounded-[3px] border-2 border-white/80 transition-transform duration-300 group-hover:scale-125",
                      star.core ? "size-4 md:size-[18px]" : "size-2.5 md:size-3 opacity-80",
                    )}
                    style={{
                      background: active.color,
                      boxShadow: star.core ? `0 0 16px 3px ${active.color}, 0 0 4px ${active.color}` : `0 0 8px ${active.color}`,
                    }}
                  />
                  </span>
                  <span className="whitespace-nowrap rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-800 backdrop-blur dark:border-white/10 dark:bg-black/60 dark:text-neutral-100 md:text-sm">
                    {star.name}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          <span aria-hidden className="absolute bottom-4 right-5 text-xl text-amber-300 motion-safe:animate-pulse">✦</span>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ConstellationSection;
