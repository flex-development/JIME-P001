import { act, renderHook } from '@testing-library/react-hooks'
import { useQuantity } from '../useQuantity'

/**
 * @file Unit Tests - useQuantity
 * @module hooks/useQuantity/tests/unit
 */

describe('unit:useQuantity', () => {
  describe('initial state', () => {
    it('sets default quantity state to 1', () => {
      const { result } = renderHook(() => useQuantity())

      expect(result.current.quantity).toBe(1)
    })
  })

  describe('actions', () => {
    describe('updateQuantity', () => {
      it('updates quantity state', () => {
        const { result } = renderHook(() => useQuantity())

        const NEW_QUANTITY = 3

        act(() => {
          result.current.updateQuantity(NEW_QUANTITY)
        })

        expect(result.current.quantity).toBe(NEW_QUANTITY)
      })
    })
  })
})
