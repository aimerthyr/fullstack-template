import baseConfig from '../../.prettierrc.mjs';

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig,
  semi: true,
};

export default config;
