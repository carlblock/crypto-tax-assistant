module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'react-refresh', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
      }],
    'react-refresh/only-export-components': 'warn',
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/require-default-props': 'off', // TypeScript handles this
    'react/prop-types': 'off', // TypeScript handles this
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/indent': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': 'off',
    'prettier/prettier': [
      'error',
      { singleQuote: true, semi: false, tabWidth: 2, useTabs: false },
    ],
    indent: ['error', 2],
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off', // Does not work with PNPM
  },
  overrides: [
    {
      files: ['src/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['off'],
      },
    },
  ],
  root: true,
}
