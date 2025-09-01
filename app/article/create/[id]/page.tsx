import ArticleContainer from '@/components/molecule/articleContainer/ArticleContainer'
import BodySection from '@/widget/article/create/[id]/bodySection/BodySection'
import HeaderSection from '@/widget/article/create/[id]/headerSection/HeaderSection'

export default async function Page({
  params,
}: {
  params: {id: string}
}) {
  const {id} = await params

  return (
    <ArticleContainer>
      <HeaderSection articleId={id}/>
      <BodySection/>
    </ArticleContainer>
  )
}
