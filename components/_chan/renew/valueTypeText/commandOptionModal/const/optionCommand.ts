import {TArticleContentType} from '@/widget/article/create/bodySection/BodySection'

const optionCommand: { [K in TArticleContentType]: Array<string> } = {
  h1: ['/제목1', '/h1', '/head1', '/header1'],
  h2: ['/제목2', '/h2', '/head2', '/header2'],
  list: ['/리스트', '/list', '/bulleted', '/bullet'],
  content: ['/텍스트', '/content', '/text', '/p', '/paragraph'],
  footnote: ['/작은글', '/주석', '/footnote', '/comment', '/small'],
  image: ['/이미지', '/img', '/picture', '/image'],
}

export default optionCommand