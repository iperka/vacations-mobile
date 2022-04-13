const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {sans: ['OpenSans', ...defaultTheme.fontFamily.sans]},
      colors: {
        red: {
          DEFAULT: '#FF3A30',
          50: '#FFE9E8',
          100: '#FFD5D3',
          200: '#FFAEAA',
          300: '#FF8882',
          400: '#FF6159',
          500: '#FF3A30',
          600: '#F70C00',
          700: '#BF0900',
          800: '#870700',
          900: '#4F0400',
        },
        redDark: {
          DEFAULT: '#FF443A',
          50: '#FFF2F2',
          100: '#FFDFDD',
          200: '#FFB8B4',
          300: '#FF918C',
          400: '#FF6B63',
          500: '#FF443A',
          600: '#FF0F02',
          700: '#C90A00',
          800: '#910700',
          900: '#590400',
        },
        orange: {
          DEFAULT: '#FF9400',
          50: '#FFE1B8',
          100: '#FFD8A3',
          200: '#FFC77A',
          300: '#FFB652',
          400: '#FFA529',
          500: '#FF9400',
          600: '#C77300',
          700: '#8F5300',
          800: '#573200',
          900: '#1F1200',
        },
        orangeDark: {
          DEFAULT: '#FF9D0A',
          50: '#FFE6C2',
          100: '#FFDEAD',
          200: '#FFCE84',
          300: '#FFBE5C',
          400: '#FFAD33',
          500: '#FF9D0A',
          600: '#D17D00',
          700: '#995C00',
          800: '#613A00',
          900: '#291800',
        },
        yellow: {
          DEFAULT: '#FFCC00',
          50: '#FFF1B8',
          100: '#FFEDA3',
          200: '#FFE47A',
          300: '#FFDC52',
          400: '#FFD429',
          500: '#FFCC00',
          600: '#C79F00',
          700: '#8F7200',
          800: '#574500',
          900: '#1F1800',
        },
        yellowDark: {
          DEFAULT: '#FFD60A',
          50: '#FFF5C2',
          100: '#FFF1AD',
          200: '#FFEA84',
          300: '#FFE45C',
          400: '#FFDD33',
          500: '#FFD60A',
          600: '#D1AE00',
          700: '#997F00',
          800: '#615100',
          900: '#292200',
        },
        green: {
          DEFAULT: '#34C759',
          50: '#C3EFCE',
          100: '#B3EBC1',
          200: '#93E3A7',
          300: '#72DA8D',
          400: '#52D272',
          500: '#34C759',
          600: '#289B45',
          700: '#1D6E31',
          800: '#11421D',
          900: '#061509',
        },
        greenDark: {
          DEFAULT: '#30D158',
          50: '#C6F2D1',
          100: '#B6EFC4',
          200: '#94E7A9',
          300: '#73E08E',
          400: '#51D873',
          500: '#30D158',
          600: '#25A444',
          700: '#1A7631',
          800: '#10491E',
          900: '#061B0B',
        },
        mint: {
          DEFAULT: '#00C7BD',
          50: '#80FFF9',
          100: '#6BFFF8',
          200: '#42FFF6',
          300: '#1AFFF3',
          400: '#00F0E4',
          500: '#00C7BD',
          600: '#008F88',
          700: '#005752',
          800: '#001F1D',
          900: '#000000',
        },
        mintDark: {
          DEFAULT: '#66D4CF',
          50: '#F5FCFC',
          100: '#E5F8F7',
          200: '#C6EFED',
          300: '#A6E6E3',
          400: '#86DDD9',
          500: '#66D4CF',
          600: '#3AC8C1',
          700: '#2C9E98',
          800: '#20726E',
          900: '#144644',
        },
        teal: {
          DEFAULT: '#30B0C7',
          50: '#BFE8F0',
          100: '#AFE2EC',
          200: '#8ED7E4',
          300: '#6DCBDC',
          400: '#4CBFD4',
          500: '#30B0C7',
          600: '#25889A',
          700: '#1A606D',
          800: '#0F383F',
          900: '#041012',
        },
        tealDark: {
          DEFAULT: '#40C8E0',
          50: '#DEF5FA',
          100: '#CCF0F7',
          200: '#A9E6F1',
          300: '#86DCEB',
          400: '#63D2E6',
          500: '#40C8E0',
          600: '#20AEC8',
          700: '#198497',
          800: '#115A67',
          900: '#093037',
        },
        cyan: {
          DEFAULT: '#32ADE6',
          50: '#D6EEFA',
          100: '#C3E7F8',
          200: '#9FD9F3',
          300: '#7BCAEF',
          400: '#56BCEA',
          500: '#32ADE6',
          600: '#1890C8',
          700: '#126C96',
          800: '#0C4864',
          900: '#062432',
        },
        cyanDark: {
          DEFAULT: '#64D3FF',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#DEF6FF',
          300: '#B6EAFF',
          400: '#8DDFFF',
          500: '#64D3FF',
          600: '#2CC3FF',
          700: '#00AEF3',
          800: '#0086BB',
          900: '#005E83',
        },
        blue: {
          DEFAULT: '#007BFF',
          50: '#B8DAFF',
          100: '#A3CFFF',
          200: '#7ABAFF',
          300: '#52A5FF',
          400: '#2990FF',
          500: '#007BFF',
          600: '#0060C7',
          700: '#00458F',
          800: '#002A57',
          900: '#000F1F',
        },
        blueDark: {
          DEFAULT: '#0A84FF',
          50: '#C2E0FF',
          100: '#ADD6FF',
          200: '#84C1FF',
          300: '#5CADFF',
          400: '#3398FF',
          500: '#0A84FF',
          600: '#0068D1',
          700: '#004C99',
          800: '#003061',
          900: '#001429',
        },
        indigo: {
          DEFAULT: '#5856D6',
          50: '#EAEAFA',
          100: '#DAD9F6',
          200: '#B9B9EE',
          300: '#9998E6',
          400: '#7877DE',
          500: '#5856D6',
          600: '#3230C4',
          700: '#262597',
          800: '#1B1A6A',
          900: '#0F0F3D',
        },
        indigoDark: {
          DEFAULT: '#5E5CE6',
          50: '#FBFBFE',
          100: '#EAE9FC',
          200: '#C7C6F6',
          300: '#A4A3F1',
          400: '#817FEB',
          500: '#5E5CE6',
          600: '#2E2BDF',
          700: '#1E1CB6',
          800: '#161485',
          900: '#0E0D55',
        },
        purple: {
          DEFAULT: '#AF52DE',
          50: '#F6ECFB',
          100: '#EEDBF8',
          200: '#DFB9F2',
          300: '#CF97EB',
          400: '#BF74E5',
          500: '#AF52DE',
          600: '#9828D0',
          700: '#751FA1',
          800: '#531672',
          900: '#310D43',
        },
        purpleDark: {
          DEFAULT: '#BF5AF2',
          50: '#FFFFFF',
          100: '#FAF1FE',
          200: '#EBCBFB',
          300: '#DCA6F8',
          400: '#CE80F5',
          500: '#BF5AF2',
          600: '#AB26EE',
          700: '#8D10CC',
          800: '#690C98',
          900: '#450864',
        },
        pink: {
          DEFAULT: '#FF2D54',
          50: '#FFE5EA',
          100: '#FFD0D9',
          200: '#FFA7B8',
          300: '#FF7F96',
          400: '#FF5675',
          500: '#FF2D54',
          600: '#F4002D',
          700: '#BC0023',
          800: '#840018',
          900: '#4C000E',
        },
        pinkDark: {
          DEFAULT: '#FF375F',
          50: '#FFEFF2',
          100: '#FFDAE2',
          200: '#FFB1C1',
          300: '#FF89A0',
          400: '#FF6080',
          500: '#FF375F',
          600: '#FE0033',
          700: '#C60028',
          800: '#8E001C',
          900: '#560011',
        },
        brown: {
          DEFAULT: '#A2855E',
          50: '#E5DDD2',
          100: '#DED3C5',
          200: '#CFC0AC',
          300: '#C0AC92',
          400: '#B19978',
          500: '#A2855E',
          600: '#7F6849',
          700: '#5B4B35',
          800: '#382E20',
          900: '#14100C',
        },
        brownDark: {
          DEFAULT: '#AC8F68',
          50: '#EDE7DE',
          100: '#E6DDD1',
          200: '#D7CAB7',
          300: '#C9B69D',
          400: '#BAA382',
          500: '#AC8F68',
          600: '#8E734E',
          700: '#6A553A',
          800: '#453826',
          900: '#211B12',
        },
      },
    },
  },
  plugins: [],
};
