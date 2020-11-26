import { act, renderHook } from '@testing-library/react-hooks'
import { useQuantity } from './useQuantity'

/**
 * @file Tests - useQuantity
 * @module tests/hooks/useQuantity
 */

it('initializes the quantity state to 1', () => {
  const { result } = renderHook(() => useQuantity())

  expect(result.current.quantity).toBe(1)
})

it('sets the quantity to a new value', () => {
  const { result } = renderHook(() => useQuantity())

  const NEW_QUANTITY = 3

  act(() => {
    result.current.updateQuantity(NEW_QUANTITY)
  })

  expect(result.current.quantity).toBe(NEW_QUANTITY)
})
