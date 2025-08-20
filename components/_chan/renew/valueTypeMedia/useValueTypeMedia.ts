import {renewDefaultMediaData} from '@/components/_chan/renew/()/const'
import addNewBlock from '@/components/_chan/renew/()/helper/addNewBlock'
import {IRenew, IRenewMediaValue, TNullableRenewMediaValue} from '@/components/_chan/renew/()/type'
import {changeTargetIdxMediaValue} from '@/components/_chan/renew/valueTypeMedia/helper'
import {useEffect, useState} from 'react'

export default function useValueTypeMedia(props: IRenew) {
  if(props.type !== 'image')
    throw new Error('useValueTypeMedia: type must be image')
  const {
    idx,
    setAutoFocusIdx,
    setValue,
  } = props

  const [media, setMedia] = useState<File | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(props.src);

  useEffect(() => {
    setPrevUrl(props.src)
  }, [props.src])

  const handleFileInput = (e: React.InputEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      Array.from(target.files).forEach((v, i) => {
        if(i === 0) {
          changeTargetIdxMediaValue(
            idx,
            setValue,
            {src: URL.createObjectURL(v)}
          )
          setPrevUrl(URL.createObjectURL(v))
        } else {
          addNewBlock(idx + (i - 1), setAutoFocusIdx, setValue, {
            ...renewDefaultMediaData,
            src: URL.createObjectURL(v),
          })
        }
      })
    }
  }

  const handleInputSubmit = (url: string) => {
    const proxyedUrl = `/api/proxy?url=${encodeURIComponent(url)}`
    changeTargetIdxMediaValue(idx, setValue, {src: proxyedUrl})
    setPrevUrl(proxyedUrl)
  }

  const mediaSetValue = (newValue: TNullableRenewMediaValue): void => {
    changeTargetIdxMediaValue(idx, setValue, newValue)
  }

  return {
    prevUrl,
    handleFileInput,
    handleInputSubmit,
    mediaSetValue,
  }
}