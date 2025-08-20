import {TArticleContentType} from '@/widget/article/create/bodySection/BodySection'

export default function getTopMarginDimensionByContentType(type: TArticleContentType) {
  if(type === 'h1' || type === 'h2' || type === 'image') return 16;
  if(type === 'content' || type === 'list') return 8
  return 0
}