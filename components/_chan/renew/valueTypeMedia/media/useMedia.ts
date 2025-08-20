import {IMedia} from '@/components/_chan/renew/valueTypeMedia/media/type'
import useCallbackRef from '@/shared/hook/useCallbackRef'
import {useEffect, useState} from 'react'

export default function useMedia(
  props: IMedia
) {
  const [mediaStatus, setMediaStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

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

  return {
    mediaStatus,
    onLoad: () => setMediaStatus('loaded'),
    hover,
    ref,
    setRef,
  }
}