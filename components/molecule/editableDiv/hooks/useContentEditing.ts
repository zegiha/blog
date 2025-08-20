import { useCallback, useRef, KeyboardEventHandler } from 'react'
import { EditableDivProps } from '../types'

export function useContentEditing(props: EditableDivProps & { optionModalOpen: boolean, onOptionModalEntered: () => void }) {
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
  } = props
  const contentRef = useRef<HTMLDivElement | null>(null)

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
        } else onAddButtonClick()
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

  return {
    contentRef,
    onInput,
    onKeyDown
  }
}
