import Link from 'next/link'
import { Logout } from './logout'

export default function SettingsPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Settings</h1>
      <p className='text-gray-600'>This is the settings page.</p>
      <Link href='/home' className='mt-4 text-blue-500 hover:underline'>Dashboard</Link>
      <Logout />
    </div>
  )
}
