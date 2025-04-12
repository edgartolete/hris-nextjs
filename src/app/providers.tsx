import { AuthContextProvider } from '@/feat/auth/context'
import { ModalContextProvider } from '@/feat/modals/context'
import { cookies } from 'next/headers'

export default async function Providers({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken') || ''
  const refreshToken = cookieStore.get('refreshToken') || ''

  return (
    <AuthContextProvider accessToken={accessToken} refreshToken={refreshToken}>
      <ModalContextProvider>{children}</ModalContextProvider>
    </AuthContextProvider>
  )
}
