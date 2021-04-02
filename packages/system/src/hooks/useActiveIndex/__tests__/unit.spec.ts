import { act, renderHook } from '@testing-library/react-hooks'
import { useActiveIndex } from '../useActiveIndex'

/**
 * @file Unit Tests - useActiveIndex
 * @module hooks/useActiveIndex/tests/unit
 */

describe('unit:useActiveIndex', () => {
  describe('initial state', () => {
    it('sets default active index to 0', () => {
      const { result } = renderHook(() => useActiveIndex())

      expect(result.current.active).toBe(0)
    })

    it('sets default active index to -1 if args[0] === empty string', () => {
      const { result } = renderHook(() => useActiveIndex(''))

      expect(result.current.active).toBe(-1)
    })
  })

  describe('actions', () => {
    const active_index = 13

    describe('decreaseIndex', () => {
      it('by 1', () => {
        const { result } = renderHook(() => useActiveIndex(active_index))

        act(() => {
          result.current.decreaseIndex()
        })

        expect(result.current.active).toBe(active_index - 1)
      })

      it('by value greater than 1', () => {
        const { result } = renderHook(() => useActiveIndex(active_index))

        act(() => {
          result.current.decreaseIndex(active_index)
        })

        expect(result.current.active).toBe(0)
      })
    })

    describe('increaseIndex', () => {
      it('by 1', () => {
        const { result } = renderHook(() => useActiveIndex(active_index))

        act(() => {
          result.current.increaseIndex()
        })

        expect(result.current.active).toBe(active_index + 1)
      })

      it('by value greater than 1', () => {
        const { result } = renderHook(() => useActiveIndex(active_index))

        act(() => {
          result.current.increaseIndex(active_index)
        })

        expect(result.current.active).toBe(active_index * 2)
      })
    })

    describe('isActive', () => {
      it('returns false if state.active !== args[0]', () => {
        const { result } = renderHook(() => useActiveIndex())

        expect(result.current.isActive(active_index)).toBeFalsy()
      })

      it('returns true if state.active === args[0]', () => {
        const { result } = renderHook(() => useActiveIndex())

        expect(result.current.isActive(0)).toBeTruthy()
      })
    })

    describe('setIndex', () => {
      it('sets active index', () => {
        const { result } = renderHook(() => useActiveIndex())

        act(() => {
          result.current.setIndex(active_index)
        })

        expect(result.current.active).toBe(active_index)
      })
    })
  })
})
