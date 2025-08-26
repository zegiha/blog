import {TNullableRenewMediaValue} from '@/components/_chan/renew/()/type'
import ImageControl from '@/components/_chan/renew/valueTypeMedia/media/imageControl/ImageControl'
import {IMedia} from '@/components/_chan/renew/valueTypeMedia/media/type'
import useMedia from '@/components/_chan/renew/valueTypeMedia/media/useMedia'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import EditableTypo from '@/components/atom/typo/editableTypo/EditableTypo'
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
    hover,
    ref,
    setRef,
    setAltRef,
    onAltInput,
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
        width={'fill-width'}
        style={{width: width}}
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
          onLoad={onLoad}
        />
        {mediaStatus === 'loading' && (
          <div className={style.loading}/>
        )}
        <EditableTypo.small
          ref={setAltRef}
          className={mediaStatus === 'loading' ? style.imageLoading : undefined}
          wrapperClassName={style.alt}
          color={'alternative'}
          textAlign={'center'}
          onInput={onAltInput}
          placeholder={'눌러서 이미지 설명 입력하기'}
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
