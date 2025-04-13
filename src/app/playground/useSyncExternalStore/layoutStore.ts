import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let innerWidth: number | null = null;

export const store = {
  getSnapshot: () => {
    if (window.innerWidth !== innerWidth) {
      innerWidth = window.innerWidth;
    }
    return innerWidth;
  },
  subscribe: (callback: () => void) => {
    listeners.add(callback);
    const onResize = () => {
      innerWidth = window.innerWidth;
      store.emitChange();
    };

    window.addEventListener("resize", onResize);
    return () => {
      listeners.delete(callback);
      window.removeEventListener("resize", onResize);
    };
  },
  getServerSnapshot: () => {
    return null;
  },
  emitChange: () => {
    for (const callback of listeners) {
      callback();
    }
  },
};

export function useLayout() {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}
