import { generateApiURL } from '@/utils/api'
import { BaseResp, RenewRefreshTokenResp, User } from './types'
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

export const renewRefreshToken = async(refreshToken: string) => {
  const resolvedUrl = generateApiURL('auth/refresh')

  const [err, data] = await fetch(resolvedUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  })
    .then((res) => res.json())
    .then((data) => [null, data])
    .catch((err) => [err, null])

  return [err, data] as [Error | null, RenewRefreshTokenResp | null]
}
