import { readFile } from 'fs/promises'
import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

// web项目的自动导入
const autoImportFile = new URL('./apps/web/.eslintrc-auto-import.json', import.meta.url)
const autoImportGlobals = JSON.parse(await readFile(autoImportFile, 'utf8'))

// vue 文件公共配置
export const vueConfig = defineConfig({
  files: ['**/*.vue'],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2023,
      /** 允许在.vue 文件中使用 JSX */
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...autoImportGlobals.globals,
    },
  },
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'never',
        math: 'always',
      },
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always',
      },
    ],
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
        allowEmptyLines: false,
      },
    ],
  },
})

export default defineConfig([
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/', '**/temp/', '**/coverage/'],
  },
  // js 推荐配置
  eslint.configs.recommended,
  // ts 推荐配置
  tseslint.configs.recommended,
  // 全局变量配置
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // 全局 file 自定义推荐配置
  {
    files: ['**/*.{js,ts,tsx,vue}'],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'spaced-comment': ['error', 'always'],
    },
  },
  // vue 推荐配置
  vueConfig,
  // prettier 配置
  prettier,
])
