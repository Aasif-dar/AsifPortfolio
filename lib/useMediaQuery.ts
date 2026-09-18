"use client";

import { useSyncExternalStore } from "react";

function getServerSnapshot() {
  return false;
}

/**
 * Reads a media query via useSyncExternalStore so the server snapshot (false)
 * and the client's first hydration pass always agree — a plain
 * `useState(() => matchMedia(...).matches)` would mismatch for e.g. users
 * with prefers-reduced-motion set, since window isn't available during SSR.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    getServerSnapshot
  );
}
