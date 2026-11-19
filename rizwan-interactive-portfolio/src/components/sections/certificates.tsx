import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Bot,
  Boxes,
  Brain,
  Cloud,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { CERTIFICATES, type Certificate } from "@ix/data/certificates";
import { useMediaQuery } from "@ix/hooks/use-media-query";
import { cn } from "@ix/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const DESKTOP_QUERY = "(min-width: 768px)";
// wide enough to read comfortably, narrow enough that the next card peeks in
const CARD_WIDTH = "w-[min(720px,82vw)] 2xl:w-[min(940px,62vw)]";

interface BadgeTheme {
  from: string;
  to: string;
  glow: string;
  icon: LucideIcon;
}

// each discipline gets its own badge colour + glyph so the cards don't read as copies
const CATEGORY_THEMES: Record<string, BadgeTheme> = {
  "Data Engineering": { from: "#fb923c", to: "#c2410c", glow: "rgba(251,146,60,0.35)", icon: Workflow },
  "Data Science": { from: "#fbbf24", to: "#ea580c", glow: "rgba(251,191,36,0.3)", icon: Brain },
  Cloud: { from: "#38bdf8", to: "#6366f1", glow: "rgba(56,189,248,0.32)", icon: Cloud },
  "Cloud Native": { from: "#22d3ee", to: "#0e7490", glow: "rgba(34,211,238,0.3)", icon: Boxes },
  Security: { from: "#fb7185", to: "#e11d48", glow: "rgba(251,113,133,0.3)", icon: ShieldCheck },
  "IoT & AI": { from: "#a78bfa", to: "#7c3aed", glow: "rgba(167,139,250,0.32)", icon: Bot },
};
const FALLBACK_THEME: BadgeTheme = { from: "#fb923c", to: "#c2410c", glow: "rgba(251,146,60,0.35)", icon: Award };

const themeFor = (category: string): BadgeTheme =>
  CATEGORY_THEMES[category] ?? FALLBACK_THEME;

const pad = (n: number) => String(n).padStart(2, "0");

const ISSUERS = Array.from(new Set(CERTIFICATES.map((c) => c.issuer))).join(" · ");

/**
 * Horizontal track that moves as the page scrolls vertically.
 * The pin wrapper is made exactly as tall as the horizontal travel, so one
 * pixel scrolled down = one pixel the cards move sideways.
 */
function useHorizontalTrack(enabled: boolean) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!enabled || !track) {
      setDistance(0);
      return;
    }
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled]);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (value) => -value * distance);

  return { pinRef, trackRef, distance, x, progress: scrollYProgress };
}

const CertificatesSection = () => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const { pinRef, trackRef, distance, x, progress } =
    useHorizontalTrack(isDesktop);

  const header = (
    <SectionHeader
      id="certificates"
      title="Certificates"
      desc="Verified credentials."
      className="static mb-10 md:mb-12 mt-0"
    />
  );

  return (
    <SectionWrapper
      id="certificates"
      // Full-viewport height keeps the 3D keyboard from switching to its
      // "projects" pose (triggered at 70% viewport) while this is on screen.
      className="flex flex-col items-center justify-start min-h-screen py-20"
    >
      {/* The pin wrapper renders on every screen size: useScroll needs its target in the
          DOM at hydration, and isDesktop is still false on that first render. If the
          target only appeared later, the scroll progress never attached and the
          certificate track stayed stuck on the first cards. */}
      <div
        ref={pinRef}
        className="relative w-full"
        // desktop: as tall as the sideways travel, so its child sticks for that whole stretch
        style={isDesktop ? { height: `calc(100vh + ${distance}px)` } : undefined}
      >
        {isDesktop ? (
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            {header}
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex w-max items-stretch gap-8 px-[max(2rem,calc((100vw-1100px)/2))] 2xl:gap-10 2xl:px-[max(2rem,calc((100vw-1400px)/2))] will-change-transform"
            >
              <IntroPanel />
              {CERTIFICATES.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  index={index}
                  className={cn(CARD_WIDTH, "shrink-0")}
                />
              ))}
            </motion.div>
            <TrackProgress progress={progress} />
          </div>
        ) : (
          // phones: compact two-up grid, no scroll hijacking
          <div className="w-full px-4">
            {header}
            <div className="grid grid-cols-2 gap-3">
              {CERTIFICATES.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

const IntroPanel = () => (
  <div className="flex w-[300px] 2xl:w-[360px] shrink-0 flex-col justify-between rounded-[28px] bg-white/95 p-8 2xl:p-10 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur-xl dark:bg-[#131518]/95 dark:ring-white/10">
    <div>
      <span className="font-display text-8xl 2xl:text-9xl font-bold leading-none tracking-tight text-foreground">
        {pad(CERTIFICATES.length)}
      </span>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400">
        Credentials earned
      </p>
    </div>
    <p className="text-[15px] 2xl:text-base leading-relaxed text-muted-foreground">
      Issued by <span className="font-semibold text-foreground">{ISSUERS}</span>,
      each one matches training and credentials listed on my résumé.
    </p>
    <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/70">
      Keep scrolling
      <ArrowRight aria-hidden className="size-4 motion-safe:animate-pulse" />
    </span>
  </div>
);

const TrackProgress = ({ progress }: { progress: MotionValue<number> }) => {
  const [active, setActive] = useState(0);
  const last = CERTIFICATES.length - 1;
  useMotionValueEvent(progress, "change", (value) =>
    setActive(Math.min(last, Math.max(0, Math.round(value * last))))
  );

  return (
    <div className="mx-auto mt-10 flex items-center gap-4 font-mono text-xs text-foreground/70">
      <span className="tabular-nums">{pad(active + 1)}</span>
      <div className="h-[3px] w-48 overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          style={{ scaleX: progress }}
          className="h-full origin-left rounded-full bg-orange-500"
        />
      </div>
      <span className="tabular-nums">{pad(CERTIFICATES.length)}</span>
    </div>
  );
};

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
  className?: string;
}

// the whole card is the link, so there is one clear target per credential
const CertificateCard = ({ certificate, index, className }: CertificateCardProps) => {
  const theme = themeFor(certificate.category);

  return (
    <a
      href={certificate.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${certificate.title}, issued by ${certificate.issuer}. View verification (opens in a new tab)`}
      className={cn(
        "group/card relative grid grid-cols-1 sm:grid-cols-[250px_1fr] max-md:!grid-cols-1 2xl:grid-cols-[330px_1fr] overflow-hidden rounded-[28px] max-md:rounded-[20px] border border-slate-900/[0.07] bg-white text-neutral-700 shadow-[0_30px_60px_-35px_rgba(15,23,42,0.35)] transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-slate-900/20 dark:border-white/10 dark:card-surface dark:text-neutral-200 dark:shadow-[0_40px_70px_-40px_rgba(0,0,0,0.9)] dark:hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
        className
      )}
    >
      <BadgePanel certificate={certificate} theme={theme} />
      <CertificateBody certificate={certificate} index={index} theme={theme} />
    </a>
  );
};

interface BadgePanelProps {
  certificate: Certificate;
  theme: BadgeTheme;
}

const BadgePanel = ({ certificate, theme }: BadgePanelProps) => {
  const Icon = theme.icon;
  const gradientId = `cert-badge-${certificate.id}`;

  return (
    <div
      className="relative flex min-h-[250px] max-md:min-h-[130px] 2xl:min-h-[360px] items-center justify-center overflow-hidden border-b border-slate-900/[0.07] bg-slate-50 sm:border-b-0 sm:border-r max-md:!border-b max-md:!border-r-0 dark:border-white/10 dark:bg-[#0f1113]"
      style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.glow} 0%, transparent 62%)` }}
    >
      {/* dot texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(15,23,42,0.6)_1px,transparent_1px)] [background-size:16px_16px] dark:opacity-[0.15] dark:[background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)]"
      />
      {/* slow orbit ring */}
      <span
        aria-hidden
        className="absolute size-52 max-md:size-28 2xl:size-72 rounded-full border border-dashed border-slate-900/15 dark:border-white/15 motion-safe:animate-[spin_24s_linear_infinite]"
      />

      <span className="absolute left-4 top-4 max-md:left-2 max-md:top-2 max-md:px-1.5 max-md:py-0.5 max-md:text-[8px] max-md:tracking-[0.1em] flex items-center gap-1.5 rounded-full border border-orange-600/20 bg-white/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-orange-700 dark:border-white/15 dark:bg-white/5 dark:text-orange-300">
        <BadgeCheck aria-hidden className="size-3.5" />
        Verified
      </span>

      <div className="relative w-36 max-md:w-[4.5rem] 2xl:w-48 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-rotate-6 group-hover/card:scale-110">
        <svg
          aria-hidden
          viewBox="0 0 200 228"
          className="w-full drop-shadow-[0_20px_24px_rgba(15,23,42,0.25)] dark:drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)]"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={theme.from} />
              <stop offset="1" stopColor={theme.to} />
            </linearGradient>
          </defs>
          <polygon points="100,4 196,58 196,170 100,224 4,170 4,58" fill={`url(#${gradientId})`} />
          <polygon
            points="100,20 182,66 182,162 100,208 18,162 18,66"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-white">
          <Icon aria-hidden className="size-9 max-md:size-4" strokeWidth={1.75} />
          <span className="font-display text-xl max-md:text-[10px] font-bold tracking-wider">{certificate.issuer}</span>
          <span className="max-md:hidden font-mono text-[9px] uppercase tracking-[0.3em] text-white/80">Certified</span>
        </div>
      </div>
    </div>
  );
};

interface CertificateBodyProps {
  certificate: Certificate;
  index: number;
  theme: BadgeTheme;
}

const CertificateBody = ({ certificate, index, theme }: CertificateBodyProps) => (
  <div className="relative flex flex-col gap-3 max-md:gap-1.5 p-6 max-md:p-3 md:p-8 2xl:gap-4 2xl:p-11">
    <div
      className="flex items-center justify-between gap-2 font-mono text-[11px] max-md:text-[8px] uppercase tracking-[0.25em] max-md:tracking-[0.12em]"
      style={{ "--accent": theme.from, "--accent-ink": theme.to } as React.CSSProperties}
    >
      {/* deeper `to` stop on white, bright `from` stop on graphite */}
      <span className="truncate text-[var(--accent-ink)] dark:text-[var(--accent)]">{certificate.category}</span>
      <span className="max-md:hidden text-neutral-500">
        {pad(index + 1)} / {pad(CERTIFICATES.length)}
      </span>
    </div>

    <h3 className="text-2xl max-md:text-sm max-md:leading-snug max-md:line-clamp-3 md:text-3xl 2xl:text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-white">
      {certificate.title}
    </h3>
    <p className="text-sm max-md:text-[10px] text-neutral-500 dark:text-neutral-400">
      <span className="font-serif text-lg max-md:text-xs italic text-neutral-700 dark:text-neutral-200">Issued by {certificate.issuer}</span>
      {certificate.verifyVia ? ` · via ${certificate.verifyVia}` : null}
    </p>

    <ul aria-label="Topics" className="mt-1 flex flex-wrap gap-2 max-md:hidden">
      {certificate.topics.map((topic) => (
        <li
          key={topic}
          className="rounded-full border border-slate-900/10 bg-slate-50 px-3 py-1 font-mono text-xs 2xl:px-3.5 2xl:py-1.5 2xl:text-[13px] text-neutral-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300"
        >
          {topic}
        </li>
      ))}
    </ul>

    <span className="mt-auto flex items-center justify-between gap-3 border-t border-slate-900/10 pt-5 max-md:pt-2 text-sm max-md:text-[11px] 2xl:text-base font-semibold text-neutral-900 dark:border-white/10 dark:text-white">
      Verify credential
      <span
        aria-hidden
        className="flex size-10 max-md:size-7 2xl:size-12 items-center justify-center rounded-full border border-slate-900/15 transition-all duration-500 dark:border-white/15 group-hover/card:rotate-45 group-hover/card:border-transparent group-hover/card:bg-orange-400 group-hover/card:text-[#1a0c02]"
      >
        <ArrowUpRight className="size-4" />
      </span>
    </span>
  </div>
);

export default CertificatesSection;
