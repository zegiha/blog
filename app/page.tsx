import Row from '@/components/atom/flex/Row'
import ColorChange from '@/components/_chan/ColorChange'
import ArticleList from '@/components/organism/articleList/ArticleList'
import style from './style.module.css'

export default function Home() {
  return (
    <Row className={style.container} gap={24}>
      <ArticleList/>
      <ColorChange/>
    </Row>
  )
}
