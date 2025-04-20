"use client"

import { useAuthContext } from "@/feat/auth/context"
import { useRegister } from "@/feat/auth/hooks"
import { RegisterReq } from "@/feat/auth/types"
import { Alert, Button, TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"

export default function RegisterForm() {
  const router = useRouter()

  const { isLogin } = useAuthContext()

  const { trigger: onRegister, data } = useRegister()

  const { handleSubmit, register } = useForm<RegisterReq>()

  const submit: SubmitHandler<RegisterReq> = data => onRegister(data)

  const onError: SubmitErrorHandler<Error> = error => {
    console.error("error", error)
  }

  useEffect(() => {
    if (isLogin) {
      router.push("/dashboard")
    }
  }, [isLogin, router])

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit, onError)}>
      <TextField
        type="text"
        {...register("firstName")}
        required
        label="First Name"
        variant="standard"
        className="w-full"
      />
      <TextField
        type="text"
        {...register("lastName")}
        required
        label="Last Name"
        variant="standard"
        className="w-full"
      />
      <TextField
        type="text"
        {...register("username")}
        required
        label="Username"
        variant="standard"
        className="w-full"
      />
      <TextField
        type="text"
        {...register("email")}
        required
        label="Email Address"
        variant="standard"
        className="w-full"
      />
      <TextField
        type="password"
        {...register("password")}
        required
        label="Password"
        variant="standard"
        className="w-full"
      />
      <Button type="submit" variant="contained" className="w-full" sx={{ marginTop: 2 }}>
        Submit
      </Button>
      { data?.error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>{data.message}</Alert>
      )}
    </form>
  )
}
