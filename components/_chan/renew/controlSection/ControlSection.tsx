import {getTopPositionDimensioinByContentType} from '@/components/_chan/renew/controlSection/helper'
import {IControlSection} from '@/components/_chan/renew/controlSection/type'
import FadeInAndOut from '@/components/atom/fadeInAndOut/FadeInAndOut'
import Row from '@/components/atom/flex/Row'
import {Add, DragIndicator} from '@/components/atom/icon'
import cn from 'classnames'
import {useEffect, useState, useRef} from 'react'
import style from './style.module.css'
import interactionStyle from '@/shared/design/interaction/interaction.module.css'

export default function ControlSection({
  show,
  contentType,
  onDragButtonDrag,
  onAddButtonClick,
}: IControlSection) {
  const [mouseDown, setMouseDown] = useState<boolean>(false)
  const [mouseMoved, setMouseMoved] = useState<boolean>(false)
  const mouseDownEventRef = useRef<React.MouseEvent | null>(null)

  useEffect(() => {
    const handleMouseUp = () => {
      setMouseDown(false)
      setMouseMoved(false)
      mouseDownEventRef.current = null
    }

    if(mouseDown)
      document.body.addEventListener('mouseup', handleMouseUp)

    if(mouseDown && mouseMoved && mouseDownEventRef.current !== null) {
      onDragButtonDrag(mouseDownEventRef.current)
    }

    return () => {
      document.body.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseDown, mouseMoved]);

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
          onMouseMove={() => {
            if(mouseDown) {
              setMouseMoved(true)
            }
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <DragIndicator width={20} height={20} fill={'var(--label-alternative)'}/>
        </button>
      </Row>
    </FadeInAndOut>
  )
}