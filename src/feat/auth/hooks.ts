'use client'

import { useMutation } from '@/hooks/swr'
import Cookies from 'js-cookie'
import { LoginResp, LogoutResp } from './types'
import { useAuthContext } from './context'

export function useLogin() {
  const { setUser } = useAuthContext()
  return useMutation<LoginResp>(
    'auth/login',
    {},
    {
      onSuccess: ({ data }) => {
        if (data.id) {
          const { accessToken, refreshToken, ...rest } = data
          Cookies.set('accessToken', accessToken)
          Cookies.set('refreshToken', refreshToken)
          setUser(rest)
        }
      }
    }
  )
}

export function useLogout() {
  const { setUser } = useAuthContext()

  const refreshToken = Cookies.get('refreshToken')

  return useMutation<LogoutResp>(
    'auth/logout',
    {
      body: JSON.stringify({ refreshToken })
    },
    {
      onSuccess: () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        setUser(null)
      }
    }
  )
}

// export function useRegister() {
//   const registerUser = (userData) => {
//     // logic to register user
//   }
//
//   return {
//     registerUser
//   }
// }
