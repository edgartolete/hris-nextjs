'use client'

import { authAtom } from '@/feat/auth/atom'
import { useLogin, useLogout } from '@/feat/auth/hooks'
import { useAtomValue } from 'jotai'
export function AuthComponent() {
  const auth = useAtomValue(authAtom)
  const { login } = useLogin()
  const { logout} = useLogout()

  const handleLogin = () => {
    login({ username: 'edgartolete', password: 'abc123' })
  }

  const handleLogout = () => logout()

  return (
    <div>
      <h1>Auth Component</h1>
      <p>This is the auth component. isLogin: {auth ? 'YES' : 'NO'}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
