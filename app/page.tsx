'use client'

import Row from '@/components/atom/flex/Row'
import ColorChange from '@/components/_chan/ColorChange'
import ArticleList from '@/components/organism/articleList/ArticleList'
import useArticleListFetching from '@/components/organism/articleList/useArticleListFetching'
import style from './style.module.css'

export default function Home() {
  const {data} = useArticleListFetching()

  return (
    <Row className={style.container} gap={24}>
      <ArticleList data={data}/>
      <ColorChange/>
    </Row>
  )
}
