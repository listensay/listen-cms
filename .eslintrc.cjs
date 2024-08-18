// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  plugins: ['prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: { // 自訂規則
    quotes: ['error', 'single'], // 使用單引號
    'no-console': 'warn', // 使用 console 時警告提示
    'vue/multi-word-component-names': 'off'
  }
}
