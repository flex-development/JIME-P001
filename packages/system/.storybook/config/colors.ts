import _ from 'lodash'

/**
 * @file Color Palettes
 * @module storybook/config/colors
 */

/**
 * Theme colors.
 */
export const colors = {
  dark: {
    name: 'Dark',
    value: '#232946'
  },
  darker: {
    name: 'Darker',
    value: '#121629'
  },
  light: {
    name: 'Light',
    value: '#fffffe'
  },
  primary: {
    name: 'Primary',
    value: '#eebbc3'
  },
  secondary: {
    name: 'Secondary',
    value: '#b8c1ec'
  }
}

/**
 * Returns a color object formatted for use with Storybook Docs, or the
 * Storybook Backgrounds addon.
 *
 * @param path - The path of the color to retrieve from {@link Colors} object
 * @param docs - If true, format color object for use with Storybook Docs.
 * Otherwise format for use with Storybook Backgrounds addon
 */
export const getThemeColor = (path: string, docs = true) => {
  if (!_.isString(path)) return {}

  const color = _.get(colors, path, { title: '', subtitle: '', colors: [] })

  if (!docs) return color

  return {
    colors: [color.value],
    title: color.name,
    subtitle: `var(--bs-${path})`
  }
}