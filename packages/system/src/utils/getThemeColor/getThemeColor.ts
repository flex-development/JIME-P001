import colors from '@system/config/colors'
import {
  ColorItemProps,
  StorybookBackgroundColorConfig
} from '@system/types/storybook'
import { get, isString } from 'lodash'

/**
 * @file Get a color item object to use with Storybook Backgrounds / Docs
 * @module utils/getThemeColor/impl
 */

/**
 * Returns a color object formatted for use with Storybook Docs, or the
 * Storybook Backgrounds addon.
 *
 * @param path - The path of the color to retrieve from {@link Colors} object
 * @param docs - If true, format color object for use with Storybook Docs.
 * Otherwise format for use with Storybook Backgrounds addon
 */
const getThemeColor = (
  path: string,
  docs = true
): StorybookBackgroundColorConfig | ColorItemProps => {
  if (!isString(path)) return {} as ColorItemProps

  const color: StorybookBackgroundColorConfig = get(colors, path, {
    colors: [],
    subtitle: '',
    title: ''
  })

  if (!docs) return color

  return {
    colors: [color.value],
    subtitle: `var(--bs-${path})`,
    title: color.name
  }
}

export default getThemeColor
