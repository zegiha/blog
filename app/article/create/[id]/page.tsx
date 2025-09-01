import ArticleContainer from '@/components/molecule/articleContainer/ArticleContainer'
import prisma from '@/shared/const/prisma'
import BodySection from '@/widget/article/create/[id]/bodySection/BodySection'
import HeaderSection from '@/widget/article/create/[id]/headerSection/HeaderSection'
import {notFound} from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{id: string}>
}) {
  const {id} = await params
  const isExist = await checkIsExist(id)
  if(!isExist) {
    notFound()
  }

  return (
    <ArticleContainer>
      <HeaderSection/>
      <BodySection/>
    </ArticleContainer>
  )
}

async function checkIsExist(uuid: string) {
  const res = await prisma.article.findUnique({
    where: {
      uuid
    }
  })

  return !!res
}