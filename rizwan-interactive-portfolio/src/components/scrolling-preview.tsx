"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePerfProfile } from "@ix/hooks/use-perf-profile";

// Pan speed (CSS px/sec). Higher value = faster scroll.
const PAN_SPEED = 120;

// A page only pans if it overflows the frame by at least this fraction of the
// frame height. Anything shorter (landscape/square screenshots) is shown
// "cover" instead, so any image looks right with no per-image config.
const MIN_SCROLL_OVERFLOW = 0.2;

// Short (non-panning) screenshots slowly zoom toward the top on hover instead,
// so every card has some hover motion.
const HOVER_ZOOM_SCALE = 1.15;
const HOVER_ZOOM_SECONDS = 4;

// Neutral wallpaper when a card has no `bg` (or it fails to load), so adding a
// project with just a screenshot still looks intentional.
const FALLBACK_BG = "linear-gradient(135deg, #1e293b, #0f172a)";

/**
 * Card preview: a screenshot floating over a wallpaper. Tall landing pages pan
 * on hover and smoothly return to top on mouse leave; normal (landscape/square)
 * screenshots are shown "cover", centered.
 */
const ScrollingPreview = ({
  src,
  alt,
  bg,
  isHovered = false,
}: {
  src: string;
  alt: string;
  bg?: string;
  isHovered?: boolean;
}) => {
  const { reducedMotion: reduceMotion } = usePerfProfile();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollPx, setScrollPx] = useState(0);
  const [bgReady, setBgReady] = useState(false);
  // screenshot not uploaded yet (404): show a "coming soon" panel instead of a blank frame
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    const compute = () => {
      const vp = viewportRef.current;
      if (cancelled || !vp || !img.naturalWidth) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      const displayedHeight = vp.clientWidth * ratio; // height at bg-size "100% auto"
      const overflow = displayedHeight - vp.clientHeight;
      // Only pages meaningfully taller than the frame pan; the rest go "cover".
      setScrollPx(overflow > vp.clientHeight * MIN_SCROLL_OVERFLOW ? overflow : 0);
    };
    setMissing(false);
    img.onload = compute;
    img.onerror = () => !cancelled && setMissing(true);
    img.src = src;
    if (img.complete) compute();
    window.addEventListener("resize", compute);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", compute);
    };
  }, [src]);

  // Preload the wallpaper so a missing/404 file falls back to the gradient
  // instead of rendering a broken background.
  useEffect(() => {
    if (!bg) {
      setBgReady(false);
      return;
    }
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => !cancelled && setBgReady(true);
    img.onerror = () => !cancelled && setBgReady(false);
    img.src = bg;
    return () => {
      cancelled = true;
    };
  }, [bg]);

  const scrolls = scrollPx > 0;
  const animate = !reduceMotion && scrolls;
  const zoom = !reduceMotion && !scrolls && !missing;

  const pan = scrollPx / PAN_SPEED;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      role="img"
      aria-label={alt}
    >
      {/* wallpaper background (falls back to a gradient when `bg` is absent) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#0f172a",
          backgroundImage: bgReady && bg ? `url("${bg}")` : FALLBACK_BG,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {missing && (
        <div className="absolute inset-x-[var(--sp-inset,22px)] bottom-0 top-[var(--sp-inset,20px)] z-[1] flex flex-col items-center justify-center gap-1 sm:gap-2 rounded-[10px] px-1 border border-white/15 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(249,115,22,0.25),transparent_60%),linear-gradient(160deg,#1c1c1d,#0e0e0f)] text-center">
          <span className="font-display text-sm font-bold tracking-tight text-white sm:text-3xl md:text-4xl">{alt}</span>
          <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-orange-300 sm:text-[11px] sm:tracking-[0.25em]">
            Screenshots coming soon
          </span>
        </div>
      )}

      {/* floating screenshot panel */}
      <div
        ref={viewportRef}
        className="sp-shot"
        style={{
          position: "absolute",
          left: "var(--sp-inset, 22px)",
          right: "var(--sp-inset, 22px)",
          top: "var(--sp-inset, 20px)",
          bottom: 0,
          overflow: "hidden",
          borderRadius: 10,
          boxShadow:
            "0 24px 50px -12px rgba(8,20,55,0.55), 0 8px 18px -8px rgba(8,20,55,0.45)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${src}")`,
            // Tall pages fill width and pan; normal images cover the frame.
            backgroundSize: scrolls ? "100% auto" : "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: scrolls ? "50% 0%" : "center",
            transformOrigin: "50% 0%",
          }}
          animate={
            animate
              ? {
                  backgroundPosition: isHovered ? "50% 100%" : "50% 0%",
                }
              : zoom
                ? { scale: isHovered ? HOVER_ZOOM_SCALE : 1 }
                : { backgroundPosition: scrolls ? "50% 0%" : "center" }
          }
          transition={
            zoom
              ? {
                  duration: isHovered ? HOVER_ZOOM_SECONDS : 0.6,
                  ease: isHovered ? "easeOut" : [0.25, 1, 0.5, 1],
                }
              : animate
              ? {
                  duration: isHovered
                    ? pan
                    : Math.min(Math.max(pan * 0.35, 0.4), 0.75),
                  ease: isHovered ? "linear" : [0.25, 1, 0.5, 1],
                }
              : { duration: 0 }
          }
        />
      </div>
    </div>
  );
};

export default ScrollingPreview;
