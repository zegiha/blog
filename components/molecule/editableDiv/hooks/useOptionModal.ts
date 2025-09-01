import { useState, useEffect } from 'react'
import { TArticleContent } from '@/app/api/article/route'
import { defaultOptionData, optionCommand } from '../config'
import { EditableDivProps } from '../types'
import {TArticleContentType} from "@/widget/article/create/[id]/bodySection/BodySection";

export function useOptionModal(props: EditableDivProps) {
  const { content, contentType } = props
  const [optionModalOpen, setOptionModalOpen] = useState<boolean>(false)
  const [optionData, setOptionData] = useState<Array<TArticleContentType>>(defaultOptionData)

  useEffect(() => {
    if (content === '/') {
      setOptionModalOpen(true)
    }
  }, [content])

  useEffect(() => {
    if(contentType === 'image') {
      setOptionData([...defaultOptionData])
      return;
    }

    if (content.trim() === '') {
      setOptionData([...defaultOptionData])
      setOptionModalOpen(false)
    }
    if (!optionModalOpen) return

    const newOptionData: Array<keyof TArticleContent> = []
    defaultOptionData.forEach(v => {
      const parsedContent = content.toLowerCase().trim().replace(/(&nbsp;|\s)/g, '')
      if (parsedContent === '') return
      const command = optionCommand[v]
      if (command.some(c => c.slice(0, parsedContent.length) === parsedContent.trim() && parsedContent.trim() !== '')) {
        newOptionData.push(v)
      }
    })
    setOptionData([...newOptionData])
  }, [optionModalOpen, content])

  const getOptionTypeFromCommand = (command: string) => {
    const keys = Object.keys(optionCommand)
    for (const key of keys) {
      const commandList = optionCommand[key as keyof TArticleContent]
      if (commandList.includes(command)) {
        return key as keyof TArticleContent
      }
    }
    return null
  }

  return {
    optionModalOpen,
    setOptionModalOpen,
    optionData,
    getOptionTypeFromCommand,
  }
}
