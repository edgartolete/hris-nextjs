import ProtectClient from './protectClient'
import ProtectServer from './protectServer'

export default async function Protect({ children }: { children: React.ReactNode }) {
  return (
    <ProtectServer>
      <ProtectClient>{children}</ProtectClient>
    </ProtectServer>
  )
}
