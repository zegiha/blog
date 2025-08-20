'use client'

import cn from 'classnames'
import textSizeStyle from '@/shared/design/text/textSize.module.css'
import textWeightStyle from '@/shared/design/text/textWeight.module.css'
import textColorStyle from '@/shared/design/text/textColor.module.css'
import style from './style.module.css'
import { useEditableText } from './hooks/useEditableText'
import { EditableDivProps } from './types'

interface EditableTextProps extends Pick<EditableDivProps, 
  'content' | 'setContent' | 'textSize' | 'accent' | 'color' | 
  'placeholder' | 'showPlaceholderAlways' | 'autoFocus' | 'contentType' | 'controllable' |
  'onContentTypeChange' | 'allowLineBreak' | 'onAddButtonClick' | 'onDeleteBlock' | 'clearAutoFocus'
> {
  optionModalOpen: boolean
  onOptionModalEntered: () => void
}

export default function EditableText(props: EditableTextProps) {
  const {
    content,
    textSize,
    accent,
    color,
    placeholder,
    showPlaceholderAlways = false,
    autoFocus = false
  } = props

  const { 
    contentRef, 
    focusRef, 
    isContentFocus, 
    onInput, 
    onKeyDown, 
    onFocus, 
    onBlur 
  } = useEditableText(props)

  return (
    <div className={style.contentAndPlaceholderWrapper}>
      <div
        className={cn(
          textSize && textSizeStyle[textSize],
          accent && textWeightStyle.weightAccent,
          color && textColorStyle[color],
          style.contentDefault,
        )}
        ref={(el) => {
          contentRef.current = el
          focusRef.current = el
        }}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        contentEditable
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {content.trim() === '' && (
        showPlaceholderAlways || isContentFocus
      ) && (
        <div
          className={cn(
            style.placeholder,
            textSize && textSizeStyle[textSize],
            accent && textWeightStyle.weightAccent,
          )}
        >
          {placeholder}
        </div>
      )}
    </div>
  )
}