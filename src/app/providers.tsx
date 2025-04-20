import { AuthContextProvider } from '@/feat/auth/context'
import { getUser } from '@/feat/auth/service'
import { ModalContextProvider } from '@/feat/modals/context'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
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
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <AuthContextProvider initUser={user}>
        <ModalContextProvider>{children}</ModalContextProvider>
      </AuthContextProvider>
    </AppRouterCacheProvider>
  )
}
