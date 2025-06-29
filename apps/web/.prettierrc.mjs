import baseConfig from '../../.prettierrc.mjs'

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig,
  htmlWhitespaceSensitivity: 'ignore',
}

export default config
