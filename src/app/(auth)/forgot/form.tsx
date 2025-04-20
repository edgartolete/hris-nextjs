"use client"

import { Button, TextField } from "@mui/material"

export function ForgotForm() {
  return (
    <form className="mt-6 flex flex-col gap-4">
      <TextField type="text" required label="Email Address" variant="outlined" className="w-full" />
      <Button type="submit" variant="contained">
        Send Reset Link
      </Button>
    </form>
  )
}
