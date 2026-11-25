"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useLenis } from "@ix/lib/lenis";
import { usePerfProfile } from "@ix/hooks/use-perf-profile";
import { cn } from "@ix/lib/utils";

const STATIONS = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Tech Stack" },
  { id: "constellation", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Training" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

// track geometry (px): the line zig-zags between two lanes, straight through each station
const WIDTH = 56;
const LANES = [16, 40];
const STRAIGHT = 16;
const TRAIN_HEIGHT = 64;

type Point = { x: number; y: number };

// stations sit evenly down the track, inset from its ends
const INSET = 14;
const stationY = (i: number, count: number, height: number) =>
  INSET + (count > 1 ? i / (count - 1) : 0) * (height - INSET * 2);

/** Zig-zag polyline: a short straight run through every station, diagonals between. */
function buildTrack(count: number, height: number) {
  const stations = Array.from({ length: count }, (_, i) => ({
    x: LANES[(i + 1) % 2],
    y: stationY(i, count, height),
  }));
  const points: Point[] = [{ x: stations[0]?.x ?? LANES[0], y: 0 }];
  for (const s of stations) {
    const last = points[points.length - 1];
    if (s.y - STRAIGHT > last.y) points.push({ x: s.x, y: s.y - STRAIGHT });
    points.push({ x: s.x, y: Math.min(height, s.y + STRAIGHT) });
  }
  points.push({ x: points[points.length - 1].x, y: height });
  return { stations, points };
}

/** Point on the (monotonic in y) track at height y, plus its heading. */
function locate(points: Point[], y: number) {
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (y <= b.y || i === points.length - 1) {
      const t = b.y === a.y ? 0 : Math.min(1, Math.max(0, (y - a.y) / (b.y - a.y)));
      return { x: a.x + (b.x - a.x) * t, y, angle: Math.atan2(b.x - a.x, b.y - a.y) };
    }
  }
  return { x: points[0]?.x ?? 0, y, angle: 0 };
}

/**
 * Scroll-progress train on the right edge, riding a glowing zig-zag track from Home
 * to Contact. The travelled part of the track lights up; stations are diamonds that
 * jump to their section. It puffs smoke while moving and turns round on the way up.
 */
export default function ScrollTrain() {
  const lenis = useLenis();
  const { reducedMotion } = usePerfProfile();
  const navRef = useRef<HTMLElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const velocity = useVelocity(scrollY);
  const speed = useTransform(velocity, (v) => Math.min(1, Math.abs(v) / 900));
  const [height, setHeight] = useState(0);
  const [stops, setStops] = useState<number[]>([]);
  const [here, setHere] = useState(0);
  const goingUp = useRef(false);

  const trainX = useMotionValue(0);
  const trainY = useMotionValue(0);
  const heading = useMotionValue(0);
  const rotate = useSpring(heading, { stiffness: 260, damping: 26 });
  const filled = useMotionValue(0);

  const track = height && stops.length ? buildTrack(stops.length, height) : null;
  const stopsRef = useRef<number[]>([]);
  stopsRef.current = stops;
  /** Scroll progress to track height: piecewise between stations, which are evenly spaced. */
  const heightAt = (p: number) => {
    const s = stopsRef.current;
    const n = s.length;
    if (!n) return p * height;
    if (p <= s[0]) return stationY(0, n, height) * (s[0] > 0 ? p / s[0] : 1);
    for (let i = 1; i < n; i++) {
      if (p <= s[i]) {
        const t = s[i] > s[i - 1] ? (p - s[i - 1]) / (s[i] - s[i - 1]) : 1;
        return stationY(i - 1, n, height) + t * (stationY(i, n, height) - stationY(i - 1, n, height));
      }
    }
    const last = stationY(n - 1, n, height);
    return last + (s[n - 1] < 1 ? (p - s[n - 1]) / (1 - s[n - 1]) : 1) * (height - last);
  };
  const pointsRef = useRef<Point[]>([]);
  pointsRef.current = track?.points ?? [];

  const place = (p: number) => {
    if (!height || !pointsRef.current.length) return;
    const { x, y, angle } = locate(pointsRef.current, heightAt(p));
    trainX.set(x);
    trainY.set(y);
    filled.set(y);
    // the train art points down (+y); turn it to the track heading, and round when going up
    heading.set((-angle * 180) / Math.PI + (goingUp.current ? 180 : 0));
  };

  useMotionValueEvent(progress, "change", place);
  useMotionValueEvent(velocity, "change", (v) => {
    if (Math.abs(v) > 40 && goingUp.current !== v < 0) {
      goingUp.current = v < 0;
      place(progress.get());
    }
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    let index = 0;
    stops.forEach((stop, i) => { if (p >= stop - 0.01) index = i; });
    setHere(index);
  });

  // re-place once the track exists or changes size
  useEffect(() => { place(progress.get()); });

  // track height, and station positions as a fraction of the scrollable height
  useEffect(() => {
    const measure = () => {
      if (navRef.current) setHeight(navRef.current.clientHeight);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setStops(STATIONS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        let y = 0;
        for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
        return Math.min(1, Math.max(0, y / max));
      }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const d = track ? `M ${track.points.map((p) => `${p.x} ${p.y}`).join(" L ")}` : "";

  return (
    <nav
      ref={navRef}
      aria-label="Page sections"
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-[72vh] -translate-y-1/2 lg:block"
      style={{ width: WIDTH }}
    >
      {track && (
        <svg aria-hidden width={WIDTH} height={height} className="absolute inset-0 overflow-visible">
          <defs>
            <linearGradient id="train-track" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#fdba74" />
              <stop offset="0.5" stopColor="#f97316" />
              <stop offset="1" stopColor="#fb7185" />
            </linearGradient>
            <filter id="train-glow" x="-100%" y="-10%" width="300%" height="120%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <clipPath id="train-travelled">
              <motion.rect x={-WIDTH} y={0} width={WIDTH * 3} height={filled} />
            </clipPath>
          </defs>
          {/* track ahead: faint dashes */}
          <path d={d} fill="none" strokeWidth={2} strokeDasharray="5 6" strokeLinejoin="round"
            className="stroke-neutral-400/50 dark:stroke-neutral-500/50" />
          {/* travelled track: glowing gradient */}
          <g clipPath="url(#train-travelled)">
            <path d={d} fill="none" stroke="url(#train-track)" strokeWidth={6} strokeOpacity={0.5}
              strokeLinejoin="round" filter="url(#train-glow)" />
            <path d={d} fill="none" stroke="url(#train-track)" strokeWidth={2.5} strokeLinejoin="round" />
          </g>
        </svg>
      )}

      {/* stations */}
      {track?.stations.map((s, i) => (
        <button
          key={STATIONS[i].id}
          type="button"
          onClick={() => go(STATIONS[i].id)}
          aria-label={`Go to ${STATIONS[i].label}`}
          aria-current={here === i ? "true" : undefined}
          className="group pointer-events-auto absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: s.x, top: s.y }}
        >
          <span
            className={cn(
              "size-3 rotate-45 rounded-[2px] border-2 transition-all duration-300",
              here >= i
                ? "border-orange-300 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)]"
                : "border-neutral-400 bg-background dark:border-neutral-500",
            )}
          />
          <span className="pointer-events-none absolute right-8 whitespace-nowrap rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            {STATIONS[i].label}
          </span>
        </button>
      ))}

      {/* the train, centred on its point of the track */}
      {track && (
        <motion.div
          aria-hidden
          className="absolute left-0 top-0 w-6"
          style={{ x: trainX, y: trainY, height: TRAIN_HEIGHT, translateX: "-50%", translateY: "-50%", rotate }}
        >
          <motion.div
            className="relative h-full w-full"
            animate={reducedMotion ? undefined : { x: [0, -0.5, 0.5, 0] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          >
            <Train />
            {/* smoke from the chimney (y=62 of 76) drifting back over the wagons, only while moving */}
            {!reducedMotion && (
              <motion.div className="absolute left-1/2 top-[80%] -translate-x-1/2" style={{ opacity: speed }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute size-2.5 rounded-full bg-neutral-300/80 dark:bg-neutral-400/60 animate-[train-puff_1.2s_ease-out_infinite]"
                    style={{ animationDelay: `${i * 0.4}s`, left: -5 }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
}

/** Top-down train heading down the track: two wagons, then the locomotive. */
const Train = () => (
  <svg viewBox="0 0 24 76" className="h-full w-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]">
    {[0, 22].map((y) => (
      <g key={y}>
        <rect x="3" y={y + 1} width="18" height="18" rx="3" className="fill-neutral-600 dark:fill-neutral-500" />
        <rect x="6" y={y + 4} width="12" height="12" rx="1.5" className="fill-amber-300" opacity="0.9" />
        <rect x="11" y={y + 19} width="2" height="4" className="fill-neutral-500" />
      </g>
    ))}
    <path d="M3 45 h18 v18 q0 10 -9 12 q-9 -2 -9 -12 z" className="fill-orange-500" />
    <rect x="6" y="47" width="12" height="7" rx="1.5" className="fill-neutral-900/70" />
    <circle cx="12" cy="62" r="3" className="fill-neutral-800" />
    <circle cx="12" cy="71" r="1.5" className="fill-yellow-200" />
  </svg>
);
