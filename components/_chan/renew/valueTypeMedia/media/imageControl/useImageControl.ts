import {IImageControl} from '@/components/_chan/renew/valueTypeMedia/media/imageControl/type'
import {useEffect, useState} from 'react'

export default function useImageControl({
  targetRef: ref,
  hover,
  changeValue,
}: IImageControl) {
  const [direction, setDirection] = useState<'normal' | 'reverse' | null>(null)
  const [mouseDown, setMouseDown] = useState<boolean>(false)
  const [startMousePosition, setStartMousePosition] = useState<{x: number, y: number} | null>(null)
  const [startWidth, setStartWidth] = useState<number | null>(null)
  const [alignOptionOpen, setAlignOptionOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseDown || !ref.current || !startMousePosition || !startWidth) return

      const deltaX = e.clientX - startMousePosition.x
      const newWidth = startWidth - (direction === 'normal' ? deltaX : deltaX * -1)
      ref.current.style.width = `${Math.max(newWidth, 100)}px`

      changeValue({width: `${Math.max(newWidth, 100)}px`})
    }

    const handleMouseMoveClean = () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''

      setMouseDown(false)
      setStartWidth(null)
      setStartMousePosition(null)
    }

    document.body.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseup', handleMouseMoveClean)
    document.body.addEventListener('mouseleave', handleMouseMoveClean)
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseup', handleMouseMoveClean)
      document.body.removeEventListener('mouseleave', handleMouseMoveClean)
    }
  }, [mouseDown, direction, startMousePosition, startWidth])

  useEffect(() => {
    if(alignOptionOpen && (!hover && !mouseDown))
      setAlignOptionOpen(false)
  }, [hover, mouseDown, alignOptionOpen])

  const widthControlOnMouseDown = (e: React.MouseEvent) => {
    if(ref.current === null) return

    document.body.style.cursor = 'ew-resize'
    document.body.style.userSelect = 'none'

    setDirection('normal')
    setStartMousePosition({x: e.clientX, y: e.clientY})
    setStartWidth(ref.current.offsetWidth)
    setMouseDown(true)
  }

  const widthControlRightOnMouseDown = (e: React.MouseEvent) => {
    if(ref.current === null) return

    document.body.style.cursor = 'ew-resize'
    document.body.style.userSelect = 'none'

    setDirection('reverse')
    setStartMousePosition({x: e.clientX, y: e.clientY})
    setStartWidth(ref.current.offsetWidth)
    setMouseDown(true)
  }

  const widthControlBothOnMouseUp = () => {
    setMouseDown(false)
  }

  return {
    mouseDown,
    widthControlOnMouseDown,
    widthControlRightOnMouseDown,
    widthControlBothOnMouseUp,
  }
}