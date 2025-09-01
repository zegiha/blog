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
  >([{...renewDefaultData}])
  const [isInit, setIsInit] = useState<boolean>(false)

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
    if(!id) return

    const init = async () => {
      const res = await fetch(`/api/article/save/${id}?select=content`)
      const json = await res.json()
      if(
        !(!res.ok ||
        json.content === undefined ||
        json.content === null ||
        json.content.length === 0)
      ) {
        setData(json.content)
      }
    }
    init()
      .finally(() => setIsInit(true))
  }, [id]);

  useEffect(() => {
    if(!id) return

    const updateContent = async () => {
      await fetch(`/api/article/save/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: data
        }),
      })
    }
    if(isInit) updateContent()
  }, [data, isInit, id]);

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