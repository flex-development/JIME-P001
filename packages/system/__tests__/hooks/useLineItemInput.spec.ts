import { useLineItemInput } from '@system/hooks'
import { act, renderHook } from '@testing-library/react-hooks'

/**
 * @file Tests - useLineItemInput
 * @module tests/hooks/useLineItemInput
 */

it('defaults to one product with zero custom attributes', () => {
  const VARIANT_ID = 'variantId'

  const { result } = renderHook(() => useLineItemInput(VARIANT_ID))

  expect(result.current.input.customAttributes.length).toBe(0)
  expect(result.current.input.quantity).toBe(1)
  expect(result.current.input.variantId).toBe(VARIANT_ID)
})

it('updates the line item quantity', () => {
  const VARIANT_ID = 'variantId'

  const { result } = renderHook(() => useLineItemInput(VARIANT_ID))

  const NEW_QUANTITY = 2

  act(() => {
    result.current.updateQuantity(NEW_QUANTITY)
  })

  expect(result.current.input.quantity).toBe(2)
})

it('adds a new custom attribute for a line item', () => {
  const VARIANT_ID = 'variantId'

  const { result } = renderHook(() => useLineItemInput(VARIANT_ID))

  const attribute = { key: 'key', value: 'value' }

  act(() => {
    result.current.updateAttribute(attribute.key, attribute.value)
  })

  expect(result.current.input.customAttributes.length).toBe(1)
  expect(result.current.input.customAttributes[0]).toMatchObject(attribute)
})
