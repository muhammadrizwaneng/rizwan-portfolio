"use client";

import { usePathname } from "next/navigation";
import Particles from "@ix/components/Particles";
import RemoteCursors from "@ix/components/realtime/remote-cursors";
import EasterEggs from "@ix/components/easter-eggs";
import ElasticCursor from "@ix/components/ui/ElasticCursor";
import RadialMenu from "@ix/components/radial-menu/index";
import MotionNudge from "@ix/components/motion-nudge";
import DomainNotice from "@ix/components/domain-notice";
import Analytics from "@ix/components/analytics";
import { usePerfProfile } from "@ix/hooks/use-perf-profile";

export default function AppOverlays() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // The résumé route disables the elastic cursor (keeps the particle bg).
  const isResume = pathname?.startsWith("/resume") ?? false;

  const { particleCount, maxDpr, disableDecorative } = usePerfProfile();

  return (
    <>
      {particleCount > 0 && (
        <Particles
          className="fixed inset-0 -z-10 animate-fade-in"
          quantity={particleCount}
          maxDpr={maxDpr}
        />
      )}
      {isHome && <RemoteCursors />}
      {!disableDecorative && <EasterEggs />}
      {!isResume && !disableDecorative && <ElasticCursor />}
      {isHome && <RadialMenu />}
      {isHome && <MotionNudge />}
      <DomainNotice />
      <Analytics />
    </>
  );
}
