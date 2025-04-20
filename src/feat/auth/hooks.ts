"use client"

import { useMutation } from "@/hooks/swr"
import Cookies from "js-cookie"
import { LoginReq, LoginResp, LogoutResp, RegisterReq, RegisterResp } from "./types"
import { useAuthContext } from "./context"

export function useLogin() {
  const { setUser } = useAuthContext()
  return useMutation<LoginResp, LoginReq>(
    "auth/login",
    {},
    {
      onSuccess: (res) => {
        if (res?.data) {
          const { accessToken, refreshToken, ...rest } = res.data
          Cookies.set("accessToken", accessToken)
          Cookies.set("refreshToken", refreshToken)
          setUser(rest)
        }
        if(res?.error) {
          console.log("Login error", res.error)
        }
      }
    }
  )
}

export function useLogout() {
  const { setUser } = useAuthContext()

  const refreshToken = Cookies.get("refreshToken")

  return useMutation<LogoutResp>(
    "auth/logout",
    {
      body: JSON.stringify({ refreshToken })
    },
    {
      onSuccess: () => {
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
        setUser(null)
      }
    }
  )
}

export function useRegister() {
  const { setUser } = useAuthContext()

  return useMutation<RegisterResp, RegisterReq>('auth/register', {}, {
    onSuccess: (res) => {
      if (res?.data) {
        const { accessToken, refreshToken, ...rest } = res.data
        Cookies.set("accessToken", accessToken)
        Cookies.set("refreshToken", refreshToken)
        setUser(rest)
      }
      if(res?.error) {
        console.log("Register error", res.error)
      }
    }
  })
}
