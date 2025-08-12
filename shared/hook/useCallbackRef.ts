'use client'

import {useCallback, useRef, useState} from 'react'

export default function useCallbackRef<T>() {
  const ref = useRef<T | null>(null)
  const [refState, setRefState] = useState<T | null>(null)
  const setRef = useCallback((node: T | null) => {
    ref.current = node
    setRefState(node)
  }, [])
  return {
    ref,
    refDependency: refState,
    setRef,
  }
}