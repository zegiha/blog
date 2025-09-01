import FadeInAndOut from '@/components/atom/fadeInAndOut/FadeInAndOut'
import Row from '@/components/atom/flex/Row'
import { Add, DragIndicator } from '@/components/atom/icon'
import cn from 'classnames'
import style from './style.module.css'
import {TArticleContentType} from "@/widget/article/create/[id]/bodySection/BodySection";

interface ControlSectionProps {
  showControlSection: boolean
  onDragButtonDown: (e: React.MouseEvent) => void
  onDragButtonRightDown: () => void
  onAddButtonClick: () => void
  contentType?: TArticleContentType
}

export default function ControlSection({
  showControlSection,
  onDragButtonDown,
  onDragButtonRightDown,
  onAddButtonClick,
  contentType,
}: ControlSectionProps) {
  return (
    <FadeInAndOut show={showControlSection}>
      <Row className={cn(style.controllSection, style[`${contentType}TopPosition`])} width={'hug'}>
        <div
          className={cn(style.controlButton, style.controlButtonAdd)}
          onClick={onAddButtonClick}
        >
          <Add fill={'var(--label-alternative)'} color={'var(--label-alternative)'} width={20} height={20}/>
        </div>
        <div
          className={cn(style.controlButton, style.controlButtonDragIndicator)}
          onMouseDown={(e) => {
            if(e.button !== 2) onDragButtonDown(e)
            else onDragButtonRightDown()
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <DragIndicator fill={'var(--label-alternative)'} color={'var(--label-alternative)'} width={20} height={20}/>
        </div>
        <div className={style.controllSectionHoverArea}/>
      </Row>
    </FadeInAndOut>
  )
}
