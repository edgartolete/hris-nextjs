import Protect from './protect'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <Protect>{children}</Protect>
}
