import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { opacity } from "../../anim";

interface IndexProps {
  /** Path with a `{theme}` placeholder, filled with "light" or "dark". */
  src: string;
  title: string;
  isActive: boolean;
}

// Page preview shown beside the menu while a link is hovered.
const Index: React.FC<IndexProps> = ({ src, title, isActive }) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
      aria-hidden
    >
      <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-background shadow-[0_40px_80px_-40px_rgba(15,23,42,0.5)] dark:border-white/10 dark:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-1.5 border-b border-slate-900/10 px-4 py-2.5 dark:border-white/10">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {title}
          </span>
        </div>
        <Image
          src={src.replace("{theme}", theme)}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 42vw, 0px"
          className="aspect-[16/10] h-auto w-full object-cover object-top"
          alt=""
        />
      </div>
    </motion.div>
  );
};

export default Index;
