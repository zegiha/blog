import {getTopPositionDimensioinByContentType} from '@/components/_chan/renew/()/renewWrapper/controlSection/helper'
import {IControlSection} from '@/components/_chan/renew/()/renewWrapper/controlSection/type'
import FadeInAndOut from '@/components/atom/fadeInAndOut/FadeInAndOut'
import Row from '@/components/atom/flex/Row'
import {Add, DragIndicator} from '@/components/atom/icon'
import cn from 'classnames'
import {useEffect, useState, useRef} from 'react'
import style from './style.module.css'
import interactionStyle from '@/shared/design/interaction/interaction.module.css'
import {memo} from 'react'

function ControlSection({
  show,
  contentType,
  onDragButtonDrag,
  onAddButtonClick,
  onDragButtonClick,
}: IControlSection) {
  const [mouseDown, setMouseDown] = useState<boolean>(false)
  const [mouseMoved, setMouseMoved] = useState<boolean>(false)
  const mouseDownEventRef = useRef<React.MouseEvent | null>(null)

  useEffect(() => {
    if(mouseDown && mouseMoved && mouseDownEventRef.current !== null) {
      onDragButtonDrag(mouseDownEventRef.current)
    }
  }, [mouseDown, mouseMoved, onDragButtonDrag]);

  return (
    <FadeInAndOut show={show}>
      <Row
        className={style.container}
        style={{
          top: getTopPositionDimensioinByContentType(contentType)
        }}
      >
        <button
          type={'button'}
          className={cn(
            style.button,
            interactionStyle.interaction
          )}
          onClick={onAddButtonClick}
        >
          <Add width={20} height={20} fill={'var(--label-alternative)'}/>
        </button>
        <button
          type={'button'}
          className={cn(
            style.button,
            interactionStyle.interaction
          )}
          style={{cursor: mouseMoved ? 'grabbing' : undefined,}}
          onMouseDown={(e) => {
            if(e.button !== 2) {
              mouseDownEventRef.current = e
              setMouseDown(true)
            }
          }}
          onMouseMove={(e) => {
            if(!mouseDownEventRef.current) return

            const movedBeyond4px = Math.hypot(
              e.clientX - mouseDownEventRef.current.clientX,
              e.clientY - mouseDownEventRef.current.clientY
            ) >= 4

            if(mouseDown && movedBeyond4px) {
              setMouseMoved(true)
            }
          }}
          onMouseUp={() => {
            if(mouseDown && !mouseMoved) onDragButtonClick()

            setMouseDown(false)
            setMouseMoved(false)
            mouseDownEventRef.current = null
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <DragIndicator width={20} height={20} fill={'var(--label-alternative)'}/>
        </button>
      </Row>
    </FadeInAndOut>
  )
}

export default memo(ControlSection, (prev, next) => (
  prev.show === next.show &&
    prev.contentType === next.contentType &&
    prev.idx === next.idx
))
