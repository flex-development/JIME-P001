import { useSpacers } from '@system/hooks'
import { renderHook } from '@testing-library/react-hooks'

/**
 * @file Tests - useSpacers
 * @module tests/hooks/useSpacers
 */

it('returns an empty string if params.config is an empty object', () => {
  expect(renderHook(() => useSpacers('gx', {})).result.current).toBe('')
})

it('returns "gy-${gutter}"', () => {
  const prefix = 'gy'
  const gutter_y = 24

  const hook = renderHook(() => useSpacers(prefix, gutter_y))

  expect(hook.result.current).toBe(`${prefix}-${gutter_y}`)
})

it('returns "gx-${breakpoint}-${gutter}"', () => {
  const prefix = 'gx'
  const gutter_x = 8

  const hook = renderHook(() => useSpacers(prefix, { lg: gutter_x }))

  expect(hook.result.current).toBe(`${prefix}-lg-${gutter_x}`)
})

it('returns "mb-${margin}"', () => {
  const prefix = 'mb'
  const margin_bottom = 12

  const hook = renderHook(() => useSpacers(prefix, margin_bottom))

  expect(hook.result.current).toBe(`${prefix}-${margin_bottom}`)
})

it('returns "my-${margin}"', () => {
  const prefix = 'my'
  const margin_y = 0

  const hook = renderHook(() => useSpacers(prefix, margin_y))

  expect(hook.result.current).toBe(`${prefix}-${margin_y}`)
})

it('returns "mb-${margin} mb-${breakpoint}-${margin}"', () => {
  const prefix = 'mb'

  const hook = renderHook(() => useSpacers(prefix, { sm: 0, xs: 24 }))

  expect(hook.result.current).toBe('mb-24 mb-sm-0')
})

it('returns "pr-${padding}"', () => {
  const prefix = 'pr'
  const padding_right = 36

  const hook = renderHook(() => useSpacers('pr', { xs: padding_right }))

  expect(hook.result.current).toBe(`${prefix}-${padding_right}`)
})

it('returns "pr-${breakpoint}-${padding}"', () => {
  const prefix = 'pr'
  const padding_right = 48

  const hook = renderHook(() => useSpacers(prefix, { lg: padding_right }))

  expect(hook.result.current).toBe(`${prefix}-lg-${padding_right}`)
})
