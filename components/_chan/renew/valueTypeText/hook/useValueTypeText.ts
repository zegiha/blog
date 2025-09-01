'use client'

import {IRenewTextValue} from '@/components/_chan/renew/()/type'
import {IValueTypeText} from '@/components/_chan/renew/valueTypeText/type'
import {useEffect, RefObject, useCallback, useState} from 'react'
import {
  changeTargetIdxTextValueEndContent,
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

  // 연속된 같은 스타일의 텍스트를 병합하는 함수
  const mergeConsecutiveStyles = useCallback((value: IRenewTextValue['value']): IRenewTextValue['value'] => {
    if (value.length === 0) return value

    const merged: IRenewTextValue['value'] = []
    
    for (const item of value) {
      const lastItem = merged[merged.length - 1]
      
      // 이전 아이템과 스타일이 동일한지 확인
      if (lastItem && 
          lastItem.color === item.color &&
          lastItem.accent === item.accent &&
          lastItem.italic === item.italic &&
          lastItem.underline === item.underline) {
        // 스타일이 같으면 content만 병합
        lastItem.content += item.content
      } else {
        // 스타일이 다르면 새로운 아이템 추가
        merged.push({...item})
      }
    }
    
    return merged
  }, [])

  // DOM에서 스타일 정보를 추출하는 함수
  const addTextStyleFromSpan = useCallback((nodes: NodeListOf<Node>): IRenewTextValue['value'] => {
    const res: IRenewTextValue['value'] = []
    nodes.forEach(v => {
      if(v.nodeType === Node.TEXT_NODE) {
        const content = v.textContent ?? ''
        if(content) {
          res.push({
            content: content,
          })
        }
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

          v.color = el.style.color || undefined
          v.accent = el.style.fontWeight === 'var(--typo-font-weight-accent)' || el.style.fontWeight === 'bold'
          v.underline = el.style.textDecoration === 'underline'
          v.italic = el.style.fontStyle === 'italic'
          res.push(v)
        }
      }
    })

    // 빈 content 필터링 및 기본값 보장
    const filtered = res.filter(item => item.content.length > 0)
    return filtered.length > 0 ? filtered : [{ content: '' }]
  }, [])

  const onInput = useCallback(() => {
    if(!ref.current) return;
    
    // 현재 커서 위치 저장
    const selection = window.getSelection()
    let caretPosition = 0
    
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      if (ref.current.contains(range.startContainer)) {
        // 전체 텍스트에서 커서 위치 계산
        const walker = document.createTreeWalker(
          ref.current,
          NodeFilter.SHOW_TEXT,
          null
        )
        
        let currentPos = 0
        let node
        while ((node = walker.nextNode())) {
          if (node === range.startContainer) {
            caretPosition = currentPos + range.startOffset
            break
          }
          currentPos += node.textContent?.length || 0
        }
      }
    }
    
    // DOM에서 스타일 정보를 포함한 데이터를 추출
    const newContentData = addTextStyleFromSpan(ref.current.childNodes)
    
    // 병합 후 setValue 업데이트
    const mergedData = mergeConsecutiveStyles(newContentData)
    
    setValue(prev => {
      const front = 0 < idx ? prev.slice(0, idx) : []
      const back = idx + 1 < prev.length ? prev.slice(idx + 1) : []

      return [
        ...front,
        {
          ...prev[idx],
          value: mergedData
        } as IRenewTextValue,
        ...back
      ]
    })
    
    // 커서 위치 복원
    setTimeout(() => {
      if (!ref.current || !selection) return
      
      const setCaretAtPosition = (position: number) => {
        let currentPos = 0
        const walker = document.createTreeWalker(
          ref.current!,
          NodeFilter.SHOW_TEXT,
          null
        )

        let node
        while ((node = walker.nextNode())) {
          const nodeLength = node.textContent?.length || 0
          if (currentPos + nodeLength >= position) {
            try {
              const range = document.createRange()
              const offset = position - currentPos
              range.setStart(node, Math.min(offset, nodeLength))
              range.setEnd(node, Math.min(offset, nodeLength))
              
              selection.removeAllRanges()
              selection.addRange(range)
              return true
            } catch (e) {
              // 실패 시 계속 시도
            }
          }
          currentPos += nodeLength
        }
        return false
      }

      if (!setCaretAtPosition(caretPosition)) {
        // 실패 시 끝으로 이동
        try {
          const range = document.createRange()
          range.selectNodeContents(ref.current)
          range.collapse(false)
          selection.removeAllRanges()
          selection.addRange(range)
        } catch (e) {
          console.warn('Failed to restore cursor position in onInput')
        }
      }
    }, 0)
  }, [idx, setValue, addTextStyleFromSpan, mergeConsecutiveStyles])

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


    const dataToHTML = (value: IRenewTextValue['value']) => {
      // 먼저 연속된 같은 스타일을 병합
      const mergedValue = mergeConsecutiveStyles(value)
      
      return mergedValue.map(v => {
        if(v.content === '\n') return '<br>'
        if(
          v.accent ||
          v.underline ||
          v.italic ||
          v.color
        ) {
          const styles: string[] = []
          
          if (v.color) styles.push(`color: ${v.color}`)
          if (v.accent) styles.push('font-weight: var(--typo-font-weight-accent)')
          if (v.underline) styles.push('text-decoration: underline')
          if (v.italic) styles.push('font-style: italic')
          
          return `<span style="${styles.join('; ')}">${v.content}</span>`
        }
        return v.content
      }).join('')
    }


    const newHTMLData = dataToHTML(value)



    if(newHTMLData !== ref.current.innerHTML) {
      ref.current.innerHTML = newHTMLData
    }


    // const currentContent = htmlToPlain(ref.current.innerHTML)
    //
    // if(currentContent !== value.at(-1)?.content) {
    //   ref.current.innerHTML = plainToHtml(value?.at(-1)?.content ?? '')
    // }

    // console.log(value)
  }, [value, mergeConsecutiveStyles, addTextStyleFromSpan]);

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