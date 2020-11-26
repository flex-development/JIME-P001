import { Primitive, ResponsiveUtility } from '@flex-development/types'
import { GRID_BREAKPOINT_KEYS } from '@system/config/constants'
import { isObject } from 'lodash'
import { createResponsiveUtility } from '../creativeResponsiveUtility'

/**
 * @file Returns an array of responsive utility classes
 * @module utils/getResponsiveUtilities
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/api
 */

/**
 * Returns an array of responsive utility classes.
 *
 * @param prefix - Value to prefix breakpoint infix
 * @param utilties - Responsive utilties map
 * @param breakpoints - Map to use instead of `GRID_BREAKPOINT_KEYS`
 */
const getResponsiveUtilities = (
  prefix: string,
  utilities: Primitive | ResponsiveUtility = {},
  breakpoints = GRID_BREAKPOINT_KEYS
): string[] => {
  utilities = isObject(utilities) ? utilities : { xs: utilities }

  return breakpoints.map(breakpoint => {
    return createResponsiveUtility(prefix, breakpoint, utilities[breakpoint])
  })
}

export default getResponsiveUtilities
