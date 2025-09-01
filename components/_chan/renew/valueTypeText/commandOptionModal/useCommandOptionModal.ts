'use client'

import {TArticleContent} from '@/app/api/article/route'
import {ICommandOptionModal} from '@/components/_chan/renew/valueTypeText/commandOptionModal/type'
import {TArticleContentType} from '@/widget/article/create/[id]/bodySection/BodySection'
import {useEffect, useRef, useState} from 'react'
import defaultOptionData from '@/components/_chan/renew/valueTypeText/commandOptionModal/const/defaultOptionData'
import optionCommand from '@/components/_chan/renew/valueTypeText/commandOptionModal/const/optionCommand'

export default function useCommandOptionModal({
  content,
  changeContentType,
}: ICommandOptionModal) {
  const firstOptionRef= useRef<HTMLDivElement | null>(null)
  const [autoFocus, setAutoFocus] = useState<boolean>(false)

  const [isFirstOpen, setIsFirstOpen] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)

  const [isCorrectCommand, setIsCorrectCommand] = useState<boolean>(false)

  const [optionData, setOptionData] = useState<Array<TArticleContentType>>([...defaultOptionData])

  const [wrongWordCnt, setWrongWordCnt] = useState<number>(0)

  const processedChangeContentType = (type: TArticleContentType) => {
    changeContentType(type)
    setOpen(false)
  }

  useEffect(() => {
    if(autoFocus) {
      firstOptionRef.current?.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if(open && e.key === 'Tab' && !autoFocus) {
        e.preventDefault()
        e.stopPropagation()
        firstOptionRef.current?.focus()
        setAutoFocus(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    if(!open) setAutoFocus(false)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [autoFocus, open]);

  useEffect(() => {
    if(content.at(-1)?.content === '') {
      setIsFirstOpen(true)
    }

    if(!open && isFirstOpen) {
      if(
        content.length === 1 &&
        (content[0].content === '/' || content[0].content === '/\n')
      ) {
        setOpen(true)
        setIsFirstOpen(false)
      }
      return
    }

    if(
      content.length !== 1 ||
      content[0].content.trim() === ''
    ) {
      setOptionData([...defaultOptionData])
      setOpen(false)
      return
    }

    const parsedContent = content[0].content.toLowerCase().trim().replace(/(&nbsp;|\s)/g, '')
    const newOptionData: Array<keyof TArticleContent> = []
    defaultOptionData.forEach(v => {
      if (parsedContent === '') return
      const command = optionCommand[v]
      if (command.some(c => c.slice(0, parsedContent.length) === parsedContent.trim() && parsedContent.trim() !== '')) {
        newOptionData.push(v)
      }
    })

    if(
      newOptionData.length === 1 &&
      optionCommand[newOptionData[0]].some(v => v === parsedContent || v+'\n' === parsedContent)
    ) {
      setIsCorrectCommand(true)
    } else {
      setIsCorrectCommand(false)
    }

    if(newOptionData.length === 0) {
      setWrongWordCnt(p => p + 1)
    } else {
      setWrongWordCnt(0)
    }

    setOptionData([...newOptionData])
  }, [content.at(-1)?.content, open]);

  useEffect(() => {
    if(!open) return

    if(wrongWordCnt >= 5)
      setOpen(false)
  }, [wrongWordCnt, open])

  useEffect(() => {
    if(open && isCorrectCommand) {
      setAutoFocus(true)
    }
    if(!open) {
      setAutoFocus(false)
      setIsCorrectCommand(false)
    }
  }, [isCorrectCommand, open])

  return {
    open,
    onClose: () => setOpen(false),
    optionData,
    changeContentType: processedChangeContentType,
    firstOptionRef,
    autoFocus,
  }
}