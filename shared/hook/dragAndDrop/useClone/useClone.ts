'use client'

import React, {RefObject, useEffect, useRef} from 'react'
import style from './style.module.css'

export default function useClone() {
  const cloneRef = useRef<HTMLDivElement | null>(null)

  const clearClone = () => {
    const clone = cloneRef.current
    if (clone) {
      clone.remove()
      cloneRef.current = null
    }
  }

  const addTargetClone = (
    ref: RefObject<HTMLDivElement | null>,
    e: React.MouseEvent
  ) => {
    if(!ref.current) return null

    if(cloneRef.current) {
      clearClone()
    }

    const clone = ref.current.cloneNode(true) as HTMLDivElement
    const rect = ref.current.getBoundingClientRect()

    clone.classList.add(style.clone)

    clone.style.left = e.clientX + 10 + 'px'
    clone.style.top = e.clientY + 10 + 'px'
    clone.style.width = rect.width + 'px'
    clone.style.height = rect.height + 'px'
    clone.style.position = 'fixed'


    document.body.appendChild(clone)
    cloneRef.current = clone
  }

  useEffect(() => {
    const onMouseMoveWithClone = (e: MouseEvent) => {
      if(!cloneRef.current) return
      cloneRef.current.style.left = e.clientX + 10 + 'px'
      cloneRef.current.style.top = e.clientY + 10 + 'px'
    }
    document.body.addEventListener('mousemove', onMouseMoveWithClone)

    return () => {
      document.body.removeEventListener('mousemove', onMouseMoveWithClone)
    }
  }, [])

  return {
    cloneRef,
    addTargetClone,
    clearClone,
  }
}
