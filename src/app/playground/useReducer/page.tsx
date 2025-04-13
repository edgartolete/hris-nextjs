"use client";

import React, { useReducer } from "react";

// Define the initial state
const initialState = {
  count: 0,
  name: "",
};

// Define the reducer function
const counterReducer = (
  state: typeof initialState,
  action: { type: string; payload?: string },
) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "setName":
      return { ...state, name: action.payload || "" };
    case "reset":
      return { ...state, count: 0, name: "" };
    default:
      return state;
  }
};

// Define the Counter component
export default function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <h2>Name: {state.name}</h2>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button
        onClick={() => dispatch({ type: "setName", payload: "John Doe" })}
      >
        Set Name
      </button>
    </div>
  );
}
