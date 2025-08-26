'use client'

import {RefObject, useCallback, useRef, useState} from 'react'

export default function useCallbackRef<T>(
  refParam?: RefObject<T>,
) {
  const ref = useRef<T | null>(refParam !== undefined ? refParam.current : null)
  const [refState, setRefState] = useState<T | null>(refParam !== undefined ? refParam.current : null)
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