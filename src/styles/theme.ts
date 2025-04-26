const color = {
  primary: {
    50: '#FFFFFF',
    100: '#f8faff',
    200: '#e4f0fa',
    300: '#6d758f',
    400: '#1e88e5',
    500: '#3959a5',
  },
  gray: {
    100: '#d9d9d9',
    200: '#9d9d9d',
    300: '#000000',
  },
  text: {
    primary: '#3959a5',
    secondary: '#1e88e5',
    white: '#ffffff',
    gray: '#9d9d9d',
    black: '#000000',
    red: '#ff3a44',
  },
  plus: {
    green: '#61f52c',
    yellow: '#fcce39',
    blue: '#3959a5',
    image: '#f1f3f7',
  },
  error: '#ff3a44',
};

const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
};

const fontWeight = {
  normal: 400,
  semibold: 600,
  bold: 700,
};

const borderWidth = {
  thin: '1px',
  thick: '2px',
};

const theme = {
  color,
  fontSize,
  fontWeight,
  borderWidth,
} as const;

export default theme;

export type Theme = typeof theme;
