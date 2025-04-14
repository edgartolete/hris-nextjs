'use client'

import { useLogout } from '@/feat/auth/hooks'

export function Logout() {
  const { logout } = useLogout()
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Logout</h1>
      <p className='text-gray-600'>You have been logged out.</p>
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
