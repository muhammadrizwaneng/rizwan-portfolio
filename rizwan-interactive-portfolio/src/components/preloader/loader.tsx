"use client";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { slideUp } from "./anim";
import { usePreloader } from ".";
import { config } from "@ix/data/config";

// launch-style countdown: 3 → 2 → 1 → GO as loading runs 0 → 100%
const COUNT = ["3", "2", "1", "GO"];
const STATUS = ["Booting keyboard", "Loading tech stack", "Shipping pixels", "Ready"];
const SEGMENTS = 4;

export default function Index() {
  const { loadingPercent } = usePreloader();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const percent = Math.min(100, Math.max(0, loadingPercent));
  const stage = percent >= 99 ? 3 : Math.min(2, Math.floor(percent / (100 / 3)));

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height
    } Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height
    }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height
    } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-[1] flex flex-col items-center gap-6 px-6 text-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground sm:text-xs">
              {config.author.split(" ").slice(-2).join(" ")}
              <span className="text-orange-500"> · </span>
              Portfolio &apos;{String(new Date().getFullYear()).slice(-2)}
            </p>

            {/* countdown: each number punches in, the previous one blurs away */}
            <div className="relative grid h-[7rem] w-[12rem] place-items-center sm:h-[9rem]">
              <span
                aria-hidden
                className="absolute size-40 rounded-full bg-orange-500/20 blur-3xl"
              />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={COUNT[stage]}
                  initial={{ opacity: 0, scale: 1.6, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    "relative font-display font-bold leading-none tracking-tight tabular-nums " +
                    (stage === 3
                      ? "text-7xl text-orange-500 sm:text-8xl"
                      : "text-8xl text-foreground sm:text-9xl")
                  }
                >
                  {COUNT[stage]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* segmented progress: each bar fills its quarter */}
            <div className="flex gap-2" aria-hidden>
              {Array.from({ length: SEGMENTS }, (_, i) => {
                const fill = Math.min(1, Math.max(0, percent / (100 / SEGMENTS) - i));
                return (
                  <span key={i} className="h-1 w-8 overflow-hidden rounded-full bg-foreground/15 sm:w-10">
                    <span
                      className="block h-full origin-left rounded-full bg-gradient-to-r from-orange-400 to-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                      style={{ transform: `scaleX(${fill})` }}
                    />
                  </span>
                );
              })}
            </div>

            <p
              role="status"
              className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground sm:text-[11px]"
            >
              {STATUS[stage]} <span className="text-orange-500">·</span>{" "}
              <span className="tabular-nums text-foreground">{Math.floor(percent)}%</span>
            </p>
          </motion.div>
          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
