'use client'

import { useAuthContext } from '@/feat/auth/context'
import Cookies from 'js-cookie'
export function AuthComponent() {
  const { isLogin } = useAuthContext()

  const handleLogin = () => {
    login({ username: 'edgartolete', password: 'abc123' })
  }

  const handleLogout = () => {
    const refreshToken = Cookies.get('refreshToken') || ''
    logout({ refreshToken })
  }
  return (
    <div>
      <h1>Auth Component</h1>
      <p>This is the auth component. isLogin: {isLogin ? 'YES' : 'NO'}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
