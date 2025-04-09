You can setup the Provider at the very top level.
any component that uses the useTestContext will rerender whenever the one of the state changed in the context. therefore make sure context is very specific.

When to Use React Context:

    Global application state that needs to be accessed by many components (e.g., current theme, user authentication state).

    Avoiding prop drilling: When data needs to be accessed at many levels deep in your component tree.

    State that changes frequently across the app, like localization, user settings, or dark mode.

    For apps that don’t require a full-fledged state management library like Redux or MobX.

When Not to Use React Context:

    Complex state logic: If the state management involves complex logic or large applications with many state transitions, using a more dedicated state management library (e.g., Redux or Zustand) might be a better choice.

    Frequent re-renders: If a context value changes frequently and impacts many components, it can cause unnecessary re-renders. This is when you might want to split the context or use another optimization approach.

TL;DR:

    React Context is useful for sharing global data (e.g., theme, authentication) without prop drilling.

    It's ideal for simple or medium complexity state management but may not scale well for large apps with complex state logic.

    Use Context when you need shared state or behavior across components and want to simplify your component tree by avoiding prop drilling.
