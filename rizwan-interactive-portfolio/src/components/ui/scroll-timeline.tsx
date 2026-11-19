import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@ix/lib/utils";

// Fill runs from when the list top hits 75% of the viewport until its bottom
// reaches the middle, so the line "draws" as the items scroll past.
const PROGRESS_OFFSET: ["start 75%", "end 50%"] = ["start 75%", "end 50%"];

type ScrollTimelineProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Vertical timeline with a rail on the left that fills as you scroll.
 * Children should be `<TimelineItem>`s. The list is positioned, so its
 * content paints over a sticky `SectionHeader` as it scrolls past.
 */
export const ScrollTimeline = ({ children, className }: ScrollTimelineProps) => {
  const listRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: PROGRESS_OFFSET });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={listRef} className={cn("relative flex flex-col pl-12 md:pl-16", className)}>
      <span
        aria-hidden
        className="absolute left-5 md:left-7 top-2 bottom-2 w-px -translate-x-1/2 bg-border"
      />
      <motion.span
        aria-hidden
        style={{ scaleY: prefersReducedMotion ? 1 : progress }}
        className="absolute left-5 md:left-7 top-2 bottom-2 w-0.5 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-orange-400 via-cyan-400 to-sky-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]"
      />
      {children}
    </ol>
  );
};

type TimelineItemProps = {
  icon: LucideIcon;
  children: ReactNode;
};

export const TimelineItem = ({ icon: Icon, children }: TimelineItemProps) => (
  <li className="relative">
    <span
      aria-hidden
      className={cn(
        // 40px node centred on the rail: rail sits at 20px (md: 28px) from the list edge
        "absolute top-7 -left-12 md:-left-16 flex size-10 md:translate-x-2 items-center justify-center",
        "rounded-full border-2 border-cyan-400/80 bg-background text-cyan-400",
        "shadow-[0_0_14px_rgba(34,211,238,0.45)]"
      )}
    >
      <Icon className="size-4" />
    </span>
    {children}
  </li>
);
