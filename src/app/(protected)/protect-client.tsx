'use client'

import { useAuthContext } from '@/feat/auth/context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectClient() {
  const { isLogin } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
  if (!isLogin) router.push('/')
  },[isLogin, router])

  return null
}
