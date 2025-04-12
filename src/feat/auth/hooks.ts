'use client'

import { useMutation } from '@/hooks/swr'
import Cookies from 'js-cookie'
import { LoginResp, LogoutResp, VerifyTokenResp } from './types'
import { useEffect } from 'react'

export function useLogin(setIsLogin: (isLogin: boolean) => void) {
  const { data, trigger: login, error, isMutating } = useMutation<LoginResp>('auth/login')

  useEffect(() => {
    if (!isMutating && !error && data && data.data.userId) {
      Cookies.set('accessToken', data.data.accessToken)
      Cookies.set('refreshToken', data.data.refreshToken)
      setIsLogin(true)
    }

    if (!isMutating && error) {
      setIsLogin(false)
    }
  }, [isMutating, error, data, setIsLogin])

  return { login, data, isMutating, error }
}

export function useAuthVerify(setIsLogin: (isLogin: boolean) => void) {
  const {
    data,
    trigger: verify,
    isMutating,
    error
  } = useMutation<VerifyTokenResp>('auth/verify-token')

  useEffect(() => {
    if (!isMutating && !error && data && data.data.user) {
      setIsLogin(true)
    }

    if (!isMutating && error) {
      setIsLogin(false)
    }
  }, [isMutating, error, data, setIsLogin])

  return { verify, data, isMutating, error }
}

export function useLogout(setIsLogin: (isLogin: boolean) => void) {
  const { data, isMutating, trigger: logout, error } = useMutation<LogoutResp>('auth/logout')

  useEffect(() => {
    if (!isMutating && !error && data && data.message === 'Successfully logged-out.') {
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      setIsLogin(false)
    }
  }, [isMutating, error, data, setIsLogin])

  return { logout, data, isMutating, error }
}

export function useRegister() {
  return { register () {} }
}
