import { useEffect, useRef } from 'react'
import { EditableDivProps } from '../types'

export function useAutoFocus(props: EditableDivProps) {
  const { autoFocus = false, clearAutoFocus = () => {} } = props
  const focusRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!focusRef.current) return
    if (autoFocus) {
      focusRef.current.focus()

      const t = window.setTimeout(() => {
        if (focusRef.current) {
          const range = document.createRange()
          const selection = window.getSelection()

          range.selectNodeContents(focusRef.current)
          range.collapse(false)

          selection?.removeAllRanges()
          selection?.addRange(range)
        }
      }, 0)

      return () => {
        window.clearTimeout(t)
      }
    }
  }, [autoFocus])

  const handleBlur = () => {
    if (autoFocus) {
      clearAutoFocus()
    }
  }

  return {
    focusRef,
    handleBlur
  }
}