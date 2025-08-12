'use client'

import {IUseOptionModal} from '@/components/molecule/optionModal/type'
import useCallbackRef from '@/shared/hook/useCallbackRef'
import {useEffect} from 'react'

export default function useOptionModal({
  open,
  onClose,
  style,
}: IUseOptionModal) {
  const {
    ref,
    refDependency,
    setRef,
  } = useCallbackRef<HTMLDivElement>()

  useEffect(() => {
    const toCssValue = (v: string | number) => {
      if(typeof v === 'string') return v
      return `${v}px`
    }

    const addBoxStyle = () => {
      if(!ref.current || !style) return
      if(style.width !== undefined) ref.current.style.width = toCssValue(style.width)
      if(style.maxWidth !== undefined) ref.current.style.maxWidth = toCssValue(style.maxWidth)
      if(style.minWidth !== undefined) ref.current.style.minWidth = toCssValue(style.minWidth)
      if(style.height!== undefined) ref.current.style.height= toCssValue(style.height)
      if(style.maxHeight!== undefined) ref.current.style.maxHeight= toCssValue(style.maxHeight)
      if(style.minHeight!== undefined) ref.current.style.minHeight= toCssValue(style.minHeight)

      if(style.x !== undefined) ref.current.style.left = toCssValue(style.x)
      if(style.y !== undefined) ref.current.style.top = toCssValue(style.y)
    }

    const getFocusedChild = () => {
      if(!ref.current) return null

      const focusedEl = document.activeElement
      if(
        focusedEl &&
        focusedEl !== ref.current &&
        ref.current.contains(focusedEl)
      ) {
        return focusedEl as HTMLElement
      } else {
        return null
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!ref.current) return

      if (e.key === 'Escape') {
        e.preventDefault()

        const focusedChild = getFocusedChild()
        if(focusedChild !== null) {
          focusedChild.blur()
        } else {
          onClose()
        }
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current) return

      const parent = ref.current.parentElement
      if (parent && !parent.contains(e.target as Node)) {
        const focusedChild = getFocusedChild()
        if(focusedChild !== null) {
          focusedChild.blur()
        } else {
          onClose()
        }
      }
    }

    if (open) {
      addBoxStyle()
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, refDependency, style])
  return setRef
}