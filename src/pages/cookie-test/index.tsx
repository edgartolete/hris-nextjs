import Cookies from 'js-cookie'

export default function Page() {
  const cookie = Cookies.get('auth')

  console.log('cookie', cookie)

  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page.</p>
    </div>
  )
}
