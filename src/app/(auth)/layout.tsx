import { Container } from "@mui/material";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Container maxWidth="xs" sx={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {children}
    </Container>
    </>
  )
}
