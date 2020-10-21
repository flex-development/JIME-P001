import { createResponsiveUtility } from '@system/utils'

/**
 * @file Tests - createResponsiveUtility
 * @module tests/lib/utils/createResponsiveUtility
 */

it('returns an empty string if breakpoint value is falsy', () => {
  expect(createResponsiveUtility('col', 'md')).toEqual('')
  expect(createResponsiveUtility('col', 'sm', false)).toEqual('')
})

it('returns the class "col-sm-4"', () => {
  expect(createResponsiveUtility('col', 'sm', 4)).toEqual('col-sm-4')
})

it('returns the class "flex-row"', () => {
  expect(createResponsiveUtility('flex', 'xs', 'row')).toEqual('flex-row')
})
