"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface MyContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
  enabled: boolean;
}

const TestContext = createContext<MyContextType | null>(null);

interface MyContextProviderProps {
  children: ReactNode;
}

export const TestProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [count, setCount] = useState<number>(0);
  const [enabled, ] = useState<boolean>(false);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  }

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  }

  return (
    <TestContext.Provider value={{ count, increment, decrement, enabled }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error(
      "useTestContext must be used within a MyTestContextProvider",
    );
  }
  return context;
};
