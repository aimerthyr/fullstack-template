import { readFile } from 'fs/promises'
import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

// 读取 web 项目的自动导入配置
const autoImportFile = new URL('./apps/web/.eslintrc-auto-import.json', import.meta.url)
const autoImportGlobals = JSON.parse(await readFile(autoImportFile, 'utf8'))

export default defineConfig([
  // 忽略文件配置
  {
    name: 'monorepo/files-to-ignore',
    ignores: ['**/dist/', '**/node_modules/', '**/auto-imports.d.ts', '**/components.d.ts'],
  },

  // JavaScript 基础配置
  eslint.configs.recommended,

  // TypeScript 基础配置
  ...tseslint.configs.recommended,

  // 公共子包规则
  {
    name: 'monorepo/base',
    files: ['**/*.{js,ts,tsx,mjs,vue}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
        },
      ],
      // 未使用导入规则
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
      // 代码风格
      'spaced-comment': [
        'error',
        'always',
        {
          // 允许 TypeScript 三斜杠指令
          markers: ['/'],
          exceptions: ['/'],
        },
      ],
    },
  },

  // server 项目规则
  {
    name: 'monorepo/server',
    files: ['apps/server/**/*.ts'],
    rules: {
      // nest 中都是类，不可以改成 type
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },

  // web 项目规则（vue 文件）
  {
    name: 'monorepo/web',
    files: ['apps/web/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2023,
        ...autoImportGlobals.globals,
      },
    },
    plugins: {
      'unused-imports': unusedImports,
      vue: pluginVue,
    },
    rules: {
      // Vue 基础规则（都是语义规则，是不会被下面的 prettier 覆盖）
      ...pluginVue.configs['flat/essential'].rules,
    },
  },

  // prettier 规则（禁用与 eslint 冲突的规则）
  prettier,

  /**
   * Vue 格式化规则覆盖（确保不被上面的 prettier 禁用）
   * 由于 prettier 会默认禁用某些格式化规则，所以这里得重新覆盖一次
   * https://github.com/vuejs/eslint-plugin-vue/issues/2232 官方可能会有修改默认值的计划
   */
  {
    name: 'monorepo/vue-override',
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
    },
    rules: {
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
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
  },
])
