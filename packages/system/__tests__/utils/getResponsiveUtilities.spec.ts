import {
  FlexboxDirection,
  GridSpanUtilitiesConfig,
  ResponsiveUtility
} from '@system/types'
import { getResponsiveUtilities } from '@system/utils'

/**
 * @file Tests - getResponsiveUtilities
 * @module tests/lib/utils/getResponsiveUtilities
 */

it('returns an array of responsive grid column classes', () => {
  const utilties: GridSpanUtilitiesConfig = { sm: 4, xs: true }

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
