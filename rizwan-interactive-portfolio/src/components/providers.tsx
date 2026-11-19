import SocketContextProvider from "@ix/contexts/socketio";
import Preloader from "./preloader";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";

import { TooltipProvider } from "./ui/tooltip";

import { GameContextProvider } from "@ix/contexts/game-context";
import MotionPreferences from "./motion-preferences";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    disableTransitionOnChange
  >
    <MotionPreferences>
      <Preloader>
        <SocketContextProvider>
          <GameContextProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </GameContextProvider>
          <Toaster />
        </SocketContextProvider>
      </Preloader>
    </MotionPreferences>
  </ThemeProvider>;
};
