/* ===== Semantic ===== */
import {palette} from '@/shared/design/palette'

export const semantic = {
  light: {
    background: {
      normal: palette.gray['00'],
      alternative: palette.gray['10'],
      elevated: palette.gray['00'],
      depressed: 'rgba(10, 10, 10, 0.32)',
    },
    container: {
      strong: palette.gray['20'],
      normal: palette.gray['10'],
      alternative: palette.gray['00'],
    },
    component: {
      fill: {
        strong: 'rgba(10, 10, 10, 0.12)',
        normal: 'rgba(10, 10, 10, 0.07)',
        alternative: 'rgba(10, 10, 10, 0.02)',
      },
      materialBackground: {
        strong: 'rgba(255, 255, 255, 0.84)',
        normal: 'rgba(255, 255, 255, 0.16)',
        alternative: 'rgba(255, 255, 255, 0.04)',
      },
    },
    label: {
      strong: palette.gray['99'],
      normal: palette.gray['60'],
      alternative: palette.gray['50'],
      link: palette.tint.blue,
    },
    line: {
      border: 'rgba(10, 10, 10, 0.12)',
      normal: 'rgba(10, 10, 10, 0.16)',
      alternative: 'rgba(10, 10, 10, 0.06)',
    },
    brand: {
      normal: palette.tint.brand,
      translucent: 'rgba(255, 71, 126, 0.18)',
    },
    static: {
      white: '#FFFFFF',
      black: '#000000',
    },
    reverse: {
      white: '#FFFFFF',
      black: '#000000',
    },
    status: {
      positive: palette.tint.green,
      cautionary: palette.tint.yellow,
      negative: palette.tint.red,
      translucent: {
        positive: 'rgba(41, 194, 87, 0.18)',
        cautionary: 'rgba(255, 170, 0, 0.18)',
        negative: 'rgba(245, 49, 52, 0.18)',
      },
    },
  },
  dark: {
    background: {
      normal: palette.gray['99'],
      alternative: palette.gray['70'],
      elevated: palette.gray['70'],
      depressed: 'rgba(10, 10, 10, 0.72)',
    },
    container: {
      strong: palette.gray['60'],
      normal: palette.gray['70'],
      alternative: palette.gray['99'],
    },
    component: {
      fill: {
        strong: 'rgba(255, 255, 255, 0.12)',
        normal: 'rgba(255, 255, 255, 0.07)',
        alternative: 'rgba(255, 255, 255, 0.02)',
      },
      materialBackground: {
        strong: 'rgba(10, 10, 10, 0.84)',
        normal: 'rgba(10, 10, 10, 0.16)',
        alternative: 'rgba(10, 10, 10, 0.02)',
      },
    },
    label: {
      strong: palette.gray['00'],
      normal: palette.gray['20'],
      alternative: palette.gray['40'],
      link: palette.tint.blue,
    },
    line: {
      border: 'rgba(255, 255, 255, 0.09)',
      normal: 'rgba(255, 255, 255, 0.11)',
      alternative: 'rgba(255, 255, 255, 0.07)',
    },
    brand: {
      normal: palette.tint.brand,
      translucent: 'rgba(255, 71, 126, 0.18)',
    },
    static: {
      white: '#FFFFFF',
      black: '#000000',
    },
    reverse: {
      white: '#FFFFFF',
      black: '#000000',
    },
    status: {
      positive: palette.tint.green,
      cautionary: palette.tint.yellow,
      negative: palette.tint.red,
      translucent: {
        positive: 'rgba(41, 194, 87, 0.18)',
        cautionary: 'rgba(255, 170, 0, 0.18)',
        negative: 'rgba(245, 49, 52, 0.18)',
      },
    },
  },
} as const;