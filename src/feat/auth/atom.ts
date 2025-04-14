
import { atom } from 'jotai'
import Cookies from 'js-cookie'

const accessToken = Cookies.get('accessToken')
const refreshToken = Cookies.get('refreshToken')

const hasToken = !!accessToken && !!refreshToken
// export const authAtom = atom<boolean>(hasToken)
