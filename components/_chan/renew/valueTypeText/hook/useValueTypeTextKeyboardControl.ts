'use client'

import changeTargetBlockTypeToNewType from '@/components/_chan/renew/()/helper/changeTargetBlockTypeToNewType'
import {IValueTypeText} from '@/components/_chan/renew/valueTypeText/type'
import {useEffect, useCallback} from 'react'
import addNewBlock from '@/components/_chan/renew/()/helper/addNewBlock'
import deleteTargetBlock from '@/components/_chan/renew/()/helper/deleteTargetBlock'

export default function useValueTypeTextKeyboardControl(
  ref: React.RefObject<HTMLDivElement | null>,
  {
    idx,
    type,
    value,
    setValue,
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
  }, [idx, type, value])

  return {
    onKeyDown,
  }
}