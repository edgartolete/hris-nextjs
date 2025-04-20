"use client"

import { useLogout } from "@/feat/auth/hooks"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const { trigger: logout } = useLogout()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
      <Link href="/settings">Settings</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
