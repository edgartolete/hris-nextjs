import Link from "next/link"
import RegisterForm from "./form"

export default function Login() {
  return (
    <div className="w-full rounded-lg border border-[var(--gray3)] bg-[var(--gray1)] p-6 pt-8">
      <h1 className="text-4xl font-bold mb-2 text-center">Register</h1>
      <RegisterForm />
      <div className="flex flex-row gap-2 mt-2">
        <Link href="/forgot" className="text-sm p-2 text-[var(--primary)]">
          Forgot password?
        </Link>
        <Link href="/login" className="text-sm p-2 text-[var(--primary)]">
          Login
        </Link>
      </div>
    </div>
  )
}
