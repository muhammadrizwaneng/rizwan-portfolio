"use client";

import { Suspense } from "react";
import SocketContextProvider from "@ix/contexts/socketio";
import Preloader from "./preloader";
import { Toaster } from "./ui/toaster";
import { TooltipProvider } from "./ui/tooltip";
import { GameContextProvider } from "@ix/contexts/game-context";
import MotionPreferences from "./motion-preferences";
import { ThemeProvider } from "./theme-provider";

/** Interactive providers for `/attractive` — Talha-style theme (default dark). */
export function AttractiveProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="ix-portfolio-theme"
        disableTransitionOnChange
      >
      <MotionPreferences>
        <Preloader>
          <SocketContextProvider>
            <GameContextProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </GameContextProvider>
            <Toaster />
          </SocketContextProvider>
        </Preloader>
      </MotionPreferences>
      </ThemeProvider>
    </Suspense>
  );
}