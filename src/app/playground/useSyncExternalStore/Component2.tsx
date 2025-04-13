import { useCountStore } from "./countStore";

export function Component2() {
  const { increment, decrement } = useCountStore();
  return (
    <div>
      <button onClick={() => decrement()}>Decrement</button>
      <button onClick={() => increment()}>Increment</button>
    </div>
  );
}
