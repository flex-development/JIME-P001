import { breakpointInfix, GRID_BREAKPOINTS } from '@system/utils'

/**
 * @file Tests - breakpointInfix
 * @module tests/lib/utils/breakpointInfix
 */

it('prefixes each breakpoint with a dash if the breakpoint !== "xs"', () => {
  GRID_BREAKPOINTS.forEach(breakpoint => {
    const expected = breakpoint === 'xs' ? '' : `-${breakpoint}`
    expect(breakpointInfix(breakpoint)).toBe(expected)
  })
})
