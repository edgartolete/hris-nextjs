'use client'

import { useMutation } from '@/hooks/swr'
import Cookies from 'js-cookie'
import { LoginResp, LogoutResp, VerifyTokenResp } from './types'
import { useCallback } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { authAtom } from './atom'
import { useOnce } from '@/hooks/useOnce'

export function useLogin() {
  const setIsLogin = useSetAtom(authAtom)
  const {
    data,
    trigger: login,
    error,
    isMutating
  } = useMutation<LoginResp>(
    'auth/login',
    {},
    {
      onSuccess: ({ data }) => {
        if (data?.userId) {
          Cookies.set('accessToken', data.accessToken)
          Cookies.set('refreshToken', data.refreshToken)
          setIsLogin(true)
        }
      },
      onError: () => setIsLogin(false)
    }
  )

  return { login, data, isMutating, error }
}

export function useAuthVerify() {
  const setIsLogin = useSetAtom(authAtom)

  const {
    data,
    trigger: verify,
    isMutating,
    error
  } = useMutation<VerifyTokenResp>(
    'auth/verify-token',
    {},
    {
      onSuccess: (data) => {
        if (data.message === 'Successfully verified token.') {
          setIsLogin(true)
        }
        if (data.error) {
          setIsLogin(false)
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
        }
      },
      onError: () => setIsLogin(false)
    }
  )

  useOnce(() => verify())

  return { verify, data, isMutating, error }
}

export function useLogout() {
  const [isLogin, setIsLogin] = useAtom(authAtom)
  const refreshToken = Cookies.get('refreshToken')
  const { data, isMutating, trigger, error } = useMutation<LogoutResp>(
    'auth/logout',
    {
      body: JSON.stringify({ refreshToken })
    },
    {
      onSuccess: (data) => {
        console.log('#logout onSuccess')
        if (data?.message === 'Successfully logged-out.') {
          console.log('#if condition ok')
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
          setIsLogin(false)
        }
      },
    },
  )

  const logout = useCallback(() => {
    if (isLogin) {
      trigger()
    }
  }, [trigger, isLogin])

  return { logout, data, isMutating, error }
}

export function useRegister() {
  return { register() {} }
}
