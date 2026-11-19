"use client";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useRef,
  useCallback,
} from "react";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

import Loader from "./loader";
import { usePerfProfile } from "@ix/hooks/use-perf-profile";

type PreloaderContextType = {
  isLoading: boolean;
  loadingPercent: number;
  bypassLoading: () => void;
};
const INITIAL: PreloaderContextType = {
  isLoading: true,
  loadingPercent: 0,
  bypassLoading: () => {},
};
export const preloaderContext = createContext<PreloaderContextType>(INITIAL);

type PreloaderProps = {
  children: ReactNode;
  disabled?: boolean;
};

export const usePreloader = () => {
  const context = useContext(preloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};
const LOADING_TIME = 2.5;
// once the scene is ready, the rest of the countdown runs at this pace (whole run 0 → 100%)
const FINISH_FULL_SECONDS = 1.5;
// cap on one frame's step: after a long main-thread block (hydration, 3D init) the
// countdown resumes where it was instead of leaping to 100% and skipping numbers
const MAX_FRAME_SECONDS = 1 / 30;

function Preloader({ children, disabled = false }: PreloaderProps) {
  const pathname = usePathname();
  // Skip the loading splash for the résumé route (and anywhere it's disabled).
  const skip =
    disabled ||
    pathname?.startsWith("/attractive/resume") ||
    pathname?.startsWith("/resume");

  const [isLoading, setIsLoading] = useState(!skip);
  const [loadingPercent, setLoadingPercent] = useState(skip ? 100 : 0);
  // units of percent per second; raised once the scene is ready
  const rate = useRef(100 / LOADING_TIME);

  // The splash exists only to mask the Chibi 3D scene loading. On low-end /
  // reduced-motion devices that scene is never loaded, so its onLoad (which
  // normally dismisses the splash) never fires — bypass instead of leaving the
  // page stuck behind the loader.
  const { disable3D, ready: perfReady } = usePerfProfile();

  // Scene ready (or unavailable): finish the countdown quickly rather than cutting it off.
  const bypassLoading = useCallback(() => {
    rate.current = Math.max(rate.current, 100 / FINISH_FULL_SECONDS);
  }, []);

  useEffect(() => {
    if (perfReady && disable3D) bypassLoading();
  }, [perfReady, disable3D, bypassLoading]);

  useEffect(() => {
    if (skip) return;
    let frame = 0;
    let last = performance.now();
    let value = 0;
    const tick = (now: number) => {
      const dt = Math.min(MAX_FRAME_SECONDS, (now - last) / 1000);
      last = now;
      value = Math.min(100, value + dt * rate.current);
      setLoadingPercent(value);
      if (value >= 100) {
        setIsLoading(false);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [skip]);

  return (
    <preloaderContext.Provider
      value={{ isLoading, bypassLoading, loadingPercent }}
    >
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      {children}
    </preloaderContext.Provider>
  );
}

export default Preloader;
