import { ResponsiveUtility } from '@system/types'
import { GRID_BREAKPOINTS } from '.'
import { createResponsiveUtility } from './createResponsiveUtility'

/**
 * @file Returns an array of responsive utility classes
 * @module utils/getResponsiveUtilities
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/api/
 */

/**
 * Returns an array of responsive utility classes.
 *
 * @todo Add example usage an output
 *
 * @param prefix - Value to prefix breakpoint infix
 * @param utilties - Responsive utilties map
 * @param breakpoints - Map to use instead of `GRID_BREAKPOINTS`
 */
export const getResponsiveUtilities = (
  prefix: string,
  utilities: ResponsiveUtility = {},
  breakpoints = GRID_BREAKPOINTS
): string[] => {
  return breakpoints.map(breakpoint => {
    return createResponsiveUtility(prefix, breakpoint, utilities[breakpoint])
  })
}
