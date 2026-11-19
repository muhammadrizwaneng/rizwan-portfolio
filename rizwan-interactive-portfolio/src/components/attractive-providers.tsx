"use client";

import { Suspense } from "react";
import SocketContextProvider from "@ix/contexts/socketio";
import Preloader from "./preloader";
import { Toaster } from "./ui/toaster";
import { TooltipProvider } from "./ui/tooltip";
import { GameContextProvider } from "@ix/contexts/game-context";
import MotionPreferences from "./motion-preferences";
import { ThemeProvider } from "./theme-provider";

/** Talha-style theme (default dark) — Provider sabse bahar, taake shell `useTheme` use kar sake. */
export function AttractiveProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="ix-portfolio-theme"
      disableTransitionOnChange
    >
      <Suspense fallback={null}>
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
      </Suspense>
    </ThemeProvider>
  );
}