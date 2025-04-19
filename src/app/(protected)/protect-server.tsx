import { getUser } from "@/feat/auth/service"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'

export default async function ProtectServer({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  if(!accessToken){
    redirect('/')
  }

  const [err, data] = await getUser(accessToken?.value || '')

  if(err || !data || (data && !data?.data?.id)){
    redirect('/')
  }

  return children
}
