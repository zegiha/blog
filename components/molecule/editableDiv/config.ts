import { TArticleContent } from '@/app/api/article/route'

export const defaultOptionData: Array<keyof TArticleContent> = [
  'h1',
  'h2',
  'list',
  'content',
  'footnote'
]

export const optionCommand: { [K in keyof TArticleContent]: Array<string> } = {
  h1: ['/제목1', '/h1', '/header1'],
  h2: ['/제목2', '/h2', '/header2'],
  list: ['/리스트', '/list', '/bulleted', '/bullet'],
  content: ['/텍스트', '/content', '/text', '/p', '/paragraph'],
  footnote: ['/작은글', '/주석', '/footnote', '/comment', '/small']
}
