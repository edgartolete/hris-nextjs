'use client'

import { authAtom } from '@/feat/auth/provider'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

export default function ProtectClient({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const isLogin = useAtomValue(authAtom)

  useLayoutEffect(() => {
    if (!isLogin) {
      router.push('/')
    }
  }, [isLogin, router])

  return children
}
