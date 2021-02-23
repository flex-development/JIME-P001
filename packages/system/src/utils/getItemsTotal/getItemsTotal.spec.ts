import { LINE_ITEMS } from '@tests/system/__mocks__/utils'
import getItemsTotal from './getItemsTotal'

/**
 * @file Tests - getItemsTotal
 * @module utils/getItemsTotal/spec
 */

describe('getItemsTotal', () => {
  it('uses line item quantity to calculate the total number of items', () => {
    expect(getItemsTotal(LINE_ITEMS)).toEqual(4)
  })
})
