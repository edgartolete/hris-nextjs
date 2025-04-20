import { AuthContextProvider } from "@/feat/auth/context"
import { getUser, renewRefreshToken } from "@/feat/auth/service"
import { ModalContextProvider } from "@/feat/modals/context"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { cookies } from "next/headers"

export default async function Providers({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  let user = null
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")
  const refreshToken = cookieStore.get("refreshToken")

  const [err, data] = await getUser(accessToken?.value || "")

  if (!err && data?.message === "User Found") {
    user = data?.data
  }

  if (data?.message === "Expired Token") {
    const [err, renewData] = await renewRefreshToken(refreshToken?.value || "")

    if (!err && renewData?.message === "Successfully renew RefreshToken.") {
      const [err, data] = await getUser(renewData?.data?.accessToken || "")

      if (!err && data?.message === "User Found") {
        user = data?.data
        cookieStore.set("accessToken", renewData?.data?.accessToken)
        cookieStore.set("refreshToken", renewData?.data?.refreshToken)
      }
    }
  }

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <AuthContextProvider initUser={user}>
        <ModalContextProvider>{children}</ModalContextProvider>
      </AuthContextProvider>
    </AppRouterCacheProvider>
  )
}
