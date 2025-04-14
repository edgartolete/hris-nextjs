import { Suspense } from 'react'
import { AuthComponent } from './auth'

export default function Home() {
  return (
    <Suspense fallback={null}>
      <AuthComponent />
    </Suspense>
  )
}
