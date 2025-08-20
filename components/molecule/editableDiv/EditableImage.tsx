import FadeInAndOut from '@/components/atom/fadeInAndOut/FadeInAndOut'
import Row from '@/components/atom/flex/Row'
import AlignHorizontalCenter from '@/components/atom/icon/AlignHorizontalCenter'
import AlignHorizontalLeft from '@/components/atom/icon/AlignHorizontalLeft'
import AlignHorizontalRight from '@/components/atom/icon/AlignHorizontalRight'
import Photo from '@/components/atom/icon/Photo'
import PhotoAlt from '@/components/atom/icon/PhotoAlt'
import Typo from '@/components/atom/typo/Typo'
import {EditableDivProps} from '@/components/molecule/editableDiv/types'
import useCallbackRef from '@/shared/hook/useCallbackRef'
import cn from 'classnames'
import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import style from './style.module.css'
import interactionStyle from '@/shared/design/interaction/interaction.module.css'

interface IEditableImage extends Pick<EditableDivProps,
  'content' | 'setContent'
> {

}

export default function EditableImage({
  content,
  setContent,
}: IEditableImage) {
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  const [imageAlign, setImageAlign] = useState<'start' | 'center' | 'end'>(
    'center'
  )

  const {ref, refDependency, setRef} = useCallbackRef<HTMLDivElement | null>()
  const [hover, setHover] = useState<boolean>(false)

  useEffect(() => {
    if(!ref.current) return

    const handleMouseEnter = () => {
      setHover(true)
    }
    const handleMouseLeave = () => {
      setHover(false)
    }
    ref.current.addEventListener('mouseenter', handleMouseEnter)
    ref.current.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      ref.current?.removeEventListener('mouseenter', handleMouseEnter)
      ref.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [refDependency]);

  if(image === null && imageUrl === '') return (
    <Row
      className={cn(
        style.imagePlaceholder,
        interactionStyle.interaction
      )}
      width={'fill-width'}
      gap={8}
      alignItems={'center'}
    >
      <Photo
        color={'var(--label-alternative)'}
        fill={'var(--label-alternative)'}
        width={24}
        height={24}
      />
      <Typo.medium color={'alternative'}>
        이미지 추가
      </Typo.medium>
      <input
        name="getImage"
        id="getImage"
        className={style.imageInput}
        type="file"
        accept={'image/*'}
        autoFocus={true}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          if (target.files && target.files.length > 0) {
            const file = target.files[0];
            setImage(file);
            setImageUrl(URL.createObjectURL(file));

            const imageUrl = URL.createObjectURL(file);
            setContent(imageUrl);
          }
        }}
      />
    </Row>
  )
  else return (
    <Row
      width={'fill-width'}
      justifyContent={imageAlign === 'center' ? 'center' : `flex-${imageAlign}`}
    >
      <Row ref={(el) => {setRef(el)}} className={style.imageWrapper}>
        <img
          className={style.image}
          src={imageUrl}
          alt="previewImage"
        />

        <ImageControl
          hover={hover}
          targetRef={ref}
          imageAlign={imageAlign}
          setImageAlign={setImageAlign}
        />
      </Row>
    </Row>
  )
}

function ImageControl({
  targetRef: ref,
  hover,
  imageAlign,
  setImageAlign,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>
  hover: boolean
  imageAlign: 'start' | 'center' | 'end'
  setImageAlign: Dispatch<SetStateAction<'start' | 'center' | 'end'>>
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
              <ActiveAlignIcon imageAlign={imageAlign}/>
            </div>
            {alignOptionOpen && (
              <Row className={style.imageAlignControlOption} gap={16}>
                <AlignHorizontalLeft
                  className={cn(
                    imageAlign === 'start' ?
                      style.imageControlActiveAlign:
                      style.imageControlAlign
                  )}
                  width={20}
                  height={20}
                  onClick={() => setImageAlign('start')}
                />
                <AlignHorizontalCenter
                  className={cn(
                    imageAlign === 'center' ?
                      style.imageControlActiveAlign:
                      style.imageControlAlign
                  )}
                  width={20}
                  height={20}
                  onClick={() => setImageAlign('center')}
                />
                <AlignHorizontalRight
                  className={cn(
                    imageAlign === 'end' ?
                      style.imageControlActiveAlign:
                      style.imageControlAlign
                  )}
                  width={20}
                  height={20}
                  onClick={() => setImageAlign('end')}
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