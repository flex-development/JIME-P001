import CHECKOUT_LINE_ITEMS from '@system/tests/fixtures/checkout-line-items'
import getItemsTotal from '..'

/**
 * @file Unit Tests - getItemsTotal
 * @module utils/getItemsTotal/tests/unit
 */

describe('unit:getItemsTotal', () => {
  it('uses line item quantity to calculate the total number of items', () => {
    expect(getItemsTotal(CHECKOUT_LINE_ITEMS)).toEqual(4)
  })
})
