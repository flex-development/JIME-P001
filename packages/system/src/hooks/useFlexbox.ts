import {
  FLEXBOX_CONFIG_KEYS,
  FLEXBOX_PROPERTY_MAP,
  GRID_BREAKPOINTS
} from '@system/config'
import { FlexboxUtilitiesConfig, GridBreakpoint } from '@system/types'
import { getResponsiveUtilities } from '@system/utils'
import classnames from 'classnames'
import { isBoolean, isEmpty, isNumber, isString } from 'lodash'

/**
 * @file Generate flexbox utility classes
 * @module hooks/useFlexbox
 */

/**
 * Generates a string of flexbox utility classes.
 *
 * Supports standard and responsive variations for the following flexbox
 * properties:
 *
 * - `align-items`
 * - `display`
 * - `flex-direction`
 * - `flex-wrap`
 * - `justify-content`
 *
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/flex
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 *
 * @param config - Flexbox config
 * @param breakpoints - Breakpoint array to use instead of `GRID_BREAKPOINTS`
 */
export const useFlexbox = (
  config: FlexboxUtilitiesConfig,
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINTS
): string => {
  const dictionary = {}

  // Convert config into Record<string, ResponsiveUtility>
  FLEXBOX_CONFIG_KEYS.forEach(c_key => {
    const value = config[c_key]

    if (isBoolean(value) || isNumber(value) || isString(value)) {
      config[c_key] = { xs: value }
    }
  })

  // Populate dictionary
  FLEXBOX_CONFIG_KEYS.forEach(c_key => {
    let prefix = FLEXBOX_PROPERTY_MAP[c_key]

    if (c_key === 'display') {
      prefix = 'd'
    } else if (c_key === 'direction' || c_key === 'wrap') {
      prefix = 'flex'
    }

    getResponsiveUtilities(prefix, config[c_key], breakpoints).map(classes => {
      dictionary[classes] = !isEmpty(classes)
    })
  })

  return classnames(dictionary)
}
