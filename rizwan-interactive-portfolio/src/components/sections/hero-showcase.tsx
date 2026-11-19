import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import projects from "@/data/projects";
import { cn } from "@/lib/utils";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { BlurIn } from "../reveal-animations";

// opaque-ish glass so the 3D keyboard behind never bleeds through the text
const GLASS =
  "pointer-events-auto rounded-2xl border border-slate-900/10 bg-white/85 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#131518]/85 dark:shadow-black/40";

const FLOAT_SECONDS = 6;
const MAX_STACK_ITEMS = 4;
const HERO_STACK = [
  "Next.js",
  "Node.js",
  "Python",
  "React Native",
] as const;

interface FloatProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// slow idle bob; still under reduced motion
const Float = ({ children, delay = 0, className }: FloatProps) => {
  const { reducedMotion } = usePerfProfile();
  return (
    <motion.div
      className={className}
      animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
      transition={{
        duration: FLOAT_SECONDS,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Floating cards that frame the 3D keyboard in the hero's right column.
 * Kept to the column's corners so they never cover the keys people play with.
 */
const HeroShowcase = () => (
  // xl+ only: below 1280px the keyboard fills the column and the cards would cover it
  <div className="pointer-events-none relative col-span-1 hidden xl:block">
    <BlurIn delay={2.4} className="absolute right-[11%] top-[9%]">
      <Float>
        <CodeCard />
      </Float>
    </BlurIn>
    <BlurIn delay={2.7} className="absolute bottom-[7%] right-[12%]">
      <Float delay={FLOAT_SECONDS / 2}>
        <LatestWorkCard />
      </Float>
    </BlurIn>
  </div>
);

const stackNames = (): string[] => [...HERO_STACK].slice(0, MAX_STACK_ITEMS);

const CodeCard = () => {
  const names = stackNames();
  return (
    <div className={cn(GLASS, "w-[min(400px,36vw)] overflow-hidden")} aria-hidden>
      <div className="flex items-center gap-1.5 border-b border-slate-900/10 px-4 py-2.5 dark:border-white/10">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-neutral-500 dark:text-neutral-500">
          rizwan.ts
        </span>
      </div>
      <pre className="px-3 py-3 font-mono text-[11px] leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-[12px] sm:pl-4">
        <span className="text-violet-600 dark:text-violet-400">const</span>{" "}
        <span className="text-sky-600 dark:text-sky-400">rizwan</span> = {"{"}
        {"\n"}
        {"  "}stack: [
        {"\n"}
        {"    "}
        {names.slice(0, 2).map((name, i) => (
          <span key={name}>
            <span className="text-orange-600 dark:text-orange-400">
              &quot;{name}&quot;
            </span>
            {i < 1 ? ", " : ""}
          </span>
        ))}
        ,{"\n"}
        {"    "}
        {names.slice(2).map((name, i) => (
          <span key={name}>
            <span className="text-orange-600 dark:text-orange-400">
              &quot;{name}&quot;
            </span>
            {i < names.slice(2).length - 1 ? ", " : ""}
          </span>
        ))}
        {"\n"}
        {"  "}],
        {"\n"}
        {"  "}shipping:{" "}
        <span className="text-amber-600 dark:text-amber-400">true</span>,{"\n"}
        {"  "}coffee:{" "}
        <span className="text-amber-600 dark:text-amber-400">Infinity</span>,
        {"\n"}
        {"  "}mlLabs: [
        <span className="text-orange-600 dark:text-orange-400">
          &quot;Kaggle&quot;
        </span>
        ,{" "}
        <span className="text-orange-600 dark:text-orange-400">
          &quot;Google Colab&quot;
        </span>
        ],
        {"\n"}
        {"}"};
      </pre>
    </div>
  );
};

const LatestWorkCard = () => {
  const latest = projects[0];
  if (!latest) return null;

  return (
    <Link
      href="#projects"
      className={cn(
        GLASS,
        "group flex w-[300px] items-center gap-3 p-2.5 pr-4 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
      )}
    >
      {/* a tall full-page screenshot is unreadable at 56px, so show a monogram tile */}
      <span
        aria-hidden
        className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-300 to-orange-600 font-display text-2xl font-bold text-[#1a0c02] shadow-lg shadow-orange-500/20"
      >
        {latest.title.charAt(0)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
          Latest work
        </p>
        <p className="truncate font-display text-base font-bold text-neutral-900 dark:text-white">
          {latest.title}
        </p>
        <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
          {latest.category}
        </p>
      </div>
      <ArrowUpRight
        aria-hidden
        className="size-4 shrink-0 text-neutral-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-neutral-400"
      />
    </Link>
  );
};

export default HeroShowcase;
