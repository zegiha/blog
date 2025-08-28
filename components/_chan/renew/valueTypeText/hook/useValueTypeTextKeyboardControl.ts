'use client'

import changeTargetBlockTypeToNewType from '@/components/_chan/renew/()/helper/changeTargetBlockTypeToNewType'
import {
  getTextLength,
} from '@/components/_chan/renew/valueTypeText/helper/useValueTypeTextKeyboardControl'
import {IValueTypeText} from '@/components/_chan/renew/valueTypeText/type'
import {useCallback} from 'react'
import addNewBlock from '@/components/_chan/renew/()/helper/addNewBlock'
import deleteTargetBlock from '@/components/_chan/renew/()/helper/deleteTargetBlock'
import {getCaretVisualLineIndex} from "@/components/_chan/renew/valueTypeText/helper/getCaretVisualLineIndex";

export default function useValueTypeTextKeyboardControl(
  ref: React.RefObject<HTMLDivElement | null>,
  {
    idx,
    type,
    value,
    setValue,
    focusNextText,
    focusPrevText,
    setAutoFocusIdx,
  }: IValueTypeText,
) {
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const enterToNewBlock = () => {

      if(e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()

        if(ref.current && e.nativeEvent.isComposing) {
          const ev = new Event('compositionend', {bubbles: true})
          ref.current.dispatchEvent(ev)
        } else {
          addNewBlock(idx, setAutoFocusIdx, setValue)
        }
      }
    }
    enterToNewBlock()

    const backspaceToDeleteBlock = () => {

      if(e.key === 'Backspace') {
        if(
          value.length === 1 &&
          value[0].content === ''
        ) {
          e.preventDefault()
          if(type === 'content')
            deleteTargetBlock(idx, setAutoFocusIdx, setValue)
          else
            changeTargetBlockTypeToNewType('content', idx, setValue, setAutoFocusIdx)
        }
      }
    }
    backspaceToDeleteBlock()

    const arrowControl = () => {
      const
        up = e.key === 'ArrowUp',
        down = e.key === 'ArrowDown',
        left = e.key === 'ArrowLeft',
        right = e.key === 'ArrowRight'

      if(!up && !down && !left && !right) return

      const sel = window.getSelection()
      if(sel === null || !ref.current) return

      const {lineCount, lineIndex: cursorY} = getCaretVisualLineIndex(ref.current)
      const cursorX = sel.focusOffset

      if(up || down) {
        if(up && cursorY === 0) {
          e.preventDefault()
          focusPrevText(idx, setAutoFocusIdx, {x: cursorX, y: cursorY})
        }
        else if(down && cursorY === lineCount - 1) {
          e.preventDefault()
          focusNextText(idx, setAutoFocusIdx, {x: cursorX, y: cursorY})
        }
      } else {
        const cursorNode = sel.focusNode

        if(cursorNode === null) return
        const focusNodeTextLength = getTextLength(cursorNode)

        if(left && cursorX === 0) {
          e.preventDefault()
          focusPrevText(idx, setAutoFocusIdx, {x: cursorX, y: cursorY})
        } else if(right && cursorX === focusNodeTextLength) {
          e.preventDefault()
          focusNextText(idx, setAutoFocusIdx, {x: cursorX, y: cursorY})
        }
      }
    }
    arrowControl()
  }, [idx, type, value])

  return {
    onKeyDown,
  }
}
