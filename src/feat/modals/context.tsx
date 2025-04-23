"use client"

import { createContext, ReactNode, useCallback, useContext, useMemo } from "react"
// import { ModalRenderer } from "./renderer";
import { modals } from "./registry"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export type ModalType = {
  open: boolean
  value?: string
}

type ModalContextType = {
  openedModals: Map<string, ModalType>
  setModalState: (key: string, modal: ModalType) => void
  getModalState: (key: string) => ModalType
}

const ModalContext = createContext<ModalContextType | null>(null)

interface ModalContextProviderProps {
  children: ReactNode
}

export const ModalContextProvider: React.FC<ModalContextProviderProps> = ({ children }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const query = searchParams?.toString()

  const openedModals = useMemo(() => {
    const openedModals = new Map<string, ModalType>()
    const params = new URLSearchParams(query)

    for (const [key, value] of params.entries()) {
      if (value === "false" || !modals.has(key)) continue

      openedModals.set(key, { open: true, value })
    }
    return openedModals
  }, [query])

  const setModalState = (key: string, { open, value }: ModalType) => {
    if (!modals.has(key)) {
      console.log("Modal not found")
      return
    }

    const params = new URLSearchParams(searchParams?.toString())

    if (open) {
      params.set(key, value ?? "true")
    } else {
      params.delete(key)
    }
    const newPath = pathname + "?" + params.toString()
    router.push(newPath)
  }

  const getModalState = useCallback(
    (key: string) => {
      if (!modals.has(key)) {
        console.log("Modal not found")
        return { open: false, value: undefined }
      }

      const params = new URLSearchParams(searchParams?.toString())
      const value = params.get(key)
      return { open: value !== "false", value: value ?? "" }
    },
    [searchParams]
  )

  return (
    <ModalContext.Provider value={{ openedModals, setModalState, getModalState }}>
      {children}
      {/*<ModalRenderer /> */}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useAuthContext must be used within a ModalContextProvider")
  }
  return context
}
