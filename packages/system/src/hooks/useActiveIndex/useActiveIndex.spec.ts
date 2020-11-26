import { act, renderHook } from '@testing-library/react-hooks'
import { useActiveIndex } from './useActiveIndex'

/**
 * @file Tests - useActiveIndex
 * @module tests/hooks/useActiveIndex
 */

it('sets the default active index to 0', () => {
  const { result } = renderHook(() => useActiveIndex())

  expect(result.current.active).toBe(0)
  expect(result.current.isActive(0)).toBeTruthy()
})

it('sets the default active index to -1 if args.intitialActive is an empty string', () => {
  const { result } = renderHook(() => useActiveIndex(''))

  expect(result.current.active).toBe(-1)
  expect(result.current.isActive(-1)).toBeTruthy()
})

it('updates the active index', () => {
  const { result } = renderHook(() => useActiveIndex())

  const active_index = 13

  act(() => {
    result.current.setIndex(active_index)
  })

  expect(result.current.active).toBe(active_index)
})

it('returns false if the active state is 0 and current index is not', () => {
  const { result } = renderHook(() => useActiveIndex())

  expect(result.current.isActive(1)).toBeFalsy()
})

it('returns true if the active state is not 0, but the active state and current index are equal', () => {
  const { result } = renderHook(() => useActiveIndex())

  const active_index = 9

  act(() => {
    result.current.setIndex(active_index)
  })

  expect(result.current.isActive(active_index)).toBeTruthy()
})

it('returns false if the active state is not 0, and the active state and current index are not equal', () => {
  const { result } = renderHook(() => useActiveIndex())

  act(() => {
    result.current.setIndex(1)
  })

  expect(result.current.isActive(7)).toBeFalsy()
})
