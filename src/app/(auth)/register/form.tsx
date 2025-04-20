"use client"

import { Button, TextField } from "@mui/material"
import Link from "next/link"

export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-2">
      <TextField type="text" required label="Username" variant="standard" className="w-full" />
      <TextField type="password" required label="Password" variant="standard" className="w-full" />
      <Button variant="contained" className="w-full" sx={{ marginTop: 2 }}>
        Submit
      </Button>
    </form>
  )
}
