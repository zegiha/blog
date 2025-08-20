import {TArticleContentType} from '@/widget/article/create/bodySection/BodySection'

export interface IControlSection {
  show: boolean
  contentType: TArticleContentType
  onDragButtonDrag: (e: React.MouseEvent) => void
  onAddButtonClick: () => void
}