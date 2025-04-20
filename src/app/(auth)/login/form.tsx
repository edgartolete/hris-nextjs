"use client"

import { Button, TextField } from "@mui/material"

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-2">
      <TextField type="text" required label="Username" variant="standard" className="w-full" />
      <TextField
        type="password"
        required
        label="Password"
        variant="standard"
        className="w-full"
      />
      <Button variant="contained" className="w-full" type="submit" sx={{ marginTop: 2 }}>
        Submit
      </Button>
    </form>
  )
}
