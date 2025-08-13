import { IUseDragAndDrop } from '@/shared/hook/dragAndDrop/useDragAndDrop/type'
import TWidth from "@/shared/design/width/TWidth";
import TTextSize from "@/shared/design/text/TTextSize";
import TTextColor from "@/shared/design/text/TTextColor";
import {TArticleContentType} from "@/widget/article/create/bodySection/BodySection";

export interface EditableDivProps {
  width?: TWidth
  textSize?: TTextSize
  accent?: boolean
  color?: TTextColor
  placeholder?: string
  showPlaceholderAlways?: boolean
  content: string
  setContent: (newData: string) => void
  autoFocus?: boolean
  clearAutoFocus?: () => void
  controllable?: boolean
  allowLineBreak?: boolean
  dragProps?: IUseDragAndDrop
  onDeleteBlock?: () => void
  onAddButtonClick?: () => void
  contentType?: TArticleContentType
  onContentTypeChange?: (newData: TArticleContentType) => void
}
