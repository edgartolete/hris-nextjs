"use client";

import { Component1 } from "./Component1";
import { Component2 } from "./Component2";
import { Component4 } from "./Component4";
import { Component5 } from "./Component5";
import { Component6 } from "./Component6";
import { useLayout } from "./layoutStore";

export default function TestPage() {
  const innerWidth = useLayout()
  return (
    <div>
      <h1>Test Page</h1>
      <Component1 />
      <Component2 />
      <Component4 />
      <Component5 />
      <Component6 />
      <h2>innerWidth: {innerWidth}</h2>
    </div>
  );
}
