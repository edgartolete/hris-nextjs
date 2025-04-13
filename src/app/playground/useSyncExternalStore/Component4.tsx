import { useSyncExternalStore } from "react";
import { localStorageStore } from "./localStorageStore";

export function Component4() {
  const snapShot = useSyncExternalStore(localStorageStore.subscribe, localStorageStore.getSnapshot, localStorageStore.getServerSnapshot);
  return (
    <div>
      <h2>LocalStorage Count: {snapShot ?? "Loading"}</h2>
      <button onClick={localStorageStore.decrement}>decrement</button>
      <button onClick={localStorageStore.increment}>Increment</button>
    </div>
  );
}
