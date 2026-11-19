import { EDUCATION, EXPERIENCE, Experience, SKILLS, type Education } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion, useScroll, useSpring, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { GraduationCap, MapPin } from "lucide-react";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { useCurrentYear } from "@/hooks/use-current-year";
import {
  CAREER_START_YEAR as CAREER_START,
  CURRENT_ROLE,
  isCurrentRole as isCurrent,
  roleStartYear as startYear,
  shortCompany,
} from "@/lib/career";

const currentCompany = CURRENT_ROLE?.company;

// line fills while the timeline crosses the middle of the viewport
const PROGRESS_OFFSET: ["start center", "end center"] = [
  "start center",
  "end center",
];

// opaque surfaces so the fixed 3D keyboard behind the page never shows through copy
const LIGHT_SURFACE =
  "rounded-3xl bg-white/95 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur-xl dark:bg-[#131518]/95 dark:ring-white/10";

// light: clean white card that matches the year tiles; dark: neutral graphite
const CARD_SURFACE =
  "rounded-[26px] border border-slate-900/[0.07] bg-white text-neutral-700 shadow-[0_30px_60px_-35px_rgba(15,23,42,0.35)] dark:border-white/10 dark:card-surface dark:text-neutral-200 dark:shadow-[0_40px_70px_-40px_rgba(0,0,0,0.9)]";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ExperienceSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: PROGRESS_OFFSET,
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <SectionWrapper
      id="experience"
      className="flex flex-col items-center justify-center min-h-[120vh] py-20"
    >
      <div className="w-full max-w-6xl 2xl:max-w-7xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="experience"
          title="Experience"
          desc="My professional journey."
          className="mb-10 md:mb-14 mt-0"
        />

        <StatsStrip />

        <div
          ref={timelineRef}
          className="relative mt-14 md:mt-20 flex flex-col gap-10 md:gap-16"
        >
          <SnakeSpine containerRef={timelineRef} progress={progress} />
          {EXPERIENCE.map((exp, index) => (
            <ExperienceRow key={exp.id} experience={exp} index={index} />
          ))}
          {/* where it started: education closes the timeline */}
          {EDUCATION.map((edu) => (
            <EducationRow key={edu.institution} education={edu} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const StatsStrip = () => {
  const currentYear = useCurrentYear();
  const stats = [
    // placeholder keeps the tile height stable until the client knows the year
    {
      value: currentYear ? `${currentYear - CAREER_START}+` : "—",
      label: "Years shipping",
    },
    {
      value: String(new Set(EXPERIENCE.map((e) => e.company)).size),
      label: "Companies",
    },
    {
      value: currentCompany ? shortCompany(currentCompany) : "Open",
      label: "Currently at",
    },
  ];

  return (
    <dl
      className={cn(
        LIGHT_SURFACE,
        "grid grid-cols-3 divide-x divide-neutral-900/10 dark:divide-white/10",
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1 px-2 py-5 md:py-7 text-center"
        >
          <dd className="font-display text-xl sm:text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {stat.value}
          </dd>
          <dt className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
};

interface ExperienceRowProps {
  experience: Experience;
  index: number;
}

const ExperienceRow = ({ experience, index }: ExperienceRowProps) => {
  const { reducedMotion } = usePerfProfile();
  const current = isCurrent(experience);
  const reveal = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[200px_120px_1fr] pl-8 md:pl-0">
      {/* sticky year tile (desktop) */}
      <motion.div
        {...reveal}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="hidden md:block"
      >
        <YearTile experience={experience} index={index} current={current} />
      </motion.div>

      <TimelineDot active={current} />

      <motion.div
        {...reveal}
        transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT_EXPO }}
      >
        <ExperienceCard
          experience={experience}
          index={index}
          current={current}
        />
      </motion.div>
    </div>
  );
};

const EducationRow = ({ education }: { education: Education }) => {
  const { reducedMotion } = usePerfProfile();
  const reveal = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[200px_120px_1fr] pl-8 md:pl-0">
      <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE_OUT_EXPO }} className="hidden md:block">
        <div className={cn(LIGHT_SURFACE, "sticky top-32 flex flex-col gap-2 p-5")}>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Education
          </span>
          <span className="font-display text-5xl font-bold leading-none tracking-tight text-foreground">
            {education.start.match(/\d{4}/)?.[0]}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            → {education.end}
          </span>
        </div>
      </motion.div>

      <TimelineDot active={false} />

      <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT_EXPO }}>
        <article className={cn(CARD_SURFACE, "relative overflow-hidden p-6 max-md:p-4 md:p-10")}>
          <GraduationCap
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 size-40 text-neutral-900/[0.04] dark:text-white/[0.04] md:size-56"
            strokeWidth={1.25}
          />
          <header className="relative flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-neutral-900/[0.05] font-display text-sm font-bold text-neutral-800 ring-1 ring-neutral-900/10 dark:bg-white/10 dark:text-white dark:ring-white/15">
              {education.logo}
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="font-serif text-2xl italic text-orange-600 dark:text-orange-300">
                {education.institution}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                <MapPin aria-hidden className="size-3.5 shrink-0" />
                {education.location}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 md:hidden">
                {education.start} — {education.end}
              </span>
            </div>
          </header>
          <h3 className="relative mt-6 text-2xl font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-white md:text-4xl">
            {education.degree}
          </h3>
          <p className="relative mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
            {education.field} · where it all started.
          </p>
        </article>
      </motion.div>
    </div>
  );
};

// phones show the first two highlights and fold the rest behind "+ N more"
const MOBILE_HIGHLIGHTS = 2;
const Highlights = ({ points }: { points: string[] }) => {
  const [expanded, setExpanded] = useState(false);
  const hidden = points.length - MOBILE_HIGHLIGHTS;
  return (
    <div className="relative mt-7 max-md:mt-4 border-t border-slate-900/10 pt-7 max-md:pt-4 dark:border-white/10">
      <ul className="space-y-3 max-md:space-y-2">
        {points.map((point, i) => (
          <li
            key={point}
            className={cn(
              "flex gap-3 max-md:gap-2 text-[15px] max-md:text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-300",
              !expanded && i >= MOBILE_HIGHLIGHTS && "max-md:hidden",
            )}
          >
            <span
              aria-hidden
              className="mt-[9px] max-md:mt-[8px] h-px w-4 max-md:w-3 shrink-0 bg-orange-500 dark:bg-orange-400 transition-all duration-300 group-hover/exp:w-6"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-orange-600 dark:text-orange-400 md:hidden"
        >
          {expanded ? "Show less" : `+ ${hidden} more`}
        </button>
      )}
    </div>
  );
};

const formatPeriods = (exp: Experience) =>
  exp.periods.map((p) => `${p.start} — ${p.end}`).join(" · ");

interface YearTileProps {
  experience: Experience;
  index: number;
  current: boolean;
}

const YearTile = ({ experience, index, current }: YearTileProps) => (
  <div className={cn(LIGHT_SURFACE, "sticky top-32 flex flex-col gap-2 p-5")}>
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
      {String(index + 1).padStart(2, "0")} /{" "}
      {String(EXPERIENCE.length).padStart(2, "0")}
    </span>
    <span className="font-display text-5xl font-bold leading-none tracking-tight text-foreground">
      {startYear(experience)}
    </span>
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-[0.2em]",
        current
          ? "text-orange-600 dark:text-orange-400"
          : "text-muted-foreground",
      )}
    >
      {current
        ? "→ Present"
        : `→ ${experience.periods[experience.periods.length - 1].end}`}
    </span>
  </div>
);

// spine x: left edge on mobile, centre of the 120px column between year tile and card on desktop
const SPINE_X_MOBILE = 7.5;
const SPINE_X_DESKTOP = 260;
// how far the desktop snake swings left/right between dots (stays inside the 120px column)
const SNAKE_SWING = 48;

/**
 * Timeline spine that snakes left and right between the dots, crossing the centre at
 * every dot. Drawn as an SVG path measured from the rendered dots; the orange stroke
 * fills along the path with scroll progress. Straight on mobile, where it hugs the edge.
 */
const SnakeSpine = ({
  containerRef,
  progress,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [path, setPath] = useState("");
  const [height, setHeight] = useState(0);

  // useEffect, not useLayoutEffect: a child's layout effect runs before the parent's ref
  // is attached, so the container was still null on the first pass (phones never re-ran it)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const x = isDesktop ? SPINE_X_DESKTOP : SPINE_X_MOBILE;
      const swing = isDesktop ? SNAKE_SWING : 0;
      // offsets, not client rects: the section scales while it fades in
      const ys = [...container.querySelectorAll<HTMLElement>("[data-timeline-dot]")].map((dot) => {
        let y = dot.offsetHeight / 2;
        for (let el: HTMLElement | null = dot; el && el !== container; el = el.offsetParent as HTMLElement | null) y += el.offsetTop;
        return y;
      });
      const points = [0, ...ys, container.offsetHeight];
      let d = `M ${x} 0`;
      for (let i = 1; i < points.length; i++) {
        const y0 = points[i - 1];
        const y1 = points[i];
        const h = y1 - y0;
        // alternate the bulge so the line weaves left, right, left...
        const bulge = (i % 2 ? -1 : 1) * swing;
        d += ` C ${x + bulge} ${y0 + h / 3}, ${x + bulge} ${y1 - h / 3}, ${x} ${y1}`;
      }
      setPath(d);
      setHeight(container.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, isDesktop]);

  if (!path) return null;
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <defs>
        {/* user-space units: on phones the path is a straight vertical line with a
            zero-width bounding box, and bbox-relative paint/filters don't render on that */}
        <linearGradient id="snake-fill" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fdba74" />
          <stop offset="0.5" stopColor="#f97316" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
        <filter id="snake-glow" x={-200} y={-20} width={1000} height={height + 40} filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <path d={path} fill="none" stroke="hsl(var(--border))" strokeWidth={1.5} />
      {/* glow under the live stroke */}
      <motion.path d={path} fill="none" stroke="#f97316" strokeOpacity={0.6} strokeWidth={4}
        filter="url(#snake-glow)" style={{ pathLength: progress }} />
      <motion.path d={path} fill="none" stroke="url(#snake-fill)" strokeWidth={3}
        strokeLinecap="round" style={{ pathLength: progress }} />
    </svg>
  );
};

const TimelineDot = ({ active }: { active: boolean }) => (
  // must stay positioned (not `static`) at every size: it's the containing block for
  // the absolute ping below, which otherwise grows to the whole row and overflows the page
  <span
    aria-hidden
    data-timeline-dot
    className="absolute z-10 left-0 md:relative md:left-auto md:top-auto md:mx-auto top-10 md:mt-10 flex size-[15px] items-center justify-center"
  >
    {active && (
      <span className="absolute inset-0 rounded-full bg-orange-500/40 motion-safe:animate-ping" />
    )}
    <span
      className={cn(
        "relative size-[11px] rounded-full ring-4",
        active
          ? "bg-orange-400 ring-orange-500/30"
          : "bg-orange-600/80 ring-orange-500/15",
      )}
    />
  </span>
);

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  current: boolean;
}

const ExperienceCard = ({
  experience,
  index,
  current,
}: ExperienceCardProps) => (
  // current role gets a gradient hairline border to pull the eye first
  <div
    className={cn(
      "group/exp rounded-[27px] p-px transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
      current
        ? "bg-gradient-to-br from-orange-400/70 via-neutral-500/10 to-neutral-500/30 shadow-[0_0_60px_-28px_rgba(249,115,22,0.45)]"
        : "bg-slate-900/[0.04] dark:bg-white/5",
    )}
  >
    <article
      className={cn(CARD_SURFACE, "relative overflow-hidden p-6 max-md:p-4 md:p-10")}
    >
      {/* ambient glow, brightens on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-orange-400/15 dark:bg-orange-500/10 blur-3xl transition-opacity duration-500 opacity-60 group-hover/exp:opacity-100"
      />
      {/* oversized ghost index */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 -top-6 md:right-8 md:-top-10 select-none font-display text-[110px] max-md:text-[72px] max-md:-top-3 md:text-[180px] font-bold leading-none text-neutral-900/[0.04] dark:text-white/[0.04]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <header className="relative flex flex-col items-start gap-4 max-md:gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4 max-md:gap-3">
          <div
            className={cn(
              "flex size-14 max-md:size-11 shrink-0 items-center justify-center rounded-2xl max-md:rounded-xl font-display text-base max-md:text-sm font-bold shadow-lg",
              current
                ? "bg-gradient-to-br from-orange-300 to-orange-600 text-[#1a0c02]"
                : "bg-slate-900/[0.05] text-neutral-800 ring-1 ring-slate-900/10 dark:bg-white/10 dark:text-white dark:ring-white/15",
            )}
          >
            {experience.logo}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="font-serif italic text-2xl max-md:text-xl text-orange-600 dark:text-orange-300">
              {experience.company}
            </span>
            <span className="flex items-center gap-1.5 text-sm max-md:text-xs text-neutral-500 dark:text-neutral-400">
              <MapPin aria-hidden className="size-3.5 shrink-0" />
              {[experience.location.split(",")[0], experience.employment, experience.workplace]
                .filter(Boolean)
                .join(" · ")}
            </span>
            <span className="font-mono text-[11px] max-md:text-[10px] uppercase tracking-[0.2em] max-md:tracking-[0.15em] text-neutral-500 dark:text-neutral-400 md:hidden">
              {formatPeriods(experience)}
            </span>
          </div>
        </div>
        {current && (
          <span className="flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-orange-700 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-orange-400 motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-orange-400" />
            </span>
            Current role
          </span>
        )}
      </header>

      <h3 className="relative mt-6 max-md:mt-4 text-2xl max-md:text-xl md:text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-white">
        {experience.title}
      </h3>
      <p className="relative mt-3 max-md:mt-2 max-w-2xl text-base max-md:text-sm md:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
        {experience.summary}
      </p>

      <Highlights points={experience.description} />

      <ul
        aria-label="Tech stack"
        className="relative mt-7 max-md:mt-4 flex flex-wrap gap-2 max-md:gap-1.5"
      >
        {experience.skills.map((skillName) => {
          const skill = SKILLS[skillName];
          return (
            <li
              key={skillName}
              className="flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-50 py-1 pl-1.5 pr-3 text-xs text-neutral-700 transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-orange-400/40 dark:hover:bg-orange-400/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skill.icon}
                alt=""
                width={18}
                height={18}
                loading="lazy"
                className="size-[18px] rounded-full bg-white p-0.5 object-contain ring-1 ring-slate-900/10 dark:bg-white/90 dark:ring-0"
              />
              {skill.label}
            </li>
          );
        })}
      </ul>
    </article>
  </div>
);

export default ExperienceSection;
