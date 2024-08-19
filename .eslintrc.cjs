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
    'vue/multi-word-component-names': 'off',
    'semi': ['error', 'never'] // 禁止使用分号
  },
  overrides: [
    {
      files: ['./server/**/*.ts'],  // 路径根据你的项目结构调整
      rules: {
        'no-console': 'off'  // 关闭 no-console 规则
      }
    }
  ]
}
