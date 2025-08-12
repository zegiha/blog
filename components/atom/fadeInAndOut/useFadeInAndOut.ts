'use client'

import {parseMsNumber} from '@/components/atom/fadeInAndOut/helper'
import {IUseFadeInOut} from '@/components/atom/fadeInAndOut/type'
import {useEffect, useRef, useState} from 'react'

export default function useFadeInAndOut({
  show,
  beforeUnmount,
  animation,
  onMount,
  onUnmount
}: IUseFadeInOut) {
  const timerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const [mount, setMount] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if(show) {
      setMount(true)
      setHasMounted(false)
      return
    }

    beforeUnmount?.()

    timerRef.current = setTimeout(() => {
      setMount(false)
      setHasMounted(false)
    }, parseMsNumber(animation?.duration))

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [show, animation?.duration, beforeUnmount])

  useEffect(() => {
    if (mount && !hasMounted) {
      const t = setTimeout(() => {
        onMount?.()
        setHasMounted(true)
      }, 0)

      return () => clearTimeout(t)
    }
  }, [mount, hasMounted, onMount])

  useEffect(() => {
    return () => {
      if (hasMounted) onUnmount?.()
    }
  }, [hasMounted, onUnmount])

  return mount
}