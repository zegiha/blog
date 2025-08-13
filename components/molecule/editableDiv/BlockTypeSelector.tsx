import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import Typo from '@/components/atom/typo/Typo'
import cn from 'classnames'
import interactionStyle from '@/shared/design/interaction/interaction.module.css'
import style from './style.module.css'
import { textTypeEl } from './textTypeEl'
import {TArticleContentType} from "@/widget/article/create/bodySection/BodySection";
import {useEffect} from "react";

interface BlockTypeSelectorProps {
  optionData: Array<TArticleContentType>
  onContentTypeChange: (type: TArticleContentType) => void
}

export default function BlockTypeSelector({ optionData, onContentTypeChange }: BlockTypeSelectorProps) {

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isTab = e.key === 'Tab'
    const isShift = e.shiftKey
    const isUpArrow = e.key === 'ArrowUp'
    const isDownArrow = e.key === 'ArrowDown'

    if (isTab || isUpArrow || isDownArrow) {
      e.preventDefault() // 기본 Tab 동작 방지

      const currentElement = e.target as HTMLElement
      const container = e.currentTarget
      const focusableElements = container.querySelectorAll('[tabindex="0"]')
      const currentIndex = Array.from(focusableElements).indexOf(currentElement)

      let nextIndex

      const isBack = (isTab && isShift) || isUpArrow

      if (isBack) {
        // Shift + Tab: 이전 요소로
        nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
      } else {
        // Tab: 다음 요소로
        nextIndex = currentIndex === focusableElements.length - 1 ? 0 : currentIndex + 1
      }

      (focusableElements[nextIndex] as HTMLElement).focus()
    }
  }

  // useEffect(() => {
  //   const firstElement = document.querySelector('[tabindex="0"]') as HTMLElement;
  //   if (firstElement) {
  //     firstElement.focus();
  //   }
  // }, []);

  return (
    <Col
      width={'fill-flex'}
      className={style.textTypeList}
      onKeyDown={handleKeyDown}
    >
      {optionData.map((v, i) => (
        <Row
          key={i}
          className={cn(
            interactionStyle.interaction,
            style.textTypeItem
          )}
          gap={6}
          alignItems={'center'}
          tabIndex={0} // 각 아이템이 포커스 가능하도록
          onClick={() => {
            onContentTypeChange(v)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onContentTypeChange(v)
            }
          }}
        >
          {textTypeEl[v].icon}
          <Typo.medium>
            {textTypeEl[v].label}
          </Typo.medium>
        </Row>
      ))}
      {optionData.length === 0 && (
        <Row width={'fill-width'} className={style.textTypeEmpty}>
          <Typo.medium width={'fill-width'}>
            별도의 블록을 찾지 못했어요
          </Typo.medium>
        </Row>
      )}
    </Col>
  )
}
