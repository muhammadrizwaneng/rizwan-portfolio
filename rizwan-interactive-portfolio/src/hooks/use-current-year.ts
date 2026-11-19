"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Current calendar year, read only on the client.
 * Next forbids `new Date()` during prerender, so the server snapshot is null;
 * callers render a placeholder until the client value arrives.
 */
export function useCurrentYear(): number | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => null
  );
}
