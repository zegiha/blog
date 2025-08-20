'use client'

import {ArticleContentSchema} from '@/app/api/article/route'
import {IRenewMediaValue, IRenewTextValue} from '@/components/_chan/renew/()/type'
import Col from '@/components/atom/flex/Col'
import EditableDiv from '@/components/molecule/editableDiv/EditableDiv'
import Renew from '@/components/_chan/renew/()/Renew'
import {useDragAndDropContainer} from '@/shared/hook/dragAndDrop/useDragAndDropContainer/useDragAndDropContainer'
import {useEffect, useState} from 'react'
import OptionModal from "@/components/molecule/optionModal/OptionModal";
import * as z from 'zod'
import {renewDefaultData} from '@/components/_chan/renew/()/const'

export type TArticleContentType = keyof z.infer<typeof ArticleContentSchema>

interface IArticleContent {
  type: TArticleContentType
  value: string
}

const defaultData: IArticleContent = {
  type: 'content',
    value: ''
}

export default function BodySection() {
  // const [data, setData] = useState<Array<IArticleContent>>([{...defaultData}])
  // const [autoFocus, setAutoFocus] = useState<number | null>(0)
  // const {
  //   getDragProps
  // } = useDragAndDropContainer({
  //   data,
  //   setData
  // })

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

  useEffect(() => {
    console.log(renewData)
  }, [renewData])

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

        {/*{data.map((v, i) => (*/}
        {/*  <EditableDiv*/}
        {/*    key={i}*/}
        {/*    width={'fill-width'}*/}
        {/*    placeholder={'\default'}*/}
        {/*    showPlaceholderAlways={data.length === 1}*/}
        {/*    content={v.value}*/}
        {/*    setContent={(v) => setData(p => {*/}
        {/*      const front = [...p.slice(0, i)]*/}
        {/*      const back = [...p.slice(i+1)]*/}

        {/*      if(p[i].type !== 'image') {*/}
        {/*        return [...front, {...p[i], value: v}, ...back]*/}
        {/*      } else {*/}
        {/*        return [...p]*/}
        {/*      }*/}
        {/*    })}*/}
        {/*    autoFocus={autoFocus === i}*/}
        {/*    clearAutoFocus={() => setAutoFocus(null)}*/}
        {/*    dragProps={getDragProps(i)}*/}
        {/*    onAddButtonClick={() => {*/}
        {/*      setAutoFocus(i+1)*/}
        {/*      setData(p => {*/}
        {/*        const front = [...p.slice(0, i+1)]*/}
        {/*        const back = [...p.slice(i+1)]*/}

        {/*        if(front[i].type === 'list')*/}
        {/*          back.unshift({...defaultData, type: 'list'})*/}
        {/*        else*/}
        {/*          back.unshift({...defaultData})*/}

        {/*        return [...front, ...back]*/}
        {/*      })*/}
        {/*    }}*/}
        {/*    onDeleteBlock={() => {*/}
        {/*      setData(p => {*/}
        {/*        if(p.length <= 1) return [...p]*/}
        {/*        setAutoFocus(i === 0 ? 0 : i-1)*/}
        {/*        return [...p.filter((_, idx) => idx !== i)]*/}
        {/*      })*/}
        {/*    }}*/}
        {/*    contentType={v.type}*/}
        {/*    onContentTypeChange={(newData) => {*/}
        {/*      setData(p => {*/}
        {/*        const front = [...p.slice(0, i)]*/}
        {/*        const back = [...p.slice(i+1)]*/}
        {/*        return [...front, {...p[i], type: newData}, ...back]*/}
        {/*      })*/}
        {/*      setAutoFocus(i)*/}
        {/*    }}*/}
        {/*  />*/}
        {/*))}*/}
      </OptionModal.anchor>
    </Col>
  )
}
