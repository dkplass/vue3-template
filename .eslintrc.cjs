/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx']
      }
    }
  },
  rules: {
    'vue/valid-template-root': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf'
      }
    ],
    'import/order': [
      'error',
      {
        groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object', 'type'],
        alphabetize: {
          order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */
        }
      }
    ]
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
};
