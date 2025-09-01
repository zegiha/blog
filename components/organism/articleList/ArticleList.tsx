import Divider from '@/components/atom/divider/Divider'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import Typo from '@/components/atom/typo/Typo'
import Badge from '@/components/atom/badge/Badge'
import {TArticleSummaryEntity} from '@/entity/article/ArticleSummaryEntity'
import parseDateToDashed from '@/shared/helper/parseDateToDashed'
import Link from 'next/link'

export default function ArticleList({
  data,
  linkBase='/article/',
}: {
  data: Array<TArticleSummaryEntity>
  linkBase?: string
}) {
  return (
    <Col width={'fill-flex'} gap={36}>
      {data.map((v, i) => (
        <ArticleListItem key={i} {...v} linkBase={linkBase}/>
      ))}
    </Col>
  )
}

function ArticleListItem({
  uuid,
  title,
  description,
  createdAt,
  tags,
  linkBase,
}: TArticleSummaryEntity & {linkBase: string}) {
  return (
    <Link href={linkBase + uuid}>
      <Row gap={20}>
        <Col gap={16}>
          <Col gap={8}>
            <Typo.large accent color={title === '' ? 'alternative' : undefined}>
              {title !== '' ? title : '제목 없음'}
            </Typo.large>
            <Typo.medium color={'alternative'}>
              {description !== '' ? description : '설명 없음'}
            </Typo.medium>
          </Col>
          <Row gap={8} alignItems={'center'}>
            <Typo.small color={'alternative'}>
              {parseDateToDashed(createdAt)}
            </Typo.small>
            {tags.length > 0 && (
              <>
                <Divider type={'circular'}/>
                {tags.map((v, i) => (
                  <Badge key={i} size={'medium'} interaction={false}>{v}</Badge>
                ))}
              </>
            )}
          </Row>
        </Col>
      </Row>
    </Link>
  )
}
