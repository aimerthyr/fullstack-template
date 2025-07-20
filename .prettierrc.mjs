/**
 * @type {import("prettier").Config}
 */
const config = {
  // 基础格式化配置
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  proseWrap: 'never',
  arrowParens: 'avoid',

  // 通用插件 - 所有子项目都会使用
  plugins: ['@ianvs/prettier-plugin-sort-imports'],

  // Import 排序配置
  importOrder: ['<BUILTIN_MODULES>', '<THIRD_PARTY_MODULES>', '^(@internal)(/.*)?$', '^[.]'],
  importOrderCaseSensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'classProperties', 'decorators-legacy'],

  // 覆盖配置 - 针对不同文件类型和目录
  overrides: [
    // Server 端配置 (NestJS + Prisma)
    {
      files: ['apps/server/**/*'],
      options: {
        semi: true,
        plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-prisma'],
      },
    },
    // Web 端配置 (Vue + Tailwind)
    {
      files: ['apps/web/**/*'],
      options: {
        plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
      },
    },
  ],
}

export default config
