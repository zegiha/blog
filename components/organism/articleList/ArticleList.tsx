'use client'

import Divider from '@/components/atom/divider/Divider'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import Typo from '@/components/atom/typo/Typo'
import Badge from '@/components/atom/badge/Badge'
import useArticleListFetching from '@/components/organism/articleList/useArticleListFetching'
import {TArticleSummaryEntity} from '@/entity/article/ArticleSummaryEntity'
import parseDateToDashed from '@/shared/helper/parseDateToDashed'
import Link from 'next/link'

export default function ArticleList() {
  const {
    data
  } = useArticleListFetching()

  return (
    <Col gap={36}>
      {data.map((v, i) => (
        <ArticleListItem key={i} {...v}/>
      ))}
    </Col>
  )
}

function ArticleListItem({
  id,
  title,
  description,
  createdAt,
  tags,
}: TArticleSummaryEntity) {
  return (
    <Link href={`/article/${id}`}>
      <Row gap={20}>
        <Col gap={16}>
          <Col gap={8}>
            <Typo.large accent>
              {title}
            </Typo.large>
            <Typo.medium color={'alternative'}>
              {description}
            </Typo.medium>
          </Col>
          <Row gap={8} alignItems={'center'}>
            <Typo.small color={'alternative'}>
              {parseDateToDashed(createdAt)}
            </Typo.small>
            <Divider type={'circular'}/>
            {tags.map((v, i) => (
              <Badge key={i} size={'medium'}>{v}</Badge>
            ))}
          </Row>
        </Col>
      </Row>
    </Link>
  )
}