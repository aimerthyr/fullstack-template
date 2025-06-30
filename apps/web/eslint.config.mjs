import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import baseConfig from '../../eslint.config.mjs'

export default defineConfig([
  ...baseConfig,
  defineConfigWithVueTs(pluginVue.configs['flat/essential'], vueTsConfigs.recommended),
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/',
      '**/temp/',
      '**/coverage/',
      '.eslintrc-auto-import.json',
      'auto-imports.d.ts',
    ],
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2023,
        sourceType: 'module',
      },
    },
    plugins: {
      pluginVue,
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
  },
])
