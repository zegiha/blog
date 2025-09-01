import {TArticleContentType} from '@/widget/article/create/[id]/bodySection/BodySection'

export interface IControlSection {
  idx: number
  show: boolean
  contentType: TArticleContentType
  onDragButtonDrag: (e: React.MouseEvent) => void
  onAddButtonClick: () => void
  onDragButtonClick: () => void
}