import { GRID_BREAKPOINTS } from '@system/config/constants'
import { Primitive, ResponsiveUtility } from '@system/types'
import { isObject } from 'lodash'
import createResponsiveUtility from './createResponsiveUtility'

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
 * @param breakpoints - Map to use instead of `GRID_BREAKPOINTS`
 */
const getResponsiveUtilities = (
  prefix: string,
  utilities: Primitive | ResponsiveUtility = {},
  breakpoints = GRID_BREAKPOINTS
): string[] => {
  utilities = isObject(utilities) ? utilities : { xs: utilities }

  return breakpoints.map(breakpoint => {
    return createResponsiveUtility(prefix, breakpoint, utilities[breakpoint])
  })
}

export default getResponsiveUtilities
