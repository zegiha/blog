import {IRenewMediaValue} from '@/components/_chan/renew/()/type'
import FadeInAndOut from '@/components/atom/fadeInAndOut/FadeInAndOut'
import Row from '@/components/atom/flex/Row'
import AlignHorizontalCenter from '@/components/atom/icon/AlignHorizontalCenter'
import AlignHorizontalLeft from '@/components/atom/icon/AlignHorizontalLeft'
import AlignHorizontalRight from '@/components/atom/icon/AlignHorizontalRight'
import PhotoAlt from '@/components/atom/icon/PhotoAlt'
import cn from 'classnames'
import {useEffect, useState} from 'react'
import style from './style.module.css'

export default function ImageControl({
  targetRef: ref,
  hover,
  position,
  changePosition
}: {
  targetRef: React.RefObject<HTMLDivElement | null>
  hover: boolean
  position: IRenewMediaValue['position']
  changePosition: (v: IRenewMediaValue['position']) => void
}) {
  const [direction, setDirection] = useState<'normal' | 'reverse' | null>(null)
  const [mouseDown, setMouseDown] = useState<boolean>(false)
  const [startMousePosition, setStartMousePosition] = useState<{x: number, y: number} | null>(null)
  const [startWidth, setStartWidth] = useState<number | null>(null)
  const [alignOptionOpen, setAlignOptionOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseDown || !ref.current || !startMousePosition || !startWidth) return

      const deltaX = e.clientX - startMousePosition.x
      const newWidth = startWidth - (direction === 'normal' ? deltaX : deltaX * -1)
      ref.current.style.width = `${Math.max(newWidth, 100)}px`
    }

    const handleMouseMoveClean = () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''

      setMouseDown(false)
      setStartWidth(null)
      setStartMousePosition(null)
    }

    document.body.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseup', handleMouseMoveClean)
    document.body.addEventListener('mouseleave', handleMouseMoveClean)
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseup', handleMouseMoveClean)
      document.body.removeEventListener('mouseleave', handleMouseMoveClean)
    }
  }, [mouseDown, direction, startMousePosition, startWidth])

  useEffect(() => {
    if(alignOptionOpen && (!hover && !mouseDown))
      setAlignOptionOpen(false)
  }, [hover, mouseDown, alignOptionOpen])

  return (
    <FadeInAndOut show={hover || mouseDown}>
      <div className={style.imageControl}>
        <div
          className={style.imageWidthControl}
          onMouseDown={(e) => {
            if(ref.current === null) return

            document.body.style.cursor = 'ew-resize'
            document.body.style.userSelect = 'none'

            setDirection('normal')
            setStartMousePosition({x: e.clientX, y: e.clientY})
            setStartWidth(ref.current.offsetWidth)
            setMouseDown(true)
          }}
          onMouseUp={() => {
            setMouseDown(false)
          }}
        />
        <div
          className={style.imageWidthControlPosRight}
          onMouseDown={(e) => {
            if(ref.current === null) return

            document.body.style.cursor = 'ew-resize'
            document.body.style.userSelect = 'none'

            setDirection('reverse')
            setStartMousePosition({x: e.clientX, y: e.clientY})
            setStartWidth(ref.current.offsetWidth)
            setMouseDown(true)
          }}
          onMouseUp={() => {
            setMouseDown(false)
          }}
        />
        <Row className={style.imageControlButtonGroup} gap={16}>
          <div className={style.imageAlignControlOptionWrapper}>
            <div className={style.imageControlButton} onClick={() => setAlignOptionOpen(!alignOptionOpen)}>
              <ActiveAlignIcon imageAlign={position}/>
            </div>
            {alignOptionOpen && (
              <Row className={style.imageAlignControlOption} gap={16}>
                <AlignHorizontalLeft
                  className={cn(
                    position === 'start' ?
                      style.imageControlActiveAlign:
                      style.imageControlAlign
                  )}
                  width={20}
                  height={20}
                  onClick={() => changePosition('start')}
                />
                <AlignHorizontalCenter
                  className={cn(
                    position === 'center' ?
                      style.imageControlActiveAlign:
                      style.imageControlAlign
                  )}
                  width={20}
                  height={20}
                  onClick={() => changePosition('center')}
                />
                <AlignHorizontalRight
                  className={cn(
                    position === 'end' ?
                      style.imageControlActiveAlign:
                      style.imageControlAlign
                  )}
                  width={20}
                  height={20}
                  onClick={() => {
                    changePosition('end')
                    console.log('hehe')
                  }}
                />
              </Row>
            )}
          </div>
          <div className={style.imageControlButton}>
            <PhotoAlt width={20} height={20}/>
          </div>
        </Row>
      </div>
    </FadeInAndOut>
  )
}

function ActiveAlignIcon({
                           imageAlign,
                         }: {
  imageAlign: 'start' | 'center' | 'end'
}) {
  switch(imageAlign) {
    case 'start': return <AlignHorizontalLeft width={20} height={20}/>
    case 'center': return <AlignHorizontalCenter width={20} height={20}/>
    case 'end': return <AlignHorizontalRight width={20} height={20}/>
  }
}