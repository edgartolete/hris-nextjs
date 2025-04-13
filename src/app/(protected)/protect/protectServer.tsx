import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ProtectServer({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken') || ''
  const refreshToken = cookieStore.get('refreshToken') || ''

  if(!accessToken && !refreshToken){
    redirect('/')
  }

  return children
}
