'use client'

import {renewDefaultData} from '@/components/_chan/renew/()/const'
import {IRenewMediaValue, IRenewTextValue} from '@/components/_chan/renew/()/type'
import {useEffect, useRef, useState} from 'react'

export default function useBodySection() {
  const [data, setData] = useState<
    Array<
      IRenewTextValue |
      IRenewMediaValue
    >
  >([{...renewDefaultData}])
  // >(Array.from({length: 100}).map((_, i) => ({type: 'content', value: [{content: `${i + 1}`}]})))

  useEffect(() => {
    const endIdx = data.length - 1
    if(data[endIdx].type === 'image') {
      setData(p => [...p, {...renewDefaultData}])
    } else {
      if(
        data[endIdx].value.length !== 1 ||
        data[endIdx].value.at(0)?.content !== '' &&
        data[endIdx].value.at(0)?.content !== '\n'
      ) {
        setData(p => [...p, {...renewDefaultData}])
      }
    }
  }, [data]);

  const ref = useRef<HTMLDivElement | null>(null)
  const [autoFocus, setAutoFocus] = useState<number | null>(0)

  // const [focus, setFocus] = useState<number | null>(null)

  // useEffect(() => {
    // if(!ref.current || focus === null) return


    // const getFirstTextNode = (node: Node | null): Text | null => {
    //   if(!node) return null
    //   if(node.nodeType === Node.TEXT_NODE) return node as Text
    //   const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null)
    //   return walker.nextNode() as Text | null
    // }

    // const handleKeyDown = (e: KeyboardEvent) => {
    //   if(!ref.current || focus === null) return
    //
    //   const isTab = e.key === 'Tab'
    //   const isShift = e.shiftKey
    //   const isArrowUp = e.key === 'ArrowUp'
    //   const isArrowDown = e.key === 'ArrowDown'
    //
    //   if(!isTab && !isArrowUp && !isArrowDown) return
    //
    //   e.preventDefault()
    //
    //   const selection = window.getSelection()
    //   const range = document.createRange()
    //
    //   if(!selection) {
    //     console.error('Selection is not available')
    //     return
    //   }
    //
    //   const prevFocusOffset = selection.focusOffset
    //
    //   let nextIdx: number
    //
    //   setAutoFocus(p => {
    //     const isDown = (isTab && !isShift) || isArrowDown
    //
    //     nextIdx = p ?? focus
    //
    //     if(isDown) {
    //       if(data.length - 1 !== nextIdx)
    //         nextIdx++
    //     } else {
    //       if(nextIdx !== 0)
    //         nextIdx--
    //     }
    //
    //     return nextIdx
    //   })

      // requestAnimationFrame(() => {
      //   const container = ref.current
      //   if(!container) return
      //
      //   const currentFocusNode = container.childNodes[nextIdx]
      //
      //   // 텍스트 노드를 찾아 해당 오프셋으로 커서 이동
      //   const textNode = getFirstTextNode(currentFocusNode)
      //   if(textNode) {
      //     const maxLen = textNode.nodeValue?.length ?? 0
      //     const clamped = Math.max(0, Math.min(prevFocusOffset, maxLen))
      //     try {
      //       range.setStart(textNode, clamped)
      //       range.collapse(true)
      //       selection.removeAllRanges()
      //       selection.addRange(range)
      //     } catch {
      //       // 폴백: 내용 전체 선택 후 끝으로
      //       range.selectNodeContents(currentFocusNode)
      //       range.collapse(false)
      //       selection.removeAllRanges()
      //       selection.addRange(range)
      //     }
      //   } else {
      //     // 텍스트 노드가 없으면 내용 전체로 이동 후 prevFocusOffset에 가깝게 배치
      //     try {
      //       range.selectNodeContents(currentFocusNode)
      //       // prevFocusOffset을 반영하려면 보통 시작/끝 중 하나로 배치
      //       // 여기서는 끝으로 collapse
      //       range.collapse(false)
      //       selection.removeAllRanges()
      //       selection.addRange(range)
      //     } catch {
      //       // 아무 것도 할 수 없으면 무시
      //     }
      //   }
      // })
    // }

    // ref.current.addEventListener('keydown', handleKeyDown)
    // return () => {
    //   ref.current?.removeEventListener('keydown', handleKeyDown)
    // }
  // }, [data.length, focus, autoFocus]);

  return {
    ref,
    autoFocus,
    setAutoFocus,
    data,
    setData,
    // setFocus,
  }
}