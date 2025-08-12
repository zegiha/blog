import Flex, {IFlex} from '@/components/atom/flex/Flex'

export default function Row(props: Omit<IFlex, 'direction'>) {
  return (
    <Flex direction={'row'} {...props}/>
  )
}