import useSWR, { Key, SWRConfiguration } from 'swr'
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'
import Cookies from 'js-cookie'
import { generateApiURL } from '@/utils/api'
import { staticConfig } from '@/config'

export const fetcher = async ([url, init]: [string, RequestInit]) => {
  const resolvedUrl = generateApiURL(url)
  const accessToken = Cookies.get('accessToken')

  const authInit = !accessToken
    ? init
    : {
        ...init,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          credentials: 'include',
          ...init.headers,
        }
      }

      console.log('# authInit', authInit)

  return await fetch(resolvedUrl, authInit)
    .then((res) => res.json())
    .then((data) => {
      if (data.error === 'Unauthorized' && staticConfig.expiredSession.includes(data.message)) {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        return data;
      }
      if (data.error) {
        const err = new Error(data.message)
        err.name = data.error
        throw err
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
        method: 'POST',
        body: JSON.stringify(arg),
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...init.headers
        },
      }
    ])
  return useSWRMutation<T, Error, Key, U>(url, mutator, { ...options })
}
