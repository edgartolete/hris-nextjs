import { useEffect, useRef } from 'react'

export function useOnce<T>(callback: () => T) {
  const hasRun = useRef(false)

  useEffect(() => {
    if (!hasRun.current) {
      callback()
    }
    hasRun.current = true
  }, [callback])
}
