import {IRenewMediaValue} from '@/components/_chan/renew/()/type'
import ImageControl from '@/components/_chan/renew/valueTypeMedia/media/ImageControl'
import {IMedia} from '@/components/_chan/renew/valueTypeMedia/media/type'
import useMedia from '@/components/_chan/renew/valueTypeMedia/media/useMedia'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import Typo from '@/components/atom/typo/Typo'
import cn from 'classnames'
import style from './style.module.css'

export default function Media(props: IMedia) {
  const {
    position,
    url,
    alt,
    setValue,
  } = props

  const {
    mediaStatus,
    onLoad,
    hover,
    ref,
    setRef
  } = useMedia(props)

  return (
    <Row
      width={'fill-width'}
      justifyContent={position}
    >
      <Col
        ref={(el) => {
          if(mediaStatus === 'loaded') {
            setRef(el)
          }
        }}
        className={style.wrapper}
        width={mediaStatus === 'loading' ? 'fill-width' : undefined}
        gap={2}
      >
        <img
          className={cn(
            mediaStatus === 'loaded' && style.image,
            mediaStatus === 'loading' && style.imageLoading,
          )}
          src={url}
          alt={alt ?? 'article image'}
          onLoad={onLoad}
        />
        {mediaStatus === 'loading' && (
          <div className={style.loading}/>
        )}
        <Typo.small
          className={cn(mediaStatus === 'loading' && style.imageLoading)}
          textAlign={'center'}
          color={'alternative'}
        >
          {alt ?? '눌러서 이미지 설명 입력하기'}
        </Typo.small>
        <ImageControl
          hover={hover}
          targetRef={ref}
          position={position}
          changePosition={(v: IRenewMediaValue['position']) => {
            setValue({position: v})
          }}
        />
      </Col>
    </Row>
  )
}
