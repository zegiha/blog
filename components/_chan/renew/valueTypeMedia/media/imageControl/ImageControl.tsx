import AlignIconButton from '@/components/_chan/renew/valueTypeMedia/media/imageControl/AlignIconButton/AlignIconButton'
import {IImageControl} from '@/components/_chan/renew/valueTypeMedia/media/imageControl/type'
import useImageControl from '@/components/_chan/renew/valueTypeMedia/media/imageControl/useImageControl'
import FadeInAndOut from '@/components/atom/fadeInAndOut/FadeInAndOut'
import Row from '@/components/atom/flex/Row'
import style from './style.module.css'

export default function ImageControl(props: IImageControl) {
  const {
    hover,
    position,
    changeValue,
  } = props

  const {
    mouseDown,
    widthControlOnMouseDown,
    widthControlRightOnMouseDown,
    widthControlBothOnMouseUp,
  } = useImageControl(props)

  return (
    <FadeInAndOut show={hover || mouseDown}>
      <div className={style.imageControl}>
        <div
          className={style.imageWidthControl}
          onMouseDown={widthControlOnMouseDown}
          onMouseUp={widthControlBothOnMouseUp}
        />
        <div
          className={style.imageWidthControlPosRight}
          onMouseDown={widthControlRightOnMouseDown}
          onMouseUp={widthControlBothOnMouseUp}
        />
        <Row className={style.imageControlButtonGroup} gap={16}>
          <AlignIconButton isActive={position === 'start'} changePosition={(v) => changeValue({position: v})} imageAlign={'start'}/>
          <AlignIconButton isActive={position === 'center'} changePosition={(v) => changeValue({position: v})} imageAlign={'center'}/>
          <AlignIconButton isActive={position === 'end'} changePosition={(v) => changeValue({position: v})} imageAlign={'end'}/>
        </Row>
      </div>
    </FadeInAndOut>
  )
}
