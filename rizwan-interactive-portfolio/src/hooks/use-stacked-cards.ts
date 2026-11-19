"use client";

import { useEffect, useRef } from "react";

// every card sticks at the same line; each later one peeks a little lower
export const STICKY_TOP_PX = 96;
export const STACK_PEEK_PX = 18;
// at full cover a buried card is 8% smaller and 55% darker
const MAX_SHRINK = 0.08;
const MAX_DIM = 0.55;
// below this width cards just flow (no sticky stack)
const STACK_MIN_WIDTH_PX = 640;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Shrinks + dims each card by how far the next card has slid over it.
 * Writes styles straight to the DOM in one rAF so scrolling never re-renders React.
 */
export function useStackedCards(count: number) {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const cards = cardRefs.current.slice(0, count);
      const stacked = window.innerWidth > STACK_MIN_WIDTH_PX;

      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!card) return;
        if (!next || !stacked) {
          card.style.transform = "";
          card.style.filter = "";
          return;
        }
        const rect = card.getBoundingClientRect();
        const covered = clamp01(
          1 - (next.getBoundingClientRect().top - rect.top) / rect.height
        );
        card.style.transform = `scale(${1 - MAX_SHRINK * covered})`;
        card.style.filter = `brightness(${1 - MAX_DIM * covered})`;
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [count]);

  return cardRefs;
}
