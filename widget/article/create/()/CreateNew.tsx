'use client'

import Row from '@/components/atom/flex/Row'
import {TextButton} from '@/components/atom/textButton/TextButton'
import {useRouter} from 'next/navigation'

export default function() {
  const router = useRouter()

  const handleClick = async () => {
    try {
      const res = await fetch('/api/article', {
        method: 'POST',
      })
        .then(res => res.json())

      router.push(`/article/create/${res.uuid}`)
    } catch(e) {
      console.error(e)
      alert('다시시도찬')
    }
  }

  return (
    <Row width={'fill-width'} justifyContent={'flex-end'}>
      <TextButton
        label={'새로 만들기'}
        onClick={handleClick}
      />
    </Row>
  )
}