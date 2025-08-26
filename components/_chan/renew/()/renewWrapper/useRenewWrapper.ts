'use client'

import {IRenew} from '@/components/_chan/renew/()/type'
import {useDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/useDragAndDrop'
import useCallbackRef from '@/shared/hook/useCallbackRef'
import {useEffect, useRef, useState} from 'react'

export default function useRenewWrapper(useDragAndDropParam: IRenew['useDragAndDropParam']) {

  const {ref: dragAndDropTargetRef, onTargetMouseDown: onDragStart} = useDragAndDrop(useDragAndDropParam)
  const {ref: containerRef, refDependency: containerRefDependency, setRef: setContainerRef} = useCallbackRef<HTMLDivElement>()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState<boolean>(false)

  useEffect(() => {
    if(!containerRef.current) return

    const handleMouseEnter = () => {
      setHover(true)
    }
    const handleMouseLeave = () => {
      setHover(false)
    }
    containerRef.current.addEventListener('mouseenter', handleMouseEnter)
    containerRef.current.addEventListener('mouseleave', handleMouseLeave)
  }, [containerRefDependency]);

  return {
    dragAndDropTargetRef,
    containerRef,
    setContainerRef,
    wrapperRef,
    hover,
    onDragStart,
  }
}