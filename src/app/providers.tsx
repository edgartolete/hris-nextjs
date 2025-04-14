import { AuthProvider } from '@/feat/auth/provider'
import { ModalContextProvider } from '@/feat/modals/context'
import { cookies } from 'next/headers'

export default async function Providers({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')
  const refreshToken = cookieStore.get('refreshToken')
  return (
    <AuthProvider hasToken={!!accessToken || !!refreshToken}>
      <ModalContextProvider>{children}</ModalContextProvider>
    </AuthProvider>
  )
}
