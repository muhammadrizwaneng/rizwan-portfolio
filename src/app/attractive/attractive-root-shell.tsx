"use client";

import { cn } from "@ix/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  fontClassName: string;
};

/** Talha jaisa: `dark` class + fonts isi wrapper par (classic `/` par Outfit leak na ho). */
export function AttractiveRootShell({ children, fontClassName }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme !== "light";

  // Keep `html.dark` in sync so Tailwind `dark:` utilities match Talha (class on html).
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    return () => {
      root.classList.remove("dark");
    };
  }, [isDark]);

  return (
    <div
      className={cn(
        "attractive-root",
        fontClassName,
        isDark && "dark",
        "font-sans min-h-screen w-full max-w-[100vw] overflow-x-clip bg-background text-foreground antialiased",
      )}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}