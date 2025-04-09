import { useTestContext } from "./testContext";

export function Component4() {
  const { count } = useTestContext();

  console.log('Component4 rendered');
  return (
    <div>
      <h2>Component 4</h2>
      <p>This is the second component. context count is : {`${count} `}</p>
    </div>
  );
}
