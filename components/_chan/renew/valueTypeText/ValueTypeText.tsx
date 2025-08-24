import {RenewWrapper} from '@/components/_chan/renew/()/renewWrapper/RenewWrapper'
import {IRenew} from '@/components/_chan/renew/()/type'
import useRenewWrapper from '@/components/_chan/renew/()/renewWrapper/useRenewWrapper'
import useValueTypeText from '@/components/_chan/renew/valueTypeText/hook/useValueTypeText'
import ValueTypeTextSibling from '@/components/_chan/renew/valueTypeText/valueTypeTextSibling/ValueTypeTextSibling'
import Row from '@/components/atom/flex/Row'
import {List} from '@/components/atom/icon'
import cn from 'classnames'
import {useRef} from 'react'
import style from './style.module.css'
import useValueTypeTextKeyboardControl from '@/components/_chan/renew/valueTypeText/hook/useValueTypeTextKeyboardControl'

export default function ValueTypeText(props: IRenew) {
  if(props.type === 'image') return null

  const {
    type: contentType,
  } = props

  const ref = useRef<HTMLDivElement | null>(null)

  const {
    onInput,
    content,
    onBlur
  } = useValueTypeText(ref, props)

  const {onKeyDown} = useValueTypeTextKeyboardControl(ref, props)

  const hookValue = useRenewWrapper(props)

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
          contentEditable
          onInput={onInput}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
        {content === '' && (
          <div className={cn(style.placeholder, style[contentType])} style={{color: 'var(--label-alternative)'}}>
            내용 입력하기, /로 명령어 입력하기
          </div>
        )}
      </Row>
    </RenewWrapper>
  )
}
