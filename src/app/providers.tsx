import { AuthProvider } from '@/feat/auth/provider'
import { ModalContextProvider } from '@/feat/modals/context'

export default async function Providers({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </AuthProvider>
  )
}
