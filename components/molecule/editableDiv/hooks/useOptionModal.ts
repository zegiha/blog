import { useState, useEffect } from 'react'
import { TArticleContent } from '@/app/api/article/route'
import { defaultOptionData, optionCommand } from '../config'
import { EditableDivProps } from '../types'
import {TArticleContentType} from "@/widget/article/create/bodySection/BodySection";

export function useOptionModal(props: EditableDivProps) {
  const { content } = props
  const [optionModalOpen, setOptionModalOpen] = useState<boolean>(false)
  const [optionData, setOptionData] = useState<Array<TArticleContentType>>(defaultOptionData)

  useEffect(() => {
    if (content === '/') {
      setOptionModalOpen(true)
    }
  }, [content])

  useEffect(() => {
    if (content.trim() === '') {
      setOptionData(defaultOptionData)
      setOptionModalOpen(false)
    }
    if (!optionModalOpen) return

    const newOptionData: Array<keyof TArticleContent> = []
    defaultOptionData.forEach(v => {
      const command = optionCommand[v]
      if (command.some(c => c.slice(0, content.length) === content.trim() && content.trim() !== '')) {
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
