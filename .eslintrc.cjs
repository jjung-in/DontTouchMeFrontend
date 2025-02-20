module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslint.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['eslint-plugin-import'],
  rules: {
    'no-var': 'error',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-unused-vars': 'error',
    'no-extra-semi': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/pages/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/components/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/hooks/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'src/**',
            group: 'internal',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
};
