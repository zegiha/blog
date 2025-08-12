'use client'

import FadeInAndOut from '@/components/atom/fadeInAndOut/FadeInAndOut'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import TTextColor from '@/shared/design/text/TTextColor'
import TTextSize from '@/shared/design/text/TTextSize'
import getWidth from '@/shared/design/width/getWidth'
import TWidth from '@/shared/design/width/TWidth'
import {IUseDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/type'
import {useDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/useDragAndDrop'
import {Add, DragIndicator} from '@/shared/icon'
import cn from 'classnames'
import {KeyboardEventHandler, useCallback, useEffect, useRef, useState} from 'react'
import textSizeStyle from '@/shared/design/text/textSize.module.css'
import textWeightStyle from '@/shared/design/text/textWeight.module.css'
import textColorStyle from '@/shared/design/text/textColor.module.css'
import style from './style.module.css'

export default function EditableDiv({
  width,
  textSize,
  accent,
  color,
  placeholder: placeholderProps,
  showPlaceholderAlways = false,
  content,
  setContent,
  autoFocus = false,
  clearAutoFocus = () => {},
  controllable = true,
  allowLineBreak = true,
  dragProps,
  onDeleteBlock = () => {},
  onAddButtonClick = () => {
    throw new Error('onAddButtonClick is not defined when controllable is false')
  },
}: {
  width?: TWidth
  textSize?: TTextSize
  accent?: boolean
  color?: TTextColor
  placeholder?: string
  showPlaceholderAlways?: boolean
  content: string
  setContent: (newData: string) => void
  autoFocus?: boolean
  clearAutoFocus?: () => void
  controllable?: boolean
  allowLineBreak?: boolean
  dragProps?: IUseDragAndDrop
  onDeleteBlock?: () => void
  onAddButtonClick?: () => void
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isControllable = controllable && !(textSize || accent || color)

  const contentRef = useRef<HTMLDivElement | null>(null)
  const [isContentFocus, setIsContentFocus] = useState<boolean>(false)

  const [showControlSection, setShowControlSection] = useState<boolean>(false)

  const placeholder = placeholderProps === '\default' ? '내용 입력하기, /로 명령어 입력하기' : placeholderProps

  const onInput = () => {
    if(!contentRef.current) return
    const newValue = contentRef.current.innerHTML === '<br>' ? '' : contentRef.current.innerHTML
    setContent(newValue)
  }

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback((e) => {
    const enterToNewBlock = () => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        onAddButtonClick()
      }
    }
    enterToNewBlock()

    const disallowLineBreak = () => {
      if (e.key === 'Enter' && e.shiftKey) {
        if (allowLineBreak) {
          // TODO
        } else {
          e.preventDefault()
        }
      }
    }
    disallowLineBreak()

    const deleteBlock = () => {
      if(content === '' && e.key === 'Backspace')
        onDeleteBlock()
    }
    deleteBlock()
  }, [content])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const enter = () => setShowControlSection(true)
    const leave = () => setShowControlSection(false)

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)

    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])

  useEffect(() => {
    if(!contentRef.current) return
    const current = contentRef.current.innerHTML ?? ''
    if(current !== content) {
      contentRef.current.innerHTML = content
    }
  }, [content]);

  const {
    ref,
    onTargetMouseDown,
  } = useDragAndDrop(dragProps)

  useEffect(() => {
    if(!contentRef.current) return
    if(autoFocus) {
      contentRef.current.focus()

      const t = window.setTimeout(() => {
        if(contentRef.current) {
          const range = document.createRange()
          const selection = window.getSelection()

          range.selectNodeContents(contentRef.current)
          range.collapse(false)

          selection?.removeAllRanges()
          selection?.addRange(range)
        }
      }, 0)

      return () => {
        window.clearTimeout(t)
      }
    }
  }, [autoFocus]);

  return (
    <Col ref={(el) => {
      ref.current = el
      containerRef.current = el
    }} gap={2} width={'fill-flex'}>
      <div ref={containerRef} className={style.container} style={getWidth(width)}>
        <div
          className={cn(
            textSize && textSizeStyle[textSize],
            accent && textWeightStyle.weightAccent,
            color && textColorStyle[color],
            style.content,
          )}
          ref={contentRef}
          autoFocus={autoFocus}
          onKeyDown={onKeyDown}
          contentEditable
          onInput={onInput}
          onFocus={() => {
            setIsContentFocus(true)
          }}
          onBlur={() => {
            if(autoFocus)
              clearAutoFocus()
            setIsContentFocus(false)
          }}
        />
        {content.trim() === '' && (
          showPlaceholderAlways || isContentFocus
        ) && (
          <div
            className={cn(
              textSize && textSizeStyle[textSize],
              style.placeholder,
              accent && textWeightStyle.weightAccent,
            )}
          >
            {placeholder}
          </div>
        )}
        {isControllable && <ControlSection
          showControlSection={showControlSection}
          onDragButtonDown={onTargetMouseDown}
          onAddButtonClick={onAddButtonClick}
        />}
      </div>
    </Col>
  )
}

function ControlSection({
                          showControlSection,
                          onDragButtonDown,
                          onAddButtonClick,
                        }: {
  showControlSection: boolean
  onDragButtonDown: (e: React.MouseEvent) => void
  onAddButtonClick: () => void
}) {
  return (
    <FadeInAndOut show={showControlSection}>
      <Row className={style.controllSection} width={'hug'}>
        <div
          className={cn(style.controlButton, style.controlButtonAdd)}
          onClick={onAddButtonClick}
        >
          <Add width={20} height={20} />
        </div>
        <div
          className={cn(style.controlButton, style.controlButtonDragIndicator)}
          onMouseDown={onDragButtonDown}
        >
          <DragIndicator width={20} height={20} />
        </div>
        <div className={style.controllSectionHoverArea} />
      </Row>
    </FadeInAndOut>
  )
}