'use client'

import { useAuthContext } from '@/feat/auth/context'
import { useLogout } from '@/feat/auth/hooks'

export function Logout() {
  const { logout } = useLogout()
  const { isLogin } = useAuthContext()
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Logout</h1>
      <p className='text-gray-600'>isLogin?: { `${isLogin}`}</p>
      <button
        onClick={() => {
          logout()
        }}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
      >
        logout
      </button>
    </div>
  )
}
