import {renewDefaultMediaData} from '@/components/_chan/renew/()/const'
import addNewBlock from '@/components/_chan/renew/()/helper/addNewBlock'
import {IRenew, TNullableRenewMediaValue} from '@/components/_chan/renew/()/type'
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

  const [prevUrl, setPrevUrl] = useState<string | null>(props.src);

  useEffect(() => {
    setPrevUrl(props.src)
  }, [props.src])

  const handleFileInput = (e: React.InputEvent<HTMLInputElement>) => {
    const forAsync = async () => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        for (let i = 0; i < target.files.length; i++) {
          const v = target.files[i]!
          const body = new FormData()
          body.append('file', v)

          const res = await fetch('/api/image/upload', {
            method: 'POST',
            body
          })

          if(!res.ok) {
            console.error('useValueTypeMedia: failed to upload image')
            alert('다시시도찬')
            return
          }

          const url = (await res.json()).url

          if(i === 0) {
            changeTargetIdxMediaValue(
              idx,
              setValue,
              {src: url}
            )
            setPrevUrl(url)
          } else {
            addNewBlock(idx + (i - 1), setAutoFocusIdx, setValue, {
              ...renewDefaultMediaData,
              src: url,
            })
          }
        }
      }
    }

    forAsync()
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