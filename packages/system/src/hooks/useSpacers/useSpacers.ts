import {
  GridBreakpoint,
  ResponsiveUtility,
  Spacer,
  SpacerPrefix
} from '@flex-development/types'
import { GRID_BREAKPOINT_KEYS } from '@system/config'
import { getResponsiveUtilities } from '@system/utils'
import classnames from 'classnames'
import { isEmpty, isObject } from 'lodash'

/**
 * @file Generate gutter, margin, or padding utility classes
 * @module hooks/useSpacers
 */

/**
 * Generates a string of gutter, margin, or padding utility classes.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/gutters
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/spacing
 *
 * @param config - Gutter, margin, or padding utilities config
 * @param prefix - Gutter, margin, or padding utility class prefix
 * @param breakpoints - Breakpoint keys to use instead of `GRID_BREAKPOINT_KEYS`
 */
export const useSpacers = (
  prefix: SpacerPrefix,
  config: Spacer | ResponsiveUtility<Spacer>,
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINT_KEYS
): string => {
  const dictionary = {}

  config = isObject(config) ? config : { xs: config }

  breakpoints.forEach(breakpoint => {
    const value = config[breakpoint]

    if (value === 0 || value) {
      getResponsiveUtilities(prefix, config, breakpoints).map(classes => {
        dictionary[classes] = !isEmpty(classes)
      })
    }
  })

  return classnames(dictionary).trim()
}
