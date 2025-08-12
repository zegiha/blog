import {TDragHoverPosition} from '@/shared/hook/dragAndDrop/type'

function getNewData<T>(
  targetIdx: number | null,
  hover: {
    idx: number,
    position: TDragHoverPosition,
  } | null,
  data: Array<T>
): Array<T> {
  if(targetIdx === null || hover === null) return data

  let newTargetIdx =
    hover.position === 'top' ? hover.idx : hover.idx + 1
  newTargetIdx = Math.min(newTargetIdx, data.length)
  newTargetIdx = Math.max(newTargetIdx, 0)

  if(
    newTargetIdx === targetIdx ||
    newTargetIdx === targetIdx + 1
  ) return data

  const newData = [...data]
  const [moved] = newData.splice(targetIdx, 1)

  newTargetIdx = targetIdx < newTargetIdx ? newTargetIdx - 1 : newTargetIdx

  newData.splice(newTargetIdx, 0, moved)

  return newData
}

export {
  getNewData
}