import { Component3 } from "./Component3";
import { Component4 } from "./Component4";
import { Component5 } from "./Component5";

export function Component2() {
  console.log('Component2 rendered');

  return (
    <div>
      <h2>Component 2</h2>
      <p>This is the second component. </p>
      <Component3/>
      <Component4/>
      <Component5/>
    </div>
  );
}
