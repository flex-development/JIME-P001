import { GridBreakpoint } from '../types'

/**
 * @file Responsive utility helper
 * @module utils/breakpointInfix
 */

/**
 * Returns a blank string if {@param breakpoint} is the smallest breakpoint
 * (`xs`), otherwise returns the value with a dash in front.
 *
 * Refer to the Sass theme settings to see the dimensions for each breakpoint.
 *
 * Possible breakpoints: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `jumbo`
 *
 * @param breakpoint - Breakpoint key
 */
export const breakpointInfix = (breakpoint: GridBreakpoint): string => {
  return breakpoint !== 'xs' ? `-${breakpoint}` : ''
}
