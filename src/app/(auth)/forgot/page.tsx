export default function ForgotPage(){
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <p className="mt-4">Please enter your email address to reset your password.</p>
      <form className="mt-6">
        <input type="email" placeholder="Email" className="border rounded p-2" required />
        <button type="submit" className="mt-4 bg-blue-500 text-white rounded p-2">Send Reset Link</button>
      </form>
    </div>
  )
}
