'use client'

import {IRenewTextValue} from '@/components/_chan/renew/()/type'
import {IValueTypeText} from '@/components/_chan/renew/valueTypeText/type'
import defaultLoader from 'next/dist/shared/lib/image-loader'
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

    console.log('useValueTypeText', value)

    const addTextStyleFromSpan = (nodes: NodeListOf<Node>): IRenewTextValue['value'] => {
      const res: IRenewTextValue['value'] = []
      nodes.forEach(v => {
        if(v.nodeType === Node.TEXT_NODE) {
          res.push({
            content: v.textContent ?? '',
          })
        } else if(v.nodeType === Node.ELEMENT_NODE) {
          const el = v as HTMLElement
          if(el.tagName === 'BR') {
            if(0 < res.length) res[res.length-1].content += '\n'
          } else if(el.tagName === 'SPAN' && el.textContent) {
            const v: {
              content: string
              color?: string
              accent?: boolean
              underline?: boolean
              italic?: boolean
            } = {
              content: el.textContent,
            }

            v.color = el.style.color
            v.accent = el.style.fontWeight === 'bold'
            v.underline = el.style.textDecoration === 'underline'
            v.italic = el.style.fontStyle === 'italic'
            res.push(v)
          }
        }
      })

      return res
    }

    const dataToHTML = (value: IRenewTextValue['value']) => {
      return value.map(v => {
        if(v === '\n') return '<br>'
        if(
          v.accent ||
          v.underline ||
          v.italic ||
          v.color
        ) {
          return `<span style="color: ${v.color}; font-weight: ${v.accent ? 'bold' : 'normal'}; text-decoration: ${v.underline ? 'underline' : 'none'}; font-style: ${v.italic ? 'italic' : 'normal'};">${v.content}</span>`
        }
        return v.content
      }).join('')
    }

    const newContentData: Array<{
      content: string
      color?: string
      accent?: boolean
      underline?: boolean
      italic?: boolean
    }> = addTextStyleFromSpan(ref.current.childNodes)

    const newHTMLData = dataToHTML(value)


    console.log({content: newContentData, html: newHTMLData, value: value})

    if(newHTMLData !== ref.current.innerHTML) {
      ref.current.innerHTML = newHTMLData
    }


    // const currentContent = htmlToPlain(ref.current.innerHTML)
    //
    // if(currentContent !== value.at(-1)?.content) {
    //   ref.current.innerHTML = plainToHtml(value?.at(-1)?.content ?? '')
    // }

    // console.log(value)
  }, [value]);

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