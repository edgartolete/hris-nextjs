import { useSyncExternalStore } from "react";

const listener = new Set<() => void>();

export const store = {
  getSnapshot: () => {
    return navigator.language;
  },
  subscribe: (callback: () => void) => {
    listener.add(callback);

    const checkStatus = () => {
      // this will check the browser language. 
      // you can change on chrome://settings/languages, or 
      // Firefox:  preferences -> General -> Language and Appearance -> Language
      const newStatus = navigator.language;
      if (newStatus !== navigator.language) {
        store.emitChange();
      }
    };

    window.addEventListener("languagechange", checkStatus);

    return () => {
      listener.delete(callback);
      window.removeEventListener("languagechange", checkStatus);
    };
  },
  emitChange: () => {
    for (const callback of listener) {
      callback();
    }
  },
  getServerSnapshot: () => {
    return "en-US";
  },
}

export function useLanguage() {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}
