import RenewWrapper from '@/components/_chan/renew/()/renewWrapper/RenewWrapper'
import useRenewWrapper from '@/components/_chan/renew/()/renewWrapper/useRenewWrapper'
import {IRenewMediaValue, IRenewSuper} from '@/components/_chan/renew/()/type'
import Media from '@/components/_chan/renew/valueTypeMedia/media/Media'
import MediaInput from '@/components/_chan/renew/valueTypeMedia/mediaInput/MediaInput'
import useValueTypeMedia from '@/components/_chan/renew/valueTypeMedia/useValueTypeMedia'

export default function ValueTypeMedia(props: IRenewSuper & IRenewMediaValue) {
  if(props.type !== 'image')
    throw new Error('useValueTypeMedia: type must be image')
  const hookValue = useRenewWrapper(props.useDragAndDropParam)

  const {
    prevUrl,
    handleFileInput,
    handleInputSubmit,
    mediaSetValue
  } = useValueTypeMedia(props)

  return (
    <RenewWrapper
      {...props}
      hookValue={hookValue}
    >
      {!prevUrl ? (
        <MediaInput
          handleFileInput={handleFileInput}
          handleInputSubmit={handleInputSubmit}
        />
      ) : (
        <Media
          type={'image'}
          url={prevUrl}
          position={props.position}
          width={props.width}
          alt={props.alt}
          setValue={mediaSetValue}
        />
      )}
    </RenewWrapper>
  )
}
