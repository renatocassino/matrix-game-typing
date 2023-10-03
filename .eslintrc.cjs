module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'import/no-cycle': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'no-shadow': 'off',  // desligue a regra base
    '@typescript-eslint/no-shadow': ['error'],  // ligue a regra do @typescript-eslint
    'no-new': 'off',
  },
  globals: {
    Phaser: 'readonly',
  },
};
