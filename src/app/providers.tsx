import { AuthContextProvider } from '@/feat/auth/context'
import { getUser } from '@/feat/auth/service'
import { ModalContextProvider } from '@/feat/modals/context'
import { cookies } from 'next/headers'

export default async function Providers({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get('accessToken')

  const [err, data] = await getUser(accessToken?.value || '')

  const user = !err && data ? data?.data : null

  return (
    <AuthContextProvider initUser={user}>
      <ModalContextProvider>{children}</ModalContextProvider>
    </AuthContextProvider>
  )
}
