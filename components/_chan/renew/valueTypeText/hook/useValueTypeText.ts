'use client'

import {IValueTypeText} from '@/components/_chan/renew/valueTypeText/type'
import {useEffect, RefObject, useCallback} from 'react'
import {
  changeTargetIdxTextValueEndContent,
  htmlToPlain,
  plainToHtml
} from '@/components/_chan/renew/valueTypeText/helper'

export default function useValueTypeText(
  ref: RefObject<HTMLDivElement | null>,
  {
    idx,
    value,
    setValue,
    autoFocus,
    setAutoFocusIdx
  }: IValueTypeText
) {

  const onInput = () => {
    if(!ref.current) return;
    const newContent = htmlToPlain(ref.current.innerHTML)
    changeTargetIdxTextValueEndContent(idx, setValue, newContent)
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

  const onBlur = useCallback(() => {
    if(autoFocus) {
      setAutoFocusIdx(null)
    }
  }, [idx, autoFocus])

  return {
    onInput,
    content: value.at(-1)?.content,
    onBlur: onBlur,
  }
}