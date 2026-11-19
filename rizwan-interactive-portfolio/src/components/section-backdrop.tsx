"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Page-wide background wash that changes colour per section. Each section owns a
 * layer of two soft glows; the layer for the section crossing the middle of the
 * viewport fades in while the rest fade out. Sits behind the particles (-z-10).
 */
const SECTIONS: { id: string; colors: [string, string] }[] = [
  { id: "hero", colors: ["249 115 22", "245 158 11"] }, // orange + amber
  { id: "skills", colors: ["99 102 241", "56 189 248"] }, // indigo + sky
  { id: "constellation", colors: ["139 92 246", "249 115 22"] }, // violet + orange
  { id: "experience", colors: ["244 63 94", "249 115 22"] }, // rose + orange
  { id: "certificates", colors: ["139 92 246", "236 72 153"] }, // violet + pink
  { id: "projects", colors: ["14 165 233", "99 102 241"] }, // sky + indigo
  { id: "github", colors: ["113 113 122", "249 115 22"] }, // zinc + orange
  { id: "contact", colors: ["245 158 11", "244 63 94"] }, // amber + rose
];

const wash = ([a, b]: [string, string]) =>
  [
    `radial-gradient(60% 55% at 12% 18%, rgb(${a} / var(--wash-alpha)) 0%, transparent 70%)`,
    `radial-gradient(55% 50% at 88% 85%, rgb(${b} / var(--wash-alpha)) 0%, transparent 70%)`,
  ].join(", ");

export default function SectionBackdrop() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let current = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= middle) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 bg-slate-100 [--wash-alpha:0.22] dark:bg-black dark:[--wash-alpha:0.28]"
    >
      {SECTIONS.map(({ id, colors }) => (
        <div
          key={id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none",
            active === id ? "opacity-100" : "opacity-0",
          )}
          style={{ backgroundImage: wash(colors) }}
        />
      ))}
    </div>
  );
}
