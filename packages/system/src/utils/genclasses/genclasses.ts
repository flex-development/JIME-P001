import { GRID_BREAKPOINT_KEYS } from '@system/config/constants'
import type { UtilityClassConfig } from '@system/types'
import { genclass } from '@system/utils/genclass'
import isObject from 'lodash/isObject'

/**
 * @file Implementation - genclasses
 * @module utils/genclasses/impl
 */

/**
 * Returns an array of classes.
 *
 * @param prefix - Class name prefix
 * @param utilties - Object with utility class values for each breakpoint, or
 * single value (will be converted into object)
 * @param breakpoints - Array of grid breakpoint keys
 */
const genclasses = (
  prefix: string,
  utilities: UtilityClassConfig = {},
  breakpoints = GRID_BREAKPOINT_KEYS
): string[] => {
  utilities = isObject(utilities) ? utilities : { xs: utilities }

  return breakpoints.map(breakpoint => {
    return genclass(prefix, utilities[breakpoint], breakpoint)
  })
}

export default genclasses
