import Flex, {IFlex} from '@/components/atom/flex/Flex'

export default function Col(props: Omit<IFlex, 'direction'>) {
  return (
    <Flex direction={'column'} {...props}/>
  )
}
