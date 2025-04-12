import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let isOnline = false;

export const store = {
  getSnapshot: () => {
    isOnline = navigator.onLine;
    return isOnline;
  },
  subscribe: (callback: () => void) => {
    listeners.add(callback);

    const checkStatus = () => {
      const newStatus = navigator.onLine;
      if (newStatus !== isOnline) {
        isOnline = newStatus;
        store.emitChange();
      }
    };

    window.addEventListener("online", checkStatus);
    window.addEventListener("offline", checkStatus);

    return () => {
      listeners.delete(callback);
      window.removeEventListener("online", checkStatus);
      window.removeEventListener("offline", checkStatus);
    };
  },
  getServerSnapshot: () => {
    return false;
  },
  emitChange: () => {
    for (const callback of listeners) {
      callback();
    }
  },
};

export function useNetworkStatus() : boolean {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}


