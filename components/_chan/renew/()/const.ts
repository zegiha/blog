import {IRenewMediaValue, IRenewTextValue} from '@/components/_chan/renew/()/type'

const renewDefaultTextData: IRenewTextValue = {
  type: 'content',
  value: [{
    content: '',
  }],
}

const renewDefaultMediaData: IRenewMediaValue = {
  type: 'image',
  src: null,
  position: 'center',
}

const renewDefaultData = {...renewDefaultTextData}

export {
  renewDefaultData,
  renewDefaultTextData,
  renewDefaultMediaData
}