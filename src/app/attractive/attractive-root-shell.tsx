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