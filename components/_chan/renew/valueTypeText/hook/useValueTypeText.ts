'use client'

import {IValueTypeText} from '@/components/_chan/renew/valueTypeText/type'
import {useEffect, RefObject, useCallback, useState} from 'react'
import {
  changeTargetIdxTextValueEndContent,
  htmlToPlain,
  plainToHtml
} from '@/components/_chan/renew/valueTypeText/helper/htmlTextToPlainAndPlainToHTML'

export default function useValueTypeText(
  ref: RefObject<HTMLDivElement | null>,
  {
    idx,
    value,
    setValue,
    autoFocus,
    setAutoFocusIdx,
    // changeFocus,
  }: IValueTypeText
) {
  const [focus, setFocus] = useState<boolean>(false)

  const onInput = () => {
    if(!ref.current) return;
    const newContent = htmlToPlain(ref.current.innerHTML)
    changeTargetIdxTextValueEndContent(idx, setValue, newContent)
  }

  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()

    const text = e.clipboardData?.getData('text/plain')

    if (text) {
      const selection = window.getSelection()
      if (!selection?.rangeCount) return

      changeTargetIdxTextValueEndContent(idx, setValue, value.at(-1)?.content + text)

      selection.deleteFromDocument()
      selection.getRangeAt(0).insertNode(document.createTextNode(text))

      setTimeout(() => {
        const range = document.createRange()

        if(!ref.current) return

        range.selectNodeContents(ref.current)
        range.collapse(false)

        selection.removeAllRanges()
        selection.addRange(range)
      }, 0)
    }
  }

  useEffect(() => {
    if(!ref.current) return;

    const currentContent = htmlToPlain(ref.current.innerHTML)

    if(currentContent !== value.at(-1)?.content) {
      ref.current.innerHTML = plainToHtml(value?.at(-1)?.content ?? '')
    }
  }, [value.at(-1)?.content]);

  useEffect(() => {
    if(!ref.current) return

    if(autoFocus) {
      ref.current.focus()

      const range = document.createRange()
      const sel = window.getSelection()

      range.selectNodeContents(ref.current)
      range.collapse(false)

      sel?.removeAllRanges()
      sel?.addRange(range)
    }

  }, [autoFocus])

  const onFocus = useCallback(() => {
    setFocus(true)
  }, [idx, autoFocus])

  const onBlur = useCallback(() => {
    if(autoFocus) {
      setAutoFocusIdx(null)
    }
    setFocus(false)
  }, [idx, autoFocus])

  return {
    focus,
    onInput,
    onPaste,
    content: value.at(-1)?.content,
    onFocus,
    onBlur,
  }
}