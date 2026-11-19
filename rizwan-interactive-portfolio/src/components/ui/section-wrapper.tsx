"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@ix/lib/utils";
import { usePerfProfile } from "@ix/hooks/use-perf-profile";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const SectionWrapper = ({ id, className, children, ...props }: SectionWrapperProps) => {
  const { reducedMotion } = usePerfProfile();
  const containerRef = useRef<HTMLElement>(null);
  // Fade in while the top edge travels the lower 40% of the viewport, fade out while the
  // bottom edge travels the upper 40%. Tied to the viewport rather than the section's
  // own height: a fraction of a very tall section (e.g. the pinned certificate track)
  // left its content half-transparent for thousands of pixels.
  const { scrollYProgress: enter } = useScroll({
    target: containerRef,
    offset: ["start end", "start 60%"],
  });
  const { scrollYProgress: exit } = useScroll({
    target: containerRef,
    offset: ["end 40%", "end start"],
  });
  const visible = useTransform([enter, exit], ([e, x]: number[]) => Math.min(e, 1 - x));

  const opacity = visible;
  const scale = useTransform(visible, [0, 1], [0.8, 1]);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn("relative", className)}
      {...props}
    >
      <motion.div
        style={{ opacity: reducedMotion ? 1 : opacity, scale: reducedMotion ? 1 : scale }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
