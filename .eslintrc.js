module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  'extends': [
    'plugin:vue/recommended',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [ 2, 'always' ],
    "comma-dangle": 0,
    'array-bracket-spacing': "off",
    "vue/no-v-html": 0,
    "no-useless-constructor": "off",
    "curly": "off",
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};