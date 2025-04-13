const STORAGE_KEY = "count";
const listeners = new Set<() => void>();
let count = 0;

export const localStorageStore = {
  getSnapshot: () => {
    const storedValue = localStorage.getItem("count");
    if (storedValue) {
      count = parseInt(storedValue, 10);
    }
    return count;
  },
  subscribe: (callback: () => void) => {
    listeners.add(callback);
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        const newValue = Number(event.newValue);
        if (!isNaN(newValue) && newValue !== count) {
          count = newValue;
          localStorageStore.emitChange();
        }
      }
    };

    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(callback);
      window.removeEventListener('storage', onStorage);
    };
  },
  getServerSnapshot: () => {
    return null
  },
  emitChange: () => {
    for (const callback of listeners) {
      callback();
    }
  },
  setCount: (newCount: number) => {
    count = newCount;
    localStorage.setItem("count", count.toString());
    localStorageStore.emitChange();
  },
  increment: () => {
    localStorageStore.setCount(count + 1);
  },
  decrement: () => {
    localStorageStore.setCount(count - 1);
  },
};
