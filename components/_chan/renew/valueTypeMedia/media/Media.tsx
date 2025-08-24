import {TNullableRenewMediaValue} from '@/components/_chan/renew/()/type'
import ImageControl from '@/components/_chan/renew/valueTypeMedia/media/imageControl/ImageControl'
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
    width,
    url,
    alt,
    setValue,
  } = props

  const {
    mediaStatus,
    onLoad,
    onLoadStart,
    hover,
    ref,
    setRef,
    setAltRef,
    onAltInput,
    onAltFocus,
    onAltBlur,
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
          style={{width: width}}
          src={url}
          alt={alt ?? 'article image'}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
        />
        {mediaStatus === 'loading' && (
          <div className={style.loading}/>
        )}
        <Typo.small
          ref={setAltRef}
          className={cn(
            mediaStatus === 'loading' && style.imageLoading,
            style.alt
          )}
          textAlign={'center'}
          color={'alternative'}
          onInput={onAltInput}
          onFocus={onAltFocus}
          onBlur={onAltBlur}
          contentEditable
        />
        <ImageControl
          hover={hover}
          targetRef={ref}
          position={position}
          changeValue={(v: TNullableRenewMediaValue) => {
            setValue(v)
          }}
        />
      </Col>
    </Row>
  )
}
