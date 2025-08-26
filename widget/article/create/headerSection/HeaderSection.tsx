'use client'

import Divider from '@/components/atom/divider/Divider'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import EditableTypo from '@/components/atom/typo/editableTypo/EditableTypo'
import Typo from '@/components/atom/typo/Typo'
import parseDateToDashed from '@/shared/helper/parseDateToDashed'
import TagControlSection from '@/widget/article/create/headerSection/tagControlSection/TagControlSection'
import {
  useState,
} from 'react'

export default function HeaderSection() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  return (
    <Col width={'fill-width'} gap={8} style={{zIndex: 2}}>
      <EditableTypo.xxlarge
        width={'fill-width'}
        placeholder={'제목을 입력해주세요'}
        changeContent={(v) => setTitle(v)}
        color={'strong'}
        accent
      />
      <Row width={'fill-width'} alignItems={'center'} gap={8}>
        <Typo.small width={'hug'} color={'alternative'}>
          {parseDateToDashed(new Date())}
        </Typo.small>
        <Divider type={'circular'} />
        <EditableTypo.small
          width={'fill-flex'}
          placeholder={'글 설명을 입력해주세요'}
          changeContent={(v) => setDescription(v)}
          color={'alternative'}
        />
      </Row>
      <TagControlSection />
    </Col>
  )
}
