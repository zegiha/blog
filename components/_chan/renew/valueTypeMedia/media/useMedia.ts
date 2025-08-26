import {IMedia} from '@/components/_chan/renew/valueTypeMedia/media/type'
import useCallbackRef from '@/shared/hook/useCallbackRef'
import {useEffect, useState} from 'react'

export default function useMedia(
  props: IMedia
) {
  const [mediaStatus, setMediaStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle')

  const {ref, refDependency, setRef} = useCallbackRef<HTMLDivElement | null>()
  const [hover, setHover] = useState<boolean>(false)

  const {
    setValue,
  } = props

  const {
    ref: altRef,
    refDependency: altRefDependency,
    setRef: setAltRef,
  } = useCallbackRef<HTMLParagraphElement>()

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

  const onAltInput = () => {
    if(!altRef.current) return

    setValue({alt: altRef.current.innerText})
  }

  useEffect(() => {
    if(!altRef.current) return
    altRef.current.innerText = props.alt ?? ''
  }, [altRefDependency]);

  return {
    mediaStatus,
    onLoad: () => setMediaStatus('loaded'),
    hover,
    ref,
    setRef,
    setAltRef,
    onAltInput,
  }
}