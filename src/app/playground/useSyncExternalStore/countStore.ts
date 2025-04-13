import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let count = 0;

export const store = {
  getSnapshot: () => count,
  subscribe: (callback: () => void) => {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  },
  emitChange: () => {
    for (const callback of listeners) {
      callback();
    }
  },
  increment: () => {
    count++;
    store.emitChange();
  },
  decrement: () => {
    count--;
    store.emitChange();
  },
  getServerSnapshot: () => {
    return count;
  },
};

// not the best example for using useSyncExternalStore because the purpose of this react hook is for 
export function useCountStore (){
const count = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return {
    count,
    increment: store.increment,
    decrement: store.decrement,
  }
}
