'use client'

import { ReactNode } from 'react'
import { useAuthVerify } from './hooks'
import { atom, Provider, useAtom, useAtomValue } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

type Props = {
  hasToken: boolean
  children: ReactNode
}

export const authAtom = atom<boolean>()

export const AuthProvider: React.FC<Props> = ({ hasToken, children }) => {
  const [auth, setAuth] = useAtom(authAtom)
  setAuth(hasToken)
  console.log('AuthProvider auth: ', auth)
  console.log('hasToken', hasToken)
  useAuthVerify()

  return <Provider>{children}</Provider>
}
