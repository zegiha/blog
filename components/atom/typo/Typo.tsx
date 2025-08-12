import BaseTypo, {IBaseTypo} from '@/components/atom/typo/BaseTypo'

function createTypo(type: IBaseTypo['type']) {
  return (props: Omit<IBaseTypo, 'type'>) => (
    <BaseTypo type={type} {...props}/>
  )
}

const Typo = {
  xxxlarge: createTypo('xxxlarge'),
  xxlarge: createTypo('xxlarge'),
  xlarge: createTypo('xlarge'),
  large: createTypo('large'),
  medium: createTypo('medium'),
  small: createTypo('small'),
  xsmall: createTypo('xsmall'),
  xxsmall: createTypo('xxsmall')
}

export default Typo
