import {defaultIUseDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/const'
import {IUseDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/type'
import React, {useEffect, useRef} from 'react'
import style from './style.module.css'

export function useDragAndDrop(
  params: IUseDragAndDrop | undefined
) {
  const ref = useRef<HTMLDivElement | null>(null)

  const {
    idx,
    // isTarget,
    isHoverAndPosition,
    onTargeted,
    onDragged,
    onTargetDropped,
  } = params ?? defaultIUseDragAndDrop

  const handleMouseDown = (e: React.MouseEvent) => {
    onTargeted(idx, ref, e)
  }

  useEffect(() => {
    if(!ref.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if(ref.current === null) return
      const rect = ref.current.getBoundingClientRect()
      const range = rect.height
      const mousePos = e.clientY - rect.top
      const position = mousePos > range / 2 ? 'bottom' : 'top'
      onDragged(idx, position)
    }

    ref.current.addEventListener('mousemove', handleMouseMove)

    return () => {
      if(!ref.current) return
      ref.current.removeEventListener('mousemove', handleMouseMove)
    }
  }, [
    idx,
    isHoverAndPosition,
    onTargeted,
    onDragged,
    onTargetDropped,
  ]);

  useEffect(() => {
    if(!ref.current) return

    ref.current.classList.remove(style.topDivider)
    ref.current.classList.remove(style.bottomDivider)

    if(isHoverAndPosition === 'top') {
      ref.current.classList.add(style.topDivider)
    } else if(isHoverAndPosition === 'bottom') {
      ref.current.classList.add(style.bottomDivider)
    }
  }, [isHoverAndPosition])

  return {
    ref,
    onTargetMouseDown: handleMouseDown,
  }
}