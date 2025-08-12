'use client'

import Col from '@/components/atom/flex/Col'
import EditableDiv from '@/components/molecule/editableDiv/EditableDiv'
import {useDragAndDropContainer} from '@/shared/hook/dragAndDrop/useDragAndDropContainer/useDragAndDropContainer'
import {useState} from 'react'

export default function DragArea() {
  const [editableDivs, setEditableDivs] = useState([
    { id: 'editable-0', placeholder: '\default', controllable: true , content: ''},
    { id: 'editable-1', placeholder: '\default', controllable: true , content: ''},
    { id: 'editable-2', placeholder: '\default', controllable: true , content: ''},
    { id: 'editable-3', placeholder: '\default', controllable: true , content: ''},
    { id: 'editable-4', placeholder: '\default', controllable: true , content: ''},
    { id: 'editable-5', placeholder: '\default', controllable: true , content: ''},
    { id: 'editable-6', placeholder: '\default', controllable: true , content: ''},
    { id: 'editable-7', placeholder: '\default', controllable: true , content: ''},
  ])

  const {
    dragPropsEvents,
    dragPropsHelper,
  } = useDragAndDropContainer({
    data: editableDivs,
    setData: setEditableDivs,
  })

  return (
    <Col gap={8} style={{ position: 'relative' }}>
      {editableDivs.map((div, i) => (
        <EditableDiv
          key={div.id}
          width={'fill-width'}
          controllable={div.controllable}
          placeholder={div.placeholder}
          content={div.content}
          setContent={(newData) => {
            setEditableDivs(p => {
              const newDivs = [...p]
              newDivs[i].content = newData
              return newDivs
            })
          }}
          dragProps={{
            ...dragPropsEvents,
            idx: i,
            isHoverAndPosition: dragPropsHelper.getIsHoverAndPosition(i),
            isTarget: dragPropsHelper.getIsTarget(i),
          }}
          onAddButtonClick={() => {
            setEditableDivs(p => {
              const front = [...p.slice(0, i+1)]
              const back = [...p.slice(i+1)]
              back.unshift({
                id: `editable-${p.length + 1}`,
                placeholder: '\default',
                controllable: true,
                content: ''
              })

              return [...front, ...back]
            })
          }}
        />
      ))}
    </Col>
  )
}