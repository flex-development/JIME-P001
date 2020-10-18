import { FlexboxUtilitiesConfig, GridBreakpoint } from '@system/types'
import {
  breakpointInfix,
  FLEXBOX_CONFIG_KEYS,
  FLEXBOX_PROPERTY_MAP,
  GRID_BREAKPOINTS
} from '@system/utils'
import classnames from 'classnames'
import { isObject, isString } from 'lodash'

/**
 * @file Generate flexbox utility classes
 * @module hooks/useFlexboxUtilities
 *
 * @todo Add comments
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
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/flex/
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 *
 * @param config - Flexbox config
 * @param breakpoints - Breakpoint array to use instead of `GRID_BREAKPOINTS`
 */
export const useFlexboxUtilities = (
  config: FlexboxUtilitiesConfig,
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINTS
): string => {
  const dictionary = {}

  FLEXBOX_CONFIG_KEYS.forEach(c_key => {
    const config_value = config[c_key]
    const prop = FLEXBOX_PROPERTY_MAP[c_key]

    const display = prop === 'display'
    const direction_or_wrap = prop === 'flex-direction' || prop === 'flex-wrap'

    if (isString(config_value)) {
      if (display) {
        dictionary[`d-${config_value}`] = true
      } else if (direction_or_wrap) {
        dictionary[`flex-${config_value}`] = true
      } else {
        dictionary[`${prop}-${config_value}`] = true
      }
    } else if (isObject(config_value)) {
      breakpoints.forEach(breakpoint => {
        const b_value = config_value[breakpoint]

        if (!b_value) return

        const infix = breakpointInfix(breakpoint)
        const infix_with_value = `${infix}-${b_value}`

        if (display) {
          dictionary[`d${infix_with_value}`] = true
        } else if (direction_or_wrap) {
          dictionary[`flex${infix_with_value}`] = true
        } else {
          dictionary[`${prop}${infix_with_value}`] = true
        }
      })
    }
  })

  return classnames(dictionary)
}
