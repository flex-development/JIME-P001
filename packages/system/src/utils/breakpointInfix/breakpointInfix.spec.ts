import { GRID_BREAKPOINT_KEYS } from '@system/config/constants'
import breakpointInfix from './breakpointInfix'

/**
 * @file Tests - breakpointInfix
 * @module utils/breakpointInfix/spec
 */

it('prefixes each breakpoint with a dash if the breakpoint !== "xs"', () => {
  GRID_BREAKPOINT_KEYS.forEach(breakpoint => {
    const expected = breakpoint === 'xs' ? '' : `${breakpoint}:`
    expect(breakpointInfix(breakpoint)).toBe(expected)
  })
})
