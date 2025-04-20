import useSWR, { Key, SWRConfiguration } from "swr"
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation"
import Cookies from "js-cookie"
import { generateApiURL } from "@/utils/api"
import { staticConfig } from "@/app/config"
import { renewRefreshToken } from "@/feat/auth/service"

export const fetcher = async ([url, init]: [string, RequestInit]) => {
  const resolvedUrl = generateApiURL(url)
  const accessToken = Cookies.get("accessToken")

  const authInit = !accessToken
    ? init
    : {
        ...init,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          credentials: "include",
          ...init.headers
        }
      }

  return await fetch(resolvedUrl, authInit)
    .then(res => res.json())
    .then(async data => {
      if (data.message === "Expired Token") {
        const [err, data] = await renewRefreshToken(Cookies.get("refreshToken") || "")

        if (!err && data?.message === "Successfully renew RefreshToken.") {
          Cookies.set("accessToken", data.data.accessToken)
          Cookies.set("refreshToken", data.data.refreshToken)

          const retryInit = {
            ...init,
            headers: {
              Authorization: `Bearer ${data.data.accessToken}`,
              credentials: "include",
              ...init.headers
            }
          }

          return await fetch(resolvedUrl, retryInit).then(res => res.json())
        }
      }
      if (staticConfig.expiredSession.includes(data.message)) {
        Cookies.remove("accessToken")
      }
      return data
    })
}

export function useFetcher<T>(url: string, init: RequestInit = {}, options: SWRConfiguration = {}) {
  return useSWR<T, Error>([url, init], fetcher, { ...options })
}

export function useMutation<T, U extends Key = Key>(
  url: string,
  init: RequestInit = {},
  options: SWRMutationConfiguration<T, Error> = {}
) {
  const mutator = async (url: string, { arg }: { arg: U }) =>
    fetcher([
      url,
      {
        method: "POST",
        body: JSON.stringify(arg),
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...init.headers
        }
      }
    ])
  return useSWRMutation<T, Error, Key, U>(url, mutator, { ...options })
}
