'use client'

import {ArticleContentSchema} from '@/app/api/article/route'
import {IRenewMediaValue, IRenewTextValue} from '@/components/_chan/renew/()/type'
import Col from '@/components/atom/flex/Col'
import Renew from '@/components/_chan/renew/()/Renew'
import {useDragAndDropContainer} from '@/shared/hook/dragAndDrop/useDragAndDropContainer/useDragAndDropContainer'
import {useEffect, useState} from 'react'
import OptionModal from "@/components/molecule/optionModal/OptionModal";
import * as z from 'zod'
import {renewDefaultData} from '@/components/_chan/renew/()/const'

export type TArticleContentType = keyof z.infer<typeof ArticleContentSchema>

export default function BodySection() {
  const [renewData, setRenewData] = useState<
    Array<
      IRenewTextValue |
      IRenewMediaValue
    >
  >([{...renewDefaultData}])
  const [renewAutoFocus, setRenewAutoFocus] = useState<number | null>(0)
  const {
    getDragProps: renewGetDragProps,
  } = useDragAndDropContainer({
    data: renewData,
    setData: setRenewData
  })

  return (
    <Col width={'fill-width'} style={{zIndex: 1}}>
      <OptionModal.anchor>
        {renewData.map((v, i) => (
          <Renew
            key={i}
            idx={i}
            autoFocus={renewAutoFocus === i}
            setAutoFocusIdx={setRenewAutoFocus}
            useDragAndDropParam={renewGetDragProps(i)}
            {...{...v, setValue: setRenewData}}
          />
        ))}
      </OptionModal.anchor>
    </Col>
  )
}
