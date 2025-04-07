"use client";

import { debugLogger } from "@/utils/debug";


export default function TestPage() {

  debugLogger("TestPage rendered");


  return (
    <div>
      <h1>Test Page</h1>

      <p>This is a test page.</p>
    </div>
  );
}
