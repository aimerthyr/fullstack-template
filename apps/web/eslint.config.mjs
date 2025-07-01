import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import baseConfig, { vueConfig } from '../../eslint.config.mjs'

export default defineConfig([
  baseConfig,
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
  defineConfigWithVueTs(pluginVue.configs['flat/essential'], vueTsConfigs.recommended),
  {
    files: ['**/*.vue'],
    extends: [vueConfig],
  },
])
