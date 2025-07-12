import baseConfig from '../../.prettierrc.mjs';

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig,
  semi: true,
  // 在这里进行声明，但是依赖需要装到根目录（因为 prettier 会自动查找所有配置，然后进行格式化）
  plugins: baseConfig.plugins.concat('prettier-plugin-prisma'),
};

export default config;
