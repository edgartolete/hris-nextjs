'use client'

import { useAuthContext } from '@/feat/auth/context'
import { useLogin, useLogout } from '@/feat/auth/hooks'
import { useRouter } from 'next/navigation'
export function AuthComponent() {
  const router = useRouter()
  const { isLogin } = useAuthContext()
  const { trigger: logout } = useLogout()
  const { trigger: login } = useLogin()

  const handleLogin = () => {
    login({ username: 'edgartolete', password: 'abc123' })
  }

  const handleLogout = () => {
    logout()
  }

  const gotoDashboard = () => {
    if (isLogin) router.push('/home')
  }
  return (
    <div>
      <h1>Auth Component</h1>
      <p>This is the auth component. isLogin: {`${isLogin}`}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>logout</button>
      <button onClick={gotoDashboard}>dashboard</button>
    </div>
  )
}
