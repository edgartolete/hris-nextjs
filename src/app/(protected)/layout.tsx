import Protect from './protect'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <Protect>{children}</Protect>
}
