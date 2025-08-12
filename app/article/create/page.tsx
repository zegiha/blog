import ArticleContainer from '@/components/molecule/articleContainer/ArticleContainer'
import BodySection from '@/widget/article/create/bodySection/BodySection'
import HeaderSection from '@/widget/article/create/headerSection/HeaderSection'

export default function Page() {
  return (
    <ArticleContainer>
      <HeaderSection/>
      <BodySection/>
    </ArticleContainer>
  )
}