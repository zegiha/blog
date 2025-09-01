import style from '@/app/style.module.css'
import Col from '@/components/atom/flex/Col'
import ArticleList from '@/components/organism/articleList/ArticleList'
import prisma from '@/shared/const/prisma'
import CreateNew from '@/widget/article/create/()/CreateNew'
import {NextResponse} from 'next/server'

export default async function Page() {
  const data = await getData()
    .then(res => res.json())
    .then(data => {
      // @ts-expect-error: 데이터 타입 파싱 과정 제외
      return data.map(v => ({...v, createdAt: new Date(v.createdAt)}))
    })

  return (
    <>
      <Col className={style.container} gap={0}>
        <CreateNew/>
        <ArticleList data={data} linkBase={'/article/create/'}/>
      </Col>
    </>
  )
}

async function getData() {
  try {
    return NextResponse.json(await prisma.article.findMany({
      where: {
        status: 'DRAFT'
      }
    }))
  } catch(e) {
    console.error(e)
    return new NextResponse('Internal Server Error', {status: 500})
  }
}