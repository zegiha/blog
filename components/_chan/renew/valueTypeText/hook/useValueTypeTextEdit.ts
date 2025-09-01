'use client'

import {IRenewSuper, IRenewTextValue, TRenewTextValueStyle} from '@/components/_chan/renew/()/type'
import {SecureClientSessionOptions} from 'http2'
import {RefObject, useCallback, useEffect} from 'react'

export default function useValueTypeTextEdit(
  ref: RefObject<HTMLDivElement | null>,
  {
    idx,
    value,
    setValue,
  }: IRenewSuper & IRenewTextValue
) {

  // const addTest = () => {
  //
  //   const sel = window.getSelection()
  //
  //   if(!sel || sel.rangeCount === 0) return
  //
  //   const range = sel.getRangeAt(0)
  //   const startOffset = range.startOffset
  //   const endOffset = range.endOffset
  //
  //
  //   const getNewValue = (p: IRenewTextValue['value']): IRenewTextValue['value'] => {
  //     const newValue: IRenewTextValue['value'] = []
  //
  //     const allDataText = p.map(v => v.content).join('')
  //
  //
  //     if(0 < startOffset)
  //       newValue.push({
  //         content: allDataText.slice(0, startOffset)
  //       })
  //
  //
  //     if(startOffset < endOffset)
  //       newValue.push({
  //         content: allDataText.slice(startOffset, endOffset),
  //         accent: true
  //       })
  //
  //
  //     if(endOffset < allDataText.length)
  //       newValue.push({
  //         content: allDataText.slice(endOffset)
  //       })
  //
  //     console.log('useValueTypeTextEdit', newValue)
  //
  //     return newValue
  //   }
  //
  //   setValue(p => {
  //     const front = 0 < idx ? p.slice(0, idx) : []
  //     const back = idx + 1 < p.length ? p.slice(idx + 1) : []
  //
  //     return [
  //       ...front,
  //       {
  //         ...p[idx],
  //         value: [...getNewValue(p[idx].type !== 'image' ? p[idx].value : [])]
  //       },
  //       ...back
  //     ]
  //   })
  //
  //   sel.removeAllRanges()
  //   sel.addRange(range)
  // }

  useEffect(() => {
    const handleSelectChange = () => {



























      //
      //   const sel = window.getSelection()
      //
      //   if(!sel || !ref.current) return
      //
      //   const toggleStyle = (style: Exclude<keyof TRenewTextValueStyle, 'color'> | string) => {
      //     const sel = window.getSelection()
      //
      //     if(!sel || sel.rangeCount === 0) return
      //
      //     if(isAllApply(sel, style)) {
      //
      //     } else {
      //
      //     }
      //   }
      // }
      //
      // const isAllApply = (
      //   sel: Selection,
      //   style: Exclude<keyof TRenewTextValueStyle, 'color'> | string,
      // ) => {
      //   const textNodes: Array<Node> = []
      //   const range = sel.getRangeAt(0)
      //
      //   const iterator = document.createNodeIterator(
      //     range.commonAncestorContainer,
      //     NodeFilter.SHOW_TEXT,
      //     {acceptNode: (node) => {
      //         const nodeRange = document.createRange()
      //         nodeRange.selectNode(node)
      //
      //         return range.intersectsNode(node)
      //           ? NodeFilter.FILTER_ACCEPT
      //           : NodeFilter.FILTER_REJECT
      //       }}
      //   )
      //
      //   let currentNode
      //   while((currentNode = iterator.nextNode())) {
      //     textNodes.push(currentNode)
      //   }
      //
      //   return textNodes.every(node => {
      //     const parent = node.parentElement
      //
      //     const hasCorrectStyle = () => {
      //       if(!parent) return false
      //       switch(style) {
      //         case 'accent':
      //           return parent.style.fontWeight === 'var(--typo-font-weight-accent)'
      //         case 'italic':
      //           return parent.style.fontStyle === 'italic'
      //         case 'underline':
      //           return parent.style.textDecoration === 'underline'
      //         default:
      //           return parent.style.color === style
      //       }
      //     }
      //
      //     return hasCorrectStyle()
      //   })
      // }
    }

    document.addEventListener('selectionchange', handleSelectChange)

    return () => {

      document.removeEventListener('selectionchange', handleSelectChange)
    }
  }, [value])

  return {
    addTest,
  }
}