export type BaseResp<T> = {
  message: string,
  data: T,
}

export type LoginReq = {
  username: string
  password: string
}

export type LoginResp = BaseResp<{
  accessToken: string
  refreshToken: string
  username: string
  userId: number
}>

export type VerifyTokenResp = BaseResp<{
  user: number
}>

export type LogoutResp = BaseResp<{
  message: string
}>
