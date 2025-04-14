'use client'

import { useAuthContext } from '@/feat/auth/context'
import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

export default function ProtectClient({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isLogin } = useAuthContext()

  useLayoutEffect(() => {
    if (!isLogin) {
      router.push('/')
    }
  }, [isLogin, router])

  return children
}
