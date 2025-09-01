import RenewWrapper from '@/components/_chan/renew/()/renewWrapper/RenewWrapper'
import {IRenewSuper, IRenewTextValue} from '@/components/_chan/renew/()/type'
import useRenewWrapper from '@/components/_chan/renew/()/renewWrapper/useRenewWrapper'
import useValueTypeText from '@/components/_chan/renew/valueTypeText/hook/useValueTypeText'
import useValueTypeTextEdit from '@/components/_chan/renew/valueTypeText/hook/useValueTypeTextEdit'
import ValueTypeTextSibling from '@/components/_chan/renew/valueTypeText/valueTypeTextSibling/ValueTypeTextSibling'
import Row from '@/components/atom/flex/Row'
import {List} from '@/components/atom/icon'
import cn from 'classnames'
import {useRef} from 'react'
import style from './style.module.css'
import useValueTypeTextKeyboardControl from '@/components/_chan/renew/valueTypeText/hook/useValueTypeTextKeyboardControl'

export default function ValueTypeText(props: IRenewSuper & IRenewTextValue) {
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
    addTest
  } = useValueTypeTextEdit(ref, props)

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
        <div onClick={addTest} style={{width: 300, height: 300, background: 'red'}}>
        </div>
      </Row>
    </RenewWrapper>
  )
}
