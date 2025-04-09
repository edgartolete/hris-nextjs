import { useTestContext } from "./testContext";

export function Component5() {
  const { enabled } = useTestContext();

  console.log('Component5 rendered');
  return (
    <div>
      <h2>Component 5</h2>
      <p>This is the second component. context count is : {`${enabled} `}</p>
    </div>
  );
}
