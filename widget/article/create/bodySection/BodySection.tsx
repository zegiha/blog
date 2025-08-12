'use client'

import Col from '@/components/atom/flex/Col'
import EditableDiv from '@/components/molecule/editableDiv/EditableDiv'
import {useDragAndDropContainer} from '@/shared/hook/dragAndDrop/useDragAndDropContainer/useDragAndDropContainer'
import {useState} from 'react'

type TArticleContentType =
  'h1' |
  'h2' |
  'content' |
  'list' |
  'footnote'

interface IArticleContent {
  type: TArticleContentType
  value: string
}

const defaultData: IArticleContent = {
  type: 'content',
    value: ''
}

export default function BodySection() {
  const [data, setData] = useState<Array<IArticleContent>>([{...defaultData}])
  const [autoFocus, setAutoFocus] = useState<number | null>(0)
  const {
    getDragProps
  } = useDragAndDropContainer({
    data,
    setData
  })

  return (
    <Col width={'fill-width'} gap={8}>
      {data.map((v, i) => (
        <EditableDiv
          key={i}
          width={'fill-width'}
          placeholder={'\default'}
          showPlaceholderAlways={data.length === 1}
          content={v.value}
          setContent={(v) => setData(p => {
            let newData = [...p]
            newData[i].value = v
            return [...newData]
          })}
          autoFocus={autoFocus === i}
          clearAutoFocus={() => setAutoFocus(null)}
          dragProps={getDragProps(i)}
          onAddButtonClick={() => {
            setAutoFocus(i+1)
            setData(p => {
              const front = [...p.slice(0, i+1)]
              const back = [...p.slice(i+1)]
              back.unshift({...defaultData})
              return [...front, ...back]
            })
          }}
          onDeleteBlock={() => {
            setData(p => {
              if(p.length <= 1) return [...p]
              setAutoFocus(i === 0 ? 0 : i-1)
              return [...p.filter((_, idx) => idx !== i)]
            })
          }}
        />
      ))}
    </Col>
  )
}