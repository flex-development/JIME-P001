import type { AnyObject } from '@flex-development/json/utils/types'
import type { CheckoutLineItemInput } from '@kustomzcore/types'
import { act, renderHook } from '@testing-library/react-hooks'
import isPlainObject from 'lodash/isPlainObject'
import { useCheckoutLineItemInput } from './useCheckoutLineItemInput'

/**
 * @file Tests - useCheckoutLineItemInput
 * @module tests/hooks/useCheckoutLineItemInput
 */

describe('useCheckoutLineItemInput', () => {
  const MOCK_INPUT = { variant_id: -1 } as CheckoutLineItemInput

  it('defaults to one product with zero custom attributes', () => {
    const { result } = renderHook(() => useCheckoutLineItemInput(MOCK_INPUT))
    const { properties, quantity, variant_id } = result.current.item

    expect(isPlainObject(properties)).toBeTruthy()
    expect(quantity).toBe(1)
    expect(variant_id).toBe(MOCK_INPUT.variant_id)
  })

  it('updates the line item quantity', () => {
    const { result } = renderHook(() => useCheckoutLineItemInput(MOCK_INPUT))

    const NEW_QUANTITY = 2

    act(() => {
      result.current.updateQuantity(NEW_QUANTITY)
    })

    expect(result.current.item.quantity).toBe(2)
  })

  it('adds a new custom property for a line item', () => {
    const { result } = renderHook(() => useCheckoutLineItemInput(MOCK_INPUT))
    const new_properties = { key: 'key' }

    act(() => {
      result.current.updateProperties(new_properties)
    })

    const properties = result.current.item.properties as AnyObject

    expect(isPlainObject(properties)).toBeTruthy()
    expect(Object.keys(properties).length).toBe(1)
    expect(properties).toMatchObject(new_properties)
  })
})
