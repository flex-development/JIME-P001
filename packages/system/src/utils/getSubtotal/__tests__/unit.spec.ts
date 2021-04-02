import CHECKOUT_LINE_ITEMS from '@system/tests/fixtures/checkout-line-items'
import getSubtotal from '..'

/**
 * @file Unit Tests - getSubtotal
 * @module utils/getSubtotal/tests/unit
 */

describe('unit:getSubtotal', () => {
  const item = CHECKOUT_LINE_ITEMS[0]
  const item1 = CHECKOUT_LINE_ITEMS[1]

  it('args[0].length === 0', () => {
    const subtotal = getSubtotal([])

    expect(subtotal).toBe(0)
  })

  it('args[0].length === 1', () => {
    const subtotal = getSubtotal([item])

    expect(subtotal).toBe(item.quantity * JSON.parse(item.price))
  })

  it('args[0].length > 1', () => {
    const subtotal = getSubtotal([item, item1])

    const expected = item.quantity * JSON.parse(item.price)
    const expected1 = item1.quantity * JSON.parse(item1.price)

    expect(subtotal).toBe(expected + expected1)
  })
})
