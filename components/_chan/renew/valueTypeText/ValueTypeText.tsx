import RenewWrapper from '@/components/_chan/renew/()/renewWrapper/RenewWrapper'
import {IRenewSuper, IRenewTextValue} from '@/components/_chan/renew/()/type'
import useRenewWrapper from '@/components/_chan/renew/()/renewWrapper/useRenewWrapper'
import useValueTypeText from '@/components/_chan/renew/valueTypeText/hook/useValueTypeText'
import ValueTypeTextSibling from '@/components/_chan/renew/valueTypeText/valueTypeTextSibling/ValueTypeTextSibling'
import Row from '@/components/atom/flex/Row'
import {List} from '@/components/atom/icon'
import cn from 'classnames'
import {useRef} from 'react'
import style from './style.module.css'
import useValueTypeTextKeyboardControl from '@/components/_chan/renew/valueTypeText/hook/useValueTypeTextKeyboardControl'
import {memo} from 'react'

function ValueTypeText(props: IRenewSuper & IRenewTextValue) {
  const {
    idx,
    type: contentType,
  } = props

  const ref = useRef<HTMLDivElement | null>(null)

  const {
    focus,
    onInput,
    onPaste,
    content,
    onFocus,
    onBlur,
  } = useValueTypeText(ref, props)

  const {
    onKeyDown,
  } = useValueTypeTextKeyboardControl(ref, props)

  const hookValue = useRenewWrapper(props.useDragAndDropParam)

  return (
    <RenewWrapper
      {...props}
      hookValue={hookValue}
      sibling={
        <ValueTypeTextSibling
          {...props}
          {...hookValue}
        />
      }
    >
      {contentType === 'list' && <List
        color={'var(--label-normal)'}
        fill={'var(--label-normal)'}
        width={24}
        height={24}
      />}
      <Row className={style.container} width={'fill-width'}>
        <div
          ref={ref}
          className={cn(
            style.input,
            style[contentType]
          )}
          tabIndex={idx}
          contentEditable
          onInput={onInput}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {focus && content === '' && (
          <div className={cn(style.placeholder, style[contentType])} style={{color: 'var(--label-alternative)'}}>
            내용 입력하기, /로 명령어 입력하기
          </div>
        )}
      </Row>
    </RenewWrapper>
  )
}

export default memo(ValueTypeText, (prev, next) => (
  prev.idx === next.idx &&
    prev.type === next.type &&
    prev.value.length === next.value.length &&
    prev.value.every((item, i) => {
      const nextItem = next.value[i]
      return item.content === nextItem.content &&
        item.color === nextItem.color &&
        item.accent === nextItem.accent &&
        item.underline === nextItem.underline &&
        item.italic === nextItem.italic
    }) &&
    prev.autoFocus === next.autoFocus &&
    prev.useDragAndDropParam.targetIdx === next.useDragAndDropParam.targetIdx &&
    prev.useDragAndDropParam.isHoverAndPosition === next.useDragAndDropParam.isHoverAndPosition
))
