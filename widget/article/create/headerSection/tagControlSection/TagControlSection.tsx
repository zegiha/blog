import Row from '@/components/atom/flex/Row'
import Badge from '@/components/atom/badge/Badge'
import AddTagModal from '@/widget/article/create/headerSection/tagControlSection/addTagModal/AddTagModal'
import {useState} from 'react'

export default function TagControlSection() {
  const [tags, setTags] = useState<Array<string>>([])

  return (
    <Row gap={8} alignItems={'center'} wrap>
      {tags.map((v, i) => (
        <Badge key={i} size={'small'}>
          {v}
        </Badge>
      ))}
      <AddTagModal addTag={(tag) => {
        setTags([...tags, tag])
      }} />
    </Row>
  )
}
