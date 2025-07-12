/**
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  proseWrap: 'never',
  arrowParens: 'avoid',
  // monorepo 下，希望统一格式化所有项目的话，必须要把 prettier 的插件配置到根目录
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-prisma'],
  importOrder: ['<BUILTIN_MODULES>', 'THIRD_PARTY_MODULES', '^(@internal)(/.*)$', '^[.]'],
  importOrderCaseSensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'classProperties', 'decorators-legacy'],
}

export default config
