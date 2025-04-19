import { generateApiURL } from '@/utils/api'
import { BaseResp, User } from './types'
import { cache } from 'react'

export const getUser = cache(async (token: string) => {
  const resolvedUrl = generateApiURL('users/me')

  const [err, data] = await fetch(resolvedUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => [null, data])
    .catch((err) => [err, null])

  return [err, data] as [Error | null, BaseResp<User> | null]
})
