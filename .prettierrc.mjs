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
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['<BUILTIN_MODULES>', 'THIRD_PARTY_MODULES', '^(@internal)(/.*)$', '^[.]'],
  importOrderCaseSensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'classProperties', 'decorators-legacy'],
}

export default config
