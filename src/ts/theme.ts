import { extendTheme, Theme, ThemeOverride } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    blue: {
      50: '#789ECB',
      100: '#6691C3',
      200: '#4577B1',
      300: '#375E8C',
      400: '#284668',
      500: '#1A2D43',
      600: '#162638',
      700: '#111E2D',
      800: '#0D1722',
      900: '#090F17',
    },
    lightBlue: {
      50: '#F9FAFC',
      100: '#EEF1F5',
      200: '#D7DFE8',
      300: '#C0CDDB',
      400: '#AABBCE',
      500: '#93A9C1',
      600: '#738FAE',
      700: '#577697',
      800: '#445C77',
      900: '#324356',
    },
    orange: {
      50: '#FBF3ED',
      100: '#F6E6DA',
      200: '#EDCDB5',
      300: '#E5B490',
      400: '#DC9A6B',
      500: '#D38146',
      600: '#BA672C',
      700: '#915122',
      800: '#673A19',
      900: '#3E230F',
    },
    gray: {
      50: '#CCCED1',
      100: '#BFC1C5',
      200: '#A4A8AD',
      300: '#898E95',
      400: '#6F747C',
      500: '#575B61',
      600: '#46494E',
      700: '#35383B',
      800: '#242629',
      900: '#131416',
    },
    green: {
      50: '#BEF0C6',
      100: '#A9ECB4',
      200: '#80E290',
      300: '#56D96C',
      400: '#2ECE49',
      500: '#25A43A',
      600: '#1F8B31',
      700: '#1A7228',
      800: '#145920',
      900: '#0E4017',
    },
    red: {
      50: '#F2D2D2',
      100: '#ECBEBE',
      200: '#E09797',
      300: '#D47070',
      400: '#C94848',
      500: '#AB3333',
      600: '#842727',
      700: '#5C1C1C',
      800: '#351010',
      900: '#0E0404',
    },
    alertOrange: '#E8843C',
    selectionColors: {
      gray: '#CBC6C6',
      red: '#E45959',
      pink: '#F28AEE',
      green: '#A5D5A7',
      blue: '#85A7D0',
      orange: '#ECA16A',
      yellow: '#F7EA77',
      brown: '#946E52',
      purple: '#C2A6E6',
    },
  },
  fonts: {
    body: 'basic-sans, sans-serif',
    heading: 'Bree Serif, serif',
    mono: 'Menlo, monospace',
  },
  textStyles: {
    p: {
      lineHeight: 'shorter',
      color: 'blue.500',
    },
    p2: {
      lineHeight: 'shorter',
      color: 'gray.500',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'orange',
      },
      variants: {
        solid: {},
      },
      sizes: {
        md: {
          h: '50px',
          px: 16,
          fontSize: '18px',
          lineHeight: '22px',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'normal',
      },
      sizes: {
        xl: {
          fontSize: '42px',
          lineHeight: 1.358,
          color: 'blue.500',
        },
        lg: {
          fontSize: '36px',
          lineHeight: 1.358,
          color: 'lightBlue.500',
        },
        md: {
          fontSize: '30px',
          lineHeight: 1.358,
          color: 'lightBlue.500',
        },
        sm: {
          fontSize: '26px',
          lineHeight: 1.358,
          color: 'blue.500',
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'lightBlue.500',
            _hover: {
              borderColor: 'lightBlue.700',
            },
            _focus: {
              borderColor: 'lightBlue.700',
              bgColor: 'orange.50',
              boxShadow: 'none',
            },
            _disabled: {
              opacity: 1,
              bgColor: 'gray.50',
              borderColor: 'gray.200',
            },
          },
        },
      },
    },
  },
} as ThemeOverride<Theme>)
export default theme
