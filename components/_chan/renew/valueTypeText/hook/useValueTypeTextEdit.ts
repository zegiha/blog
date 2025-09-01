'use client'

import {IRenewSuper, IRenewTextValue, TRenewTextValueStyle} from '@/components/_chan/renew/()/type'
import {RefObject, useCallback, useEffect, useState} from 'react'

export default function useValueTypeTextEdit(
  ref: RefObject<HTMLDivElement | null>,
  {
    idx,
    value,
    setValue,
  }: IRenewSuper & IRenewTextValue
) {
  const [selectedRange, setSelectedRange] = useState<Range | null>(null)
  const [hasSelection, setHasSelection] = useState(false)

  // 스타일 상태 타입 정의
  type StyleState = 'all' | 'partial' | 'none'

  // 선택된 텍스트 범위의 문자 위치를 계산하는 함수
  const getTextPosition = useCallback((container: Node, targetNode: Node, offset: number): number => {
    let position = 0
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    )

    let node
    while ((node = walker.nextNode())) {
      if (node === targetNode) {
        return position + offset
      }
      position += node.textContent?.length || 0
    }
    return position
  }, [])

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

  // 선택된 텍스트의 스타일 상태를 분석하는 함수
  const getSelectionStyleState = useCallback((styleType: keyof TRenewTextValueStyle, styleValue?: string): StyleState => {
    if (!selectedRange) return 'none'

    const container = ref.current
    if (!container) return 'none'

    const startPos = getTextPosition(container, selectedRange.startContainer, selectedRange.startOffset)
    const endPos = getTextPosition(container, selectedRange.endContainer, selectedRange.endOffset)

    if (startPos === endPos) return 'none'

    // 선택 범위에 해당하는 텍스트 조각들을 수집
    const selectedFragments: Array<{
      content: string
      hasStyle: boolean
    }> = []

    let currentPos = 0
    for (const item of value) {
      const itemEnd = currentPos + item.content.length

      if (itemEnd <= startPos || currentPos >= endPos) {
        // 선택 범위 밖
        currentPos = itemEnd
        continue
      }

      // 선택 범위와 겹치는 부분 계산
      const selectedStart = Math.max(0, startPos - currentPos)
      const selectedEnd = Math.min(item.content.length, endPos - currentPos)
      const selectedText = item.content.slice(selectedStart, selectedEnd)

      if (selectedText) {
        let hasStyle = false
        
        if (styleType === 'color') {
          // 색상의 경우 특정 색상과 일치하는지 확인 (styleValue가 주어진 경우)
          if (styleValue !== undefined) {
            hasStyle = item.color === styleValue
          } else {
            // styleValue가 없으면 색상이 설정되어 있는지만 확인
            hasStyle = Boolean(item.color)
          }
        } else {
          // 다른 스타일들 (accent, italic, underline)
          hasStyle = Boolean(item[styleType])
        }

        selectedFragments.push({
          content: selectedText,
          hasStyle
        })
      }

      currentPos = itemEnd
    }

    if (selectedFragments.length === 0) return 'none'

    // 모든 조각이 스타일을 가지고 있는지 확인
    const allHaveStyle = selectedFragments.every(fragment => fragment.hasStyle)
    const noneHaveStyle = selectedFragments.every(fragment => !fragment.hasStyle)

    if (allHaveStyle) return 'all'
    if (noneHaveStyle) return 'none'
    return 'partial'
  }, [selectedRange, value, ref])

  // 스타일 적용 함수 (스마트 적용/제거 로직)
  const applyStyle = useCallback((styleType: keyof TRenewTextValueStyle, styleValue?: string) => {
    if (!ref.current || !selectedRange) return

    const container = ref.current
    const startPos = getTextPosition(container, selectedRange.startContainer, selectedRange.startOffset)
    const endPos = getTextPosition(container, selectedRange.endContainer, selectedRange.endOffset)

    if (startPos === endPos) return // 선택된 텍스트가 없으면 리턴

    // 현재 선택 영역의 스타일 상태 확인
    const styleState = getSelectionStyleState(styleType, styleValue)
    
    // 새로운 value 배열 생성
    const newValue: IRenewTextValue['value'] = []
    
    let currentPos = 0
    for (const item of value) {
      const itemEnd = currentPos + item.content.length
      
      if (itemEnd <= startPos) {
        // 선택 영역 이전
        newValue.push(item)
      } else if (currentPos >= endPos) {
        // 선택 영역 이후
        newValue.push(item)
      } else {
        // 선택 영역과 겹치는 부분
        if (currentPos < startPos) {
          // 아이템 앞부분 (선택되지 않은 부분)
          newValue.push({
            ...item,
            content: item.content.slice(0, startPos - currentPos)
          })
        }
        
        // 선택된 부분
        const selectedStart = Math.max(0, startPos - currentPos)
        const selectedEnd = Math.min(item.content.length, endPos - currentPos)
        const selectedText = item.content.slice(selectedStart, selectedEnd)
        
        if (selectedText) {
          // 기존 코드: const newStyle: TRenewTextValueStyle = {...item}; delete newStyle.content
          // 수정 코드: 필요한 스타일 키만 명시적으로 구성
          const newStyle: TRenewTextValueStyle = {
            color: item.color,
            accent: item.accent,
            italic: item.italic,
            underline: item.underline,
          }

          // 스마트 스타일 적용 로직
          if (styleState === 'all') {
            // 모든 텍스트에 스타일이 적용되어 있으면 제거
            if (styleType === 'color') {
              newStyle.color = undefined // 색상 제거
            } else {
              newStyle[styleType] = false // 다른 스타일 제거
            }
          } else {
            // 'partial' 또는 'none'인 경우, 스타일이 없는 부분에만 적용
            let shouldApplyStyle = false

            if (styleType === 'color') {
              if (styleValue !== undefined) {
                // 특정 색상으로 변경하는 경우
                shouldApplyStyle = item.color !== styleValue
              } else {
                // 색상 적용 (현재 색상이 없는 경우만)
                shouldApplyStyle = !item.color
              }
            } else {
              // 다른 스타일들은 현재 적용되지 않은 경우만 적용
              shouldApplyStyle = !item[styleType]
            }

            if (shouldApplyStyle) {
              if (styleType === 'color') {
                newStyle.color = styleValue || '#000000' // 기본 색상
              } else {
                newStyle[styleType] = true
              }
            }
          }
          
          newValue.push({
            content: selectedText,
            ...newStyle
          })
        }
        
        if (endPos - currentPos < item.content.length) {
          // 아이템 뒷부분 (선택되지 않은 부분)
          newValue.push({
            ...item,
            content: item.content.slice(endPos - currentPos)
          })
        }
      }
      currentPos = itemEnd
    }

    // 병합된 결과로 setValue 업데이트
    const mergedValue = mergeConsecutiveStyles(newValue)
    setValue(prev => {
      const newItems = [...prev]
      newItems[idx] = {
        ...newItems[idx],
        value: mergedValue
      } as IRenewTextValue
      return newItems
    })

    // 커서 위치 복원 (텍스트 위치 기반)
    setTimeout(() => {
      if (!ref.current || !selectedRange) return
      
      const selection = window.getSelection()
      if (!selection) return

      // 이전 선택 범위의 텍스트 위치 계산
      const container = ref.current
      const endPos = getTextPosition(container, selectedRange.endContainer, selectedRange.endOffset)

      // 새로운 DOM에서 해당 위치에 커서 설정
      const setCaretAtPosition = (position: number) => {
        let currentPos = 0
        const walker = document.createTreeWalker(
          container,
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

      // 선택 영역이 있었다면 시작 위치에만 커서 설정
      if (!setCaretAtPosition(endPos)) {
        // 실패 시 컨테이너 끝으로 이동
        try {
          const range = document.createRange()
          range.selectNodeContents(container)
          range.collapse(false)
          selection.removeAllRanges()
          selection.addRange(range)
        } catch (e) {
          // 최후의 수단
          console.warn('Failed to restore cursor position')
        }
      }
    }, 0)

  }, [ref, selectedRange, value, setValue, idx, getSelectionStyleState, getTextPosition, mergeConsecutiveStyles])

  // 선택 변경 감지
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()
      if (!selection || !ref.current) {
        setSelectedRange(null)
        setHasSelection(false)
        return
      }

      if (selection.rangeCount === 0) {
        setSelectedRange(null)
        setHasSelection(false)
        return
      }

      const range = selection.getRangeAt(0)
      
      // 현재 편집 중인 div 내의 선택인지 확인
      if (!ref.current.contains(range.commonAncestorContainer)) {
        setSelectedRange(null)
        setHasSelection(false)
        return
      }

      // 선택된 텍스트가 있는지 확인
      if (range.collapsed) {
        setSelectedRange(null)
        setHasSelection(false)
        return
      }

      setSelectedRange(range.cloneRange())
      setHasSelection(true)
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [ref])

  // 현재 선택된 텍스트의 색상을 가져오는 함수
  const getSelectedColor = useCallback((): string | undefined => {
    if (!selectedRange) return undefined

    const container = ref.current
    if (!container) return undefined

    const startPos = getTextPosition(container, selectedRange.startContainer, selectedRange.startOffset)
    const endPos = getTextPosition(container, selectedRange.endContainer, selectedRange.endOffset)

    if (startPos === endPos) return undefined

    // 선택 범위의 첫 번째 색상을 반환
    let currentPos = 0
    for (const item of value) {
      const itemEnd = currentPos + item.content.length

      if (itemEnd <= startPos || currentPos >= endPos) {
        currentPos = itemEnd
        continue
      }

      // 선택 범위와 겹치는 첫 번째 아이템의 색상 반환
      return item.color
    }

    return undefined
  }, [selectedRange, value, ref, getTextPosition])

  // 스타일 토글 함수들
  const toggleAccent = useCallback(() => applyStyle('accent'), [applyStyle])
  const toggleItalic = useCallback(() => applyStyle('italic'), [applyStyle])
  const toggleUnderline = useCallback(() => applyStyle('underline'), [applyStyle])
  const changeColor = useCallback((color: string) => applyStyle('color', color), [applyStyle])

  return {
    hasSelection,
    selectedRange,
    getSelectedColor,
    toggleAccent,
    toggleItalic,
    toggleUnderline,
    changeColor,
  }
}