export type BaseResp<T> = {
  message: string,
  data: T,
  error?: string,
}

export type LoginReq = {
  username: string
  password: string
}

export type LoginResp = BaseResp<{
  accessToken: string
  refreshToken: string
} & User>

export type VerifyTokenResp = BaseResp<{
  user: User,
  error: string
}>

export type VerifyUserResp = BaseResp<{
  user: User,
  error: string
}>


export type LogoutResp = BaseResp<{
  message: string
}>


export type User = {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  isActive: boolean
  isVerified: boolean
  isEmailVerified: boolean
}
