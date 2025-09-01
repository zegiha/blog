import {TArticleContentType} from '@/widget/article/create/[id]/bodySection/BodySection'

export function getTopPositionDimensioinByContentType(
  type: TArticleContentType
) {
  if(type === 'h1') return 5;
  if(type === 'h2') return 2;
  if(type === 'content' || type === 'list' || type === 'image') return -1;
  if(type === 'footnote') return -2;
  return 0
}