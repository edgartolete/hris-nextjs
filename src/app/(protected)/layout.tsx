import { MainLayout } from "./main"
import ProtectClient from "./protect-client"
import ProtectServer from "./protect-server"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectServer>
      <ProtectClient />
      <MainLayout>{children}</MainLayout>
    </ProtectServer>
  )
}
