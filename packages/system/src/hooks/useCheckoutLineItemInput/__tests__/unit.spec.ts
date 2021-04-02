import type { AnyObject } from '@flex-development/json/utils/types'
import CHECKOUT_LINE_ITEMS from '@system/tests/fixtures/checkout-line-items'
import { act, renderHook } from '@testing-library/react-hooks'
import { useCheckoutLineItemInput } from '../useCheckoutLineItemInput'

/**
 * @file Unit Tests - useCheckoutLineItemInput
 * @module hooks/useCheckoutLineItemInput/tests/unit
 */

describe('unit:useCheckoutLineItemInput', () => {
  const item = CHECKOUT_LINE_ITEMS[0]
  const item1 = CHECKOUT_LINE_ITEMS[1]

  describe('initial state', () => {
    it('when typeof args[0].properties === null', () => {
      const { result } = renderHook(() => useCheckoutLineItemInput(item))
      const { properties, quantity, variant_id } = result.current.item

      expect(properties).toMatchObject({})
      expect(quantity).toBe(item.quantity)
      expect(variant_id).toBe(item.variant_id)
    })

    it('when typeof args[0].properties === object', () => {
      const { result } = renderHook(() => useCheckoutLineItemInput(item1))
      const { properties, quantity, variant_id } = result.current.item

      expect(properties).toMatchObject(item1.properties as AnyObject)
      expect(quantity).toBe(item1.quantity)
      expect(variant_id).toBe(item1.variant_id)
    })
  })

  describe('actions', () => {
    describe('updateProperties', () => {
      it('adds new custom property', () => {
        const { result } = renderHook(() => useCheckoutLineItemInput(item))

        const new_properties = { key: 'key' }

        act(() => {
          result.current.updateProperties(new_properties)
        })

        expect(result.current.item.properties).toMatchObject({
          ...item.properties,
          ...new_properties
        })
      })
    })

    describe('updateQuantity', () => {
      it('updates line item quantity', () => {
        const { result } = renderHook(() => useCheckoutLineItemInput(item1))

        const NEW_QUANTITY = item1.quantity + 2

        act(() => {
          result.current.updateQuantity(NEW_QUANTITY)
        })

        expect(result.current.item.quantity).toBe(NEW_QUANTITY)
      })
    })
  })
})
