'use client'

import {ArticleContentSchema} from '@/app/api/article/route'
import useBodySection from '@/components/_chan/renew/()/hook/useBodySection'
import Col from '@/components/atom/flex/Col'
import Renew from '@/components/_chan/renew/()/Renew'
import {useDragAndDropContainer} from '@/shared/hook/dragAndDrop/useDragAndDropContainer/useDragAndDropContainer'
import OptionModal from "@/components/molecule/optionModal/OptionModal";
import * as z from 'zod'
import style from './style.module.css'

export type TArticleContentType = keyof z.infer<typeof ArticleContentSchema>

export default function BodySection() {
  const {
    ref,
    autoFocus,
    setAutoFocus,
    data,
    setData,
    // setFocus,
  } = useBodySection()

  const {
    getDragProps,
  } = useDragAndDropContainer({
    data: data,
    setData: setData
  })

  return (
    <Col
      ref={ref}
      className={style.container}
      width={'fill-width'}
      style={{zIndex: 1}}
    >
      <OptionModal.anchor>
        {data.map((v, i) => (
          <Renew
            key={i}
            idx={i}
            autoFocus={autoFocus === i}
            // changeFocus={(v) => setFocus(v)}
            setAutoFocusIdx={setAutoFocus}
            useDragAndDropParam={getDragProps(i)}
            {...{...v, setValue: setData}}
          />
        ))}
      </OptionModal.anchor>
    </Col>
  )
}
