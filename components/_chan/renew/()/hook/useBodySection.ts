'use client'

import {renewDefaultData} from '@/components/_chan/renew/()/const'
import {IRenewMediaValue, IRenewTextValue} from '@/components/_chan/renew/()/type'
import {useParams} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'

export default function useBodySection() {
  const [data, setData] = useState<
    Array<
      IRenewTextValue |
      IRenewMediaValue
    >
  >([{...renewDefaultData,
    value: [{
    content: Array.from({length: 11}).map((_, i) => `${i}`).join(' ')
    }]
  }])

  useEffect(() => {
    const endIdx = data.length - 1
    if(data[endIdx].type === 'image') {
      setData(p => [...p, {...renewDefaultData}])
    } else {
      if(
        data[endIdx].value.length !== 1 ||
        data[endIdx].value.at(0)?.content !== '' &&
        data[endIdx].value.at(0)?.content !== '\n'
      ) {
        setData(p => [...p, {...renewDefaultData}])
      }
    }
  }, [data]);

  const {id} = useParams<{id: string}>()

  useEffect(() => {
    const updateContent = async () => {
      await fetch(`/api/article/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: data
        }),
      })
    }
    // updateContent()
  }, [data]);

  const ref = useRef<HTMLDivElement | null>(null)
  const [autoFocus, setAutoFocus] = useState<number | null>(0)

  return {
    ref,
    autoFocus,
    setAutoFocus,
    data,
    setData,
    // setFocus,
  }
}