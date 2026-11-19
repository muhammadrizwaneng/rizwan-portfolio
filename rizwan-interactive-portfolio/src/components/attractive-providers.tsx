"use client";

import { Suspense } from "react";
import SocketContextProvider from "@ix/contexts/socketio";
import Preloader from "./preloader";
import { Toaster } from "./ui/toaster";
import { TooltipProvider } from "./ui/tooltip";
import { GameContextProvider } from "@ix/contexts/game-context";
import MotionPreferences from "./motion-preferences";

/** Interactive portfolio providers scoped under `/attractive` (no `next-themes` on `<html>`). */
export function AttractiveProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}