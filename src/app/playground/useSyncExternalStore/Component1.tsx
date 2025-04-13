import { useCountStore } from "./countStore";

export function Component1() {
  const { count } = useCountStore();
  return (
    <div>
      <h2>Count: {count}</h2>
    </div>
  );
}
