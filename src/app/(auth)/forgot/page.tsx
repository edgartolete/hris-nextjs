import Link from "next/link"
import { ForgotForm } from "./form"

export default function ForgotPage() {
  return (
    <div className="w-full rounded-lg border border-[var(--gray3)] bg-[var(--gray1)] p-6 pt-8">
      <h1 className="text-4xl font-bold mb-2 text-center">Register</h1>
      <ForgotForm />
      <div className="flex flex-row gap-2 justify-start mt-2">
        <Link href="/login" className="text-sm p-2 text-[var(--primary)]">Login</Link>
        <Link href="/register" className="text-sm p-2 text-[var(--primary)]">Register</Link>
      </div>
    </div>
  )
}
