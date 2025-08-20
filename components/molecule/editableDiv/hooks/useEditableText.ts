import { useCallback, useRef, useEffect, useState, KeyboardEventHandler } from 'react'
import { EditableDivProps } from '../types'

interface UseEditableTextProps extends Pick<EditableDivProps, 
  'content' | 'setContent' | 'contentType' | 'onContentTypeChange' | 
  'allowLineBreak' | 'onAddButtonClick' | 'onDeleteBlock' | 'autoFocus' | 'clearAutoFocus' | 'controllable'
> {
  optionModalOpen: boolean
  onOptionModalEntered: () => void
}

export function useEditableText(props: UseEditableTextProps) {
  const {
    content,
    setContent,
    contentType,
    onContentTypeChange,
    allowLineBreak = true,
    onAddButtonClick = () => {},
    onDeleteBlock = () => {},
    optionModalOpen,
    onOptionModalEntered,
    autoFocus = false,
    clearAutoFocus = () => {},
    controllable
  } = props

  const contentRef = useRef<HTMLDivElement | null>(null)
  const focusRef = useRef<HTMLDivElement | null>(null)
  const [isContentFocus, setIsContentFocus] = useState<boolean>(false)

  const onInput = useCallback(() => {
    if (!contentRef.current) return
    const newValue = contentRef.current.innerHTML === '<br>' ? '' : contentRef.current.innerHTML
    setContent(newValue)
  }, [setContent])

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback((e) => {
    const enterToNewBlock = () => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        if(optionModalOpen) {
          onOptionModalEntered()
        } else if(controllable) onAddButtonClick()
      }
    }
    enterToNewBlock()

    const disallowLineBreak = () => {
      if (e.key === 'Enter' && e.shiftKey) {
        if (!allowLineBreak)
          e.preventDefault()
      }
    }
    disallowLineBreak()

    const deleteBlock = () => {
      if (content === '' && e.key === 'Backspace') {
        if(contentType !== 'content') {
          onContentTypeChange?.('content')
        } else {
          onDeleteBlock()
        }
      }
    }
    deleteBlock()
  }, [allowLineBreak, content, onAddButtonClick, onDeleteBlock, optionModalOpen, contentType, onOptionModalEntered, onContentTypeChange])

  const handleFocus = useCallback(() => {
    setIsContentFocus(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsContentFocus(false)
    if (autoFocus) {
      clearAutoFocus()
    }
  }, [autoFocus, clearAutoFocus])

  useEffect(() => {
    if (!contentRef.current) return
    const current = contentRef.current.innerHTML ?? ''

    if (current !== content) {
      contentRef.current.innerHTML = content
    }
  }, [content])

  useEffect(() => {
    if (focusRef.current && contentRef.current) {
      focusRef.current = contentRef.current
    }
  }, [])

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

  return {
    contentRef,
    focusRef,
    isContentFocus,
    onInput,
    onKeyDown,
    onFocus: handleFocus,
    onBlur: handleBlur
  }
}