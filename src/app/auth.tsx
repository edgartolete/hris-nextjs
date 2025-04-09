"use client"

import { useAuthContext } from "@/feat/auth/context";

export function AuthComponent() {
  const { isLogin, login } = useAuthContext()

  return (
    <div>
      <h1>Auth Component</h1>
      <p>This is the auth component. isLogin: {`${ isLogin }`}</p>
      <button onClick={login} >Login</button>
    </div>
  );
}
