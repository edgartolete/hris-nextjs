import { useTestContext } from "./testContext";

export function Component3() {
  const { increment, decrement } = useTestContext();

  console.log('Component3 rendered');

  return (
    <div>
      <h2>Component 3</h2>
      <p>This is the third component.</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
