import { GRID_BREAKPOINT_KEYS } from '@system/config/constants'
import breakpointInfix from '..'

/**
 * @file Unit Tests - breakpointInfix
 * @module utils/breakpointInfix/tests/unit
 */

describe('unit:breakpointInfix', () => {
  it('prefixes each breakpoint with a dash if breakpoint !== "xs"', () => {
    GRID_BREAKPOINT_KEYS.forEach(breakpoint => {
      const expected = breakpoint === 'xs' ? '' : `${breakpoint}:`

      expect(breakpointInfix(breakpoint)).toBe(expected)
    })
  })
})
