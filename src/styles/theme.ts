const color = {
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',

  main50: '#eef2ff',
  main100: '#e0e7ff',
  main200: '#c7d2fe',
  main300: '#a5b4fc',
  main400: '#818cf8',
  main500: '#6366f1',
  main600: '#4f46e5',
  main700: '#4338ca',
  main800: '#3730a3',
  main900: '#312e81',
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

const theme = {
  color,
  fontSize,
} as const;

export default theme;

export type Theme = typeof theme;
