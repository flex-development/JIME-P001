import { GRID_BREAKPOINT_KEYS } from '@system/config/constants'
import type { GridBreakpointKey, UtilityClassConfig } from '@system/types'
import genclass from '@system/utils/genclass'
import isObject from 'lodash/isObject'

/**
 * @file Implementation - genclasses
 * @module utils/genclasses
 */

/**
 * Returns an array of classes.
 *
 * @param {string} prefix - Class name prefix
 * @param {UtilityClassConfig} [utilities] - Object with utility class values
 * for each breakpoint, or single value (will be converted into object)
 * @param {GridBreakpointKey[]} [breakpoints] - Array of grid breakpoint keys
 * @return {string[]} Array of classnames
 */
const genclasses = (
  prefix: string,
  utilities: UtilityClassConfig = {},
  breakpoints: GridBreakpointKey[] = GRID_BREAKPOINT_KEYS
): string[] => {
  utilities = isObject(utilities) ? utilities : { xs: utilities }

  return breakpoints.map(breakpoint => {
    return genclass(prefix, utilities[breakpoint], breakpoint)
  })
}

export default genclasses
