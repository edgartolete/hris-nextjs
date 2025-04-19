'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { User } from './types'

interface AuthContextType {
  user?: User | null
  setUser: (user: User | null) => void
  isLogin?: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthContextProviderProps {
  initUser?: User | null
  hasToken?: boolean
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ initUser = null, children }) => {
  const [user, setUser] = useState<User | null>(initUser)

  const isLogin = Boolean(user?.id);

  return (
    <AuthContext.Provider value={{ user, setUser, isLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }
  return context
}
