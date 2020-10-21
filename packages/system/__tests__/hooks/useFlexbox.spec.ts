import { useFlexbox } from '@system/hooks'
import { renderHook } from '@testing-library/react-hooks'

/**
 * @file Tests - useFlexbox
 * @module tests/hooks/useFlexbox
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/flex/
 */

it('returns an empty string if params.config is an empty object', () => {
  expect(renderHook(() => useFlexbox({})).result.current).toBe('')
})

it('returns a display utility', () => {
  const hook = renderHook(() => useFlexbox({ display: 'flex' }))

  expect(hook.result.current).toBe('d-flex')
})

it('returns a responsive display utility', () => {
  const hook = renderHook(() => useFlexbox({ display: { sm: 'flex' } }))

  expect(hook.result.current).toBe('d-sm-flex')
})

it('returns a direction utility', () => {
  const hook = renderHook(() => useFlexbox({ direction: 'row' }))

  expect(hook.result.current).toBe('flex-row')
})

it('returns a responsive direction utility', () => {
  const hook = renderHook(() => useFlexbox({ direction: { sm: 'row' } }))

  expect(hook.result.current).toBe('flex-sm-row')
})

it('returns a justify-content utility', () => {
  const hook = renderHook(() => useFlexbox({ justify: 'end' }))

  expect(hook.result.current).toBe('justify-content-end')
})

it('returns a responsive justify-content utility', () => {
  const hook = renderHook(() => useFlexbox({ justify: { sm: 'end' } }))

  expect(hook.result.current).toBe('justify-content-sm-end')
})

it('returns an align-items utility', () => {
  const hook = renderHook(() => useFlexbox({ align: 'end' }))

  expect(hook.result.current).toBe('align-items-end')
})

it('returns a responsive align-items utility', () => {
  const hook = renderHook(() => useFlexbox({ align: { sm: 'end' } }))

  expect(hook.result.current).toBe('align-items-sm-end')
})

it('returns a wrap utility', () => {
  const hook = renderHook(() => useFlexbox({ wrap: 'wrap' }))

  expect(hook.result.current).toBe('flex-wrap')
})

it('returns a responsive wrap utility', () => {
  const hook = renderHook(() => useFlexbox({ wrap: { sm: 'wrap' } }))

  expect(hook.result.current).toBe('flex-sm-wrap')
})
