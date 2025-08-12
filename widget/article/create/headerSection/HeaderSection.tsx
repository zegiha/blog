'use client'

import Divider from '@/components/atom/divider/Divider'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import Typo from '@/components/atom/typo/Typo'
import EditableDiv from '@/components/molecule/editableDiv/EditableDiv'
import parseDateToDashed from '@/shared/helper/parseDateToDashed'
import TagControlSection from '@/widget/article/create/headerSection/tagControlSection/TagControlSection'
import {
  useState,
} from 'react'

export default function HeaderSection() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  return (
    <Col width={'fill-width'} gap={8}>
      <EditableDiv
        width={'fill-width'}
        placeholder={'제목을 입력해주세요'}
        showPlaceholderAlways
        content={title}
        setContent={setTitle}
        textSize={'xxlarge'}
        accent={true}
        controllable={false}
        allowLineBreak={false}
      />
      <Row width={'fill-width'} alignItems={'center'} gap={8}>
        <Typo.small width={'hug'} color={'alternative'}>
          {parseDateToDashed(new Date())}
        </Typo.small>
        <Divider type={'circular'} />
        <EditableDiv
          width={'fill-flex'}
          placeholder={'글 설명을 입력해주세요'}
          showPlaceholderAlways
          content={description}
          setContent={setDescription}
          textSize={'small'}
          color={'alternative'}
          controllable={false}
          allowLineBreak={false}
        />
      </Row>
      <TagControlSection />
    </Col>
  )
}