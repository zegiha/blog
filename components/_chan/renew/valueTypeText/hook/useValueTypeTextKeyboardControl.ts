'use client'

import changeTargetBlockTypeToNewType from '@/components/_chan/renew/()/helper/changeTargetBlockTypeToNewType'
import {
  getTextLength,
  moveCursor,
} from '@/components/_chan/renew/valueTypeText/helper/useValueTypeTextKeyboardControl'
import {IValueTypeText} from '@/components/_chan/renew/valueTypeText/type'
import {useCallback} from 'react'
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

    const arrowControl = () => {
      const
        up = e.key === 'ArrowUp',
        down = e.key === 'ArrowDown',
        left = e.key === 'ArrowLeft',
        right = e.key === 'ArrowRight'

      if(!up && !down && !left && !right) return

      const sel = window.getSelection()
      if(sel === null) return

      const changeAutoFocusIdx = (idx: number) => {
        setAutoFocusIdx(null)

        if(ref.current)
          ref.current.style.caretColor = 'transparent'

        return new Promise<void>((resolve) => {
          setTimeout(() => {
            setAutoFocusIdx(idx)
            resolve() // setTimeout 실행 완료 후 then으로 연결 가능
          }, 0)
        })
      }

      const cursorLocation = sel.focusOffset
      const el = sel.focusNode?.parentElement
      if(!el) return

      let lineIdx = 0, lineCount = 0
      el.childNodes.forEach((v) => {
        if(v.nodeType === Node.TEXT_NODE)
          lineCount++
        if(v === sel.focusNode)
          lineIdx = lineCount
      })

      if(up || down) {

        if(up && lineIdx <= 1) {
          e.preventDefault()
          changeAutoFocusIdx(idx - 1)
            .then(() => moveCursor('up', cursorLocation, () => {
              if(ref.current)
                ref.current.style.caretColor = 'auto'
            }))
        }
        else if(down && lineIdx === lineCount) {
          e.preventDefault()
          changeAutoFocusIdx(idx + 1)
            .then(() => moveCursor('down', cursorLocation, () => {
              if(ref.current)
                ref.current.style.caretColor = 'auto'
            }))
        }


      } else {
        const cursorNode = sel.focusNode

        if(cursorNode === null) return
        const focusNodeTextLength = getTextLength(cursorNode)

        if(left && cursorLocation === 0 && lineIdx <= 1) {
          e.preventDefault()
          changeAutoFocusIdx(idx - 1)
            .then(() => {
              moveCursor('up', 'end', () => {
                if(ref.current)
                  ref.current.style.caretColor = 'auto'
              })
            })
        } else if(right && cursorLocation === focusNodeTextLength && lineIdx === lineCount) {
          e.preventDefault()
          changeAutoFocusIdx(idx + 1)
            .then(() => moveCursor('down', 0, () => {
              if(ref.current)
                ref.current.style.caretColor = 'auto'
            }))
        }
      }
    }
    arrowControl()
  }, [idx, type, value])

  return {
    onKeyDown,
  }
}