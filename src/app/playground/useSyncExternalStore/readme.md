When to Use useSyncExternalStore?

    You have external mutable state (like WebSocket data, browser APIs like navigator, language, network, layout, localStorage, anything under windows object etc.) that you need to sync with React components.

    You want to avoid passing state down through many layers of components, especially when state changes in places other than React’s built-in useState or useReducer.

    You need to ensure consistency with React's Concurrent Mode to prevent bugs with state updates.

Reason Why it matters
🧵 Concurrency-safe Prevents tearing by syncing snapshot before rendering
🔄 Automatic updates Ensures your component re-renders only when the external store changes
⚡ Efficient subscription Avoids unnecessary renders — only updates on relevant external changes
🖥️ SSR support You can provide a server-side fallback snapshot
🤝 Works with external stores Like Redux, Zustand, or even custom event systems (e.g., window.resize)
