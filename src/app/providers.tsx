import { AuthContextProvider } from "@/feat/auth/context";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
