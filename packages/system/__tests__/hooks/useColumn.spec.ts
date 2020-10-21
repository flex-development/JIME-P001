import { useColumn } from '@system/hooks'
import { renderHook } from '@testing-library/react-hooks'

/**
 * @file Tests - useColumn
 * @module tests/hooks/useColumn
 */

it('returns "col" if params.config is an empty object', () => {
  expect(renderHook(() => useColumn({})).result.current).toBe('col')
})

it('returns "col" if params.config.xs === true', () => {
  const hook = renderHook(() => useColumn({ xs: true }))

  expect(hook.result.current).toBe('col')
})

it('returns "col-${breakpoint}" if params.config[breakpoint] === true', () => {
  const hook = renderHook(() => useColumn({ md: true }))

  expect(hook.result.current).toBe('col-md')
})

it('returns "col-${breakpoint}-${span}" if params.config[breakpoint] is a number or string', () => {
  const hook = renderHook(() => useColumn({ lg: 5 }))

  expect(hook.result.current).toBe('col-lg-5')
})

it('returns "col-${span}" if params.config.xs is defined and the value is a number or string', () => {
  const hook = renderHook(() => useColumn({ xs: 5 }))

  expect(hook.result.current).toBe('col-5')
})
