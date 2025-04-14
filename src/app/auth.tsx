'use client'

import { useAuthVerify, useLogin, useLogout } from '@/feat/auth/hooks'
import { authAtom } from '@/feat/auth/provider'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
export function AuthComponent() {
  const [auth] = useAtom(authAtom)
  const { login } = useLogin()
  const { logout } = useLogout()

  const handleLogin = () => {
    login({ username: 'edgartolete', password: 'abc123' })
  }

  const handleLogout = () => logout()

  useEffect(() => {

  console.log('AuthComponent useEffect auth', auth)
  }, [auth])

  console.log('AuthComponent auth', auth)

  const val = auth ? 'YES' : 'NO'

  return (
    <div>
      <h1>Auth Component</h1>
      <p>This is the auth component. isLogin: {val}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
