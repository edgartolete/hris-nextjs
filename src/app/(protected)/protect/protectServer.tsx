import { VerifyTokenResp } from '@/feat/auth/types'
import { generateApiURL } from '@/utils/api'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ProtectServer({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken') || ''

  if (!accessToken) {
    redirect('/?redirect=unauthorized')
  }

  const resolvedUrl = generateApiURL('auth/verify-token')
  const [err, data] = (await fetch(resolvedUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken.value}`
    }
  })
    .then((res) => res.json())
    .then((data) => [null, data])
    .catch((err) => [err, null])) as [Error | null, VerifyTokenResp | null]

  if (err || (data && data.message !== 'Successfully verified token.')) {
    redirect('/?redirect=unauthorized' )
  }

  return children
}
