'use client'

import { ReactNode } from 'react'
import { useAuthVerify } from './hooks'

type Props = {
  children: ReactNode
}

export const AuthProvider: React.FC<Props> = ({  children }) => {
  useAuthVerify()

  return children
}
