import baseConfig from '../../.prettierrc.mjs'

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig,
  htmlWhitespaceSensitivity: 'ignore',
  plugins: baseConfig.plugins.concat('prettier-plugin-tailwindcss'),
}

export default config
