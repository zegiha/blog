import getWidth from '@/shared/design/width/getWidth'
import useCallbackRef from '@/shared/hook/useCallbackRef'
import cn from 'classnames'
import {useEffect, useState} from 'react'
import style from './style.module.css'
import BaseTypo, {IBaseTypo} from '@/components/atom/typo/BaseTypo'

interface IEditableTypo extends Omit<IBaseTypo, 'type' | 'children' | 'contentEditable'> {
  placeholder?: string
  allowLineBreak?: boolean
  wrapperClassName?: string
  changeContent?: (content: string) => void
}

function createEditableTypo(type: IBaseTypo['type']) {

  return (props: IEditableTypo) => {
    const {ref: _, ...placeholderProps} = props

    const {
      ref,
      refDependency,
      setRef,
    } = useCallbackRef<HTMLElement>()

    const [content, setContent] = useState<string>('')

    useEffect(() => {
      if(!ref.current) return

      ref.current.addEventListener('keydown', e => {
        if(e.key === 'Enter') {
          if(!props.allowLineBreak)
            e.preventDefault()
        }
      })

      if(ref.current.innerText === '' || ref.current.innerText === '\n') {
        setContent('')
      } else {
        setContent(ref.current.innerText)
      }
    }, [refDependency]);

    return (
      <div className={cn(style.wrapper, props.wrapperClassName)} style={{...getWidth(props.width)}}>
        <BaseTypo
          {...props}
          ref={(el) => {
            setRef(el)
            if(typeof props.ref === 'function') {
              props.ref(el)
            } else if(props.ref && 'current' in props.ref) {
              props.ref.current = el
            }
          }}
          type={type}
          className={cn(style.content, props.className)}
          onInput={(e) => {
            if(ref.current) setContent(ref.current.innerText)
            if(props.changeContent) props.changeContent(ref.current?.innerText ?? '')
            if(props.onInput)props.onInput(e)
          }}
          contentEditable
        />
        {props.placeholder && (content === '' || content === '\n') && (
          <BaseTypo
            {...placeholderProps}
            type={type}
            className={cn(style.placeholder, props.className)}
            color={'alternative'}
          >
            {props.placeholder}
          </BaseTypo>
        )}
      </div>
    )
  }
}

const EditableTypo = {
  xxxlarge: createEditableTypo('xxxlarge'),
  xxlarge: createEditableTypo('xxlarge'),
  xlarge: createEditableTypo('xlarge'),
  large: createEditableTypo('large'),
  medium: createEditableTypo('medium'),
  small: createEditableTypo('small'),
  xsmall: createEditableTypo('xsmall'),
  xxsmall: createEditableTypo('xxsmall')
}

export default EditableTypo
