'use client'

import TextEditor from '@/components/_chan/TextEditor'
import Col from '@/components/atom/flex/Col'
import {useEffect, useRef} from 'react'
import style from './style.module.css'

export default function() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(!ref.current) return

    ref.current.innerHTML = '<span>test1</span><span>test2</span><span>test3</span>'

    const handleSelectionChange = () => {
      const sel = window.getSelection()
      if(!sel) return
      Array.from({length: sel.rangeCount}).map((_, i) => {
        console.log(i, sel.getRangeAt(i))
      })
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, []);

  return (
    <>
      <div
        ref={ref}
        contentEditable
      />
      <TextEditor/>
    </>
  )
}