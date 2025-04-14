'use client'

import { useMutation } from '@/hooks/swr'
import Cookies from 'js-cookie'
import { LoginResp, LogoutResp, VerifyTokenResp } from './types'
import { useAuthContext } from './context'
import { useRouter } from 'next/navigation'

export function useLogin() {
  const { setIsLogin } = useAuthContext()
  const { trigger: login, ...rest } = useMutation<LoginResp>(
    'auth/login',
    {},
    {
      onSuccess: ({ data }) => {
        if (data.userId) {
          Cookies.set('accessToken', data.accessToken)
          Cookies.set('refreshToken', data.refreshToken)
          setIsLogin(true)
        }
      },
      onError: () => setIsLogin(false)
    }
  )

  return { login, ...rest }
}

export function useAuthVerify(isLogin: boolean, setIsLogin: (v: boolean) => void) {
  const { trigger: verify, ...rest } = useMutation<VerifyTokenResp>(
    'auth/verify-token',
    {},
    {
      onSuccess: (data) => {
        if (isLogin && data.error) setIsLogin(false)
      },
      onError: () => setIsLogin(false)
    }
  )

  return { verify, ...rest }
}

export function useLogout() {
  const { isLogin, setIsLogin } = useAuthContext()

  const refreshToken = Cookies.get('refreshToken')
  const { trigger, ...rest } = useMutation<LogoutResp>(
    'auth/logout',
    {
      body: JSON.stringify({ refreshToken })
    },
    {
      onSuccess: (data) => {
        if (data?.message === 'Successfully logged-out.') {
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
          setIsLogin(false)
        }
      }
    }
  )
  const logout = () => {
    if (isLogin) trigger()
  }

  return { logout, ...rest }
}

export function useRegister() {
  return { register() {} }
}
