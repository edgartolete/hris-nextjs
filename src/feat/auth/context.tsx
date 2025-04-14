'use client'

import { useSearchParams } from 'next/navigation'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface AuthContextType {
  isLogin: boolean
  setIsLogin: (val: boolean) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthContextProviderProps {
  hasTokens: boolean
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  hasTokens,
  children
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(hasTokens)

  const searchParams = useSearchParams()

  useEffect(() => {
    const redirectVal = searchParams?.get('redirect')

    if (redirectVal === 'unauthorized') {
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      setIsLogin(false)
    }
  }, [searchParams, setIsLogin])

  return <AuthContext.Provider value={{ isLogin, setIsLogin }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAUthContext must be used within a AuthContextProvider')
  }
  return context
}
