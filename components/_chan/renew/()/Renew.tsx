import {IRenew} from '@/components/_chan/renew/()/type'
import ValueTypeMedia from '@/components/_chan/renew/valueTypeMedia/ValueTypeMedia'
import ValueTypeText from '@/components/_chan/renew/valueTypeText/ValueTypeText'

export default function Renew(props: IRenew) {
  return props.type !== 'image' ? (
    <ValueTypeText {...props}/>
  ):(
    <ValueTypeMedia {...props}/>
  )
}

// import changeTargetBlockTypeToNewType from '@/components/_chan/renew/()/helper/changeTargetBlockTypeToNewType'
// import changeTargetIdxTextValueEndContent from '@/components/_chan/renew/()/helper/changeTargetIdxTextValueEndContent'
// import CommandOptionModal from '@/components/_chan/renew/commandOptionModal/CommandOptionModal'
// import ControlSection from '@/components/_chan/renew/controlSection/ControlSection'
// import {IRenew} from '@/components/_chan/renew/()/type'
// import ValueTypeMedia from '@/components/_chan/renew/valueTypeMedia/ValueTypeMedia'
// import ValueTypeText, {TestValueTypeText} from '@/components/_chan/renew/valueTypeText/ValueTypeText'
// import Col from '@/components/atom/flex/Col'
// import Row from '@/components/atom/flex/Row'
// import {useDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/useDragAndDrop'
// import useCallbackRef from '@/shared/hook/useCallbackRef'
// import cn from 'classnames'
// import {ReactNode, useEffect, useRef, useState} from 'react'
// import style from './style.module.css'
// import addNewBlock from '@/components/_chan/renew/()/helper/addNewBlock'

// export default function Renew(props: IRenew) {
//   const {
//     useDragAndDropParam,
//     type,
//     idx,
//     setValue,
//     setAutoFocusIdx,
// } = props
//
//   const {ref: dragAndDropTargetRef, onTargetMouseDown: onDragStart} = useDragAndDrop(useDragAndDropParam)
//   const {ref: containerRef, refDependency: containerRefDependency, setRef: setContainerRef} = useCallbackRef<HTMLDivElement>()
//   const wrapperRef = useRef<HTMLDivElement | null>(null)
//   const [hover, setHover] = useState<boolean>(false)
//
//   const getTopDimensionByContentType = () => {
//     if(type === 'h1' || type === 'h2') return 16;
//     if(type === 'content' || type === 'list' || type === 'image') return 8
//     return 0
//   }
//
//   useEffect(() => {
//     if(!containerRef.current) return
//
//     const handleMouseEnter = () => {
//       setHover(true)
//     }
//     const handleMouseLeave = () => {
//       setHover(false)
//     }
//     containerRef.current.addEventListener('mouseenter', handleMouseEnter)
//     containerRef.current.addEventListener('mouseleave', handleMouseLeave)
//   }, [containerRefDependency]);
//
//   return (
//     <>
//       <Col
//         ref={(el) => {
//           dragAndDropTargetRef.current = el
//           setContainerRef(el)
//         }}
//         className={style.container}
//         width={'fill-flex'}
//       >
//         <Row
//           className={cn(style.wrapper)}
//           ref={wrapperRef}
//           width={'fill-width'}
//           style={{
//             marginTop: `${getTopDimensionByContentType()}px`
//           }}
//         >
//           {type !== 'image' ? (
//             <ValueTypeText {...props}/>
//           ):(
//             <ValueTypeMedia {...props}/>
//           )}
//           <ControlSection
//             show={hover}
//             onDragButtonDrag={onDragStart}
//             onAddButtonClick={() =>
//               addNewBlock(idx, setAutoFocusIdx, setValue)}
//           />
//         </Row>
//       </Col>
//       {type !== 'image' && (
//         <CommandOptionModal
//           content={props.value}
//           changeContentType={(newType) => {
//             changeTargetBlockTypeToNewType(
//               newType, idx, setValue, setAutoFocusIdx
//             )
//           }}
//           style={{
//             width: 160,
//             y: `calc(${wrapperRef.current?.getBoundingClientRect().height}px + ${containerRef.current?.offsetTop}px + 4px)`,
//           }}
//         />
//       )}
//     </>
//   )
// }