import AuthLayoutProvider from './provider'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayoutProvider>{children}</AuthLayoutProvider>
}
