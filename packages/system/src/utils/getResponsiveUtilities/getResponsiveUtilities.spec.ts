import {
  Columns,
  FlexboxDirection,
  ResponsiveUtility
} from '@flex-development/types'
import getResponsiveUtilities from './getResponsiveUtilities'

/**
 * @file Tests - getResponsiveUtilities
 * @module tests/lib/utils/getResponsiveUtilities
 */

it('returns an array of responsive grid column classes', () => {
  const utilties: ResponsiveUtility<boolean | Columns> = { sm: 4, xs: true }

  const classes = getResponsiveUtilities('col', utilties)

  const expected = ['col', 'col-sm-4', '', '', '', '']

  expect(classes).toEqual(expect.arrayContaining(expected))
})

it('returns an array of responsive flex-direction classes', () => {
  const utilties: ResponsiveUtility<FlexboxDirection> = {
    sm: 'row',
    xs: 'column'
  }

  const classes = getResponsiveUtilities('flex', utilties)

  const expected = ['flex-column', 'flex-sm-row', '', '', '']

  expect(classes).toEqual(expect.arrayContaining(expected))
})
