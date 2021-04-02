import type { GridBreakpointKey } from '@system/types'

/**
 * @file Implementation - breakpointInfix
 * @module utils/breakpointInfix
 */

/**
 * Returns an empty string if {@param breakpoint} is the smallest breakpoint
 * (`xs`), otherwise returns the value with a `:` appended.
 *
 * Refer to the Sass theme settings to see the dimensions for each breakpoint.
 *
 * Possible breakpoints: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
 *
 * @param {GridBreakpointKey} breakpoint - Breakpoint key
 * @return {string} Empty string or `${breakpoint}:`
 */
const breakpointInfix = (breakpoint: GridBreakpointKey): string => {
  return breakpoint !== 'xs' ? `${breakpoint}:` : ''
}

export default breakpointInfix
