import { GRID_BREAKPOINT_KEYS } from '@system/config'
import breakpointInfix from '@system/utils/breakpointInfix'

/**
 * @file Tests - breakpointInfix
 * @module tests/lib/utils/breakpointInfix
 */

it('prefixes each breakpoint with a dash if the breakpoint !== "xs"', () => {
  GRID_BREAKPOINT_KEYS.forEach(breakpoint => {
    const expected = breakpoint === 'xs' ? '' : `-${breakpoint}`
    expect(breakpointInfix(breakpoint)).toBe(expected)
  })
})
