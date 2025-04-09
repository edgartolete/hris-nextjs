import { AuthContextProvider } from "@/feat/auth/context";
import { ModalContextProvider } from "@/feat/modals/context";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </AuthContextProvider>
  );
}
