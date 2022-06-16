import { DependencyList, useEffect } from 'react'

export const useDebounceEffect = (callback: () => void, delay: number, deps?: DependencyList) => {
  useEffect(
    () => {
      const timeout = setTimeout(callback, delay)

      return () => clearTimeout(timeout)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps, callback, delay] : [callback, delay],
  )
}
