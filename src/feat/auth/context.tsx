'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { useAuthVerify, useLogin, useLogout, useRegister } from './hooks'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { LoginReq } from './types'
import { useOnce } from '@/hooks/useOnce'

interface AuthContextType {
  isLogin: boolean
  login: (data: LoginReq) => void
  logout: () => void
  register: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthContextProviderProps {
  accessToken: string | RequestCookie
  refreshToken: string | RequestCookie
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  accessToken,
  refreshToken,
  children
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(!!accessToken && !!refreshToken)
  const { login } = useLogin(setIsLogin)
  const { logout } = useLogout(isLogin, setIsLogin)
  const { verify } = useAuthVerify(isLogin, setIsLogin)
  const { register } = useRegister()

  useOnce(() => isLogin && verify())

  return <AuthContext.Provider value={{ isLogin, login, logout, register }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAUthContext must be used within a AuthContextProvider')
  }
  return context
}
