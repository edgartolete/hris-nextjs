"use client"
import Component1 from "./Component1";
import { TestProvider } from "./testContext";

export default function ContextTestPage(){
  return (
    <div>
      <h1>Context Test Page</h1>
      <h2>Check console for context updates</h2>
      <p>Test the useContext hook with a simple counter</p>
    <TestProvider>
      <Component1 />
    </TestProvider>
    </div>
  )
}
