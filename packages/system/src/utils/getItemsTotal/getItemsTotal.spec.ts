import LINE_ITEMS from '@system-mocks/data/checkout-line-items.mock.json'
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
