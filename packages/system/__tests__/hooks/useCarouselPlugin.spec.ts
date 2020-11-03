import { useCarouselPlugin } from '@system/hooks/useCarouselPlugin'
import { act, renderHook } from '@testing-library/react-hooks'

/**
 * @file Tests - useCarouselPlugin
 * @module tests/hooks/useCarouselPlugin
 */

it('initializes the bootstrap carousel plugin and active state', () => {
  const ref = { current: document.createElement('div') }
  const { result } = renderHook(() => useCarouselPlugin(ref))

  expect(result.current.carousel).toBeDefined()
  expect(result.current.active).toBe(0)
})

it('updates the active index', () => {
  const ref = { current: document.createElement('div') }
  const { result } = renderHook(() => useCarouselPlugin(ref))

  expect(result.current.active).toBe(0)

  const active_index = 1

  act(() => {
    result.current.setActive(active_index)
  })

  expect(result.current.active).toBe(active_index)
})

it('returns true if the active state and current index are 0', () => {
  const ref = { current: document.createElement('div') }
  const { result } = renderHook(() => useCarouselPlugin(ref))

  expect(result.current.isActive(0)).toBeTruthy()
})

it('returns false if the active state is 0 and current index is not', () => {
  const ref = { current: document.createElement('div') }
  const { result } = renderHook(() => useCarouselPlugin(ref))

  expect(result.current.isActive(1)).toBeFalsy()
})

it('returns true if the active state is not 0, but the active state and current index are equal', () => {
  const ref = { current: document.createElement('div') }
  const { result } = renderHook(() => useCarouselPlugin(ref))

  const active_index = 1

  act(() => {
    result.current.setActive(active_index)
  })

  expect(result.current.isActive(active_index)).toBeTruthy()
})

it('returns false if the active state is not 0, and the active state and current index are not equal', () => {
  const ref = { current: document.createElement('div') }
  const { result } = renderHook(() => useCarouselPlugin(ref))

  act(() => {
    result.current.setActive(1)
  })

  expect(result.current.isActive(0)).toBeFalsy()
})
