import { useGridOptions } from '@system/hooks'
import { renderHook } from '@testing-library/react-hooks'

/**
 * @file Tests - useGridOptions
 * @module tests/hooks/useGridOptions
 */

it('returns an empty string if params.config is an empty object', () => {
  expect(renderHook(() => useGridOptions({})).result.current).toBe('')
})

it("returns an empty string if params.config[breakpoint] === true and params.prefix === 'row'", () => {
  const hook = renderHook(() => useGridOptions({ md: true }, 'row'))

  expect(hook.result.current).toBe('')
})

it('returns "col-${breakpoint}" if params.config[breakpoint] === true', () => {
  const hook = renderHook(() => useGridOptions({ md: true }))

  expect(hook.result.current).toBe('col-md')
})

it('returns "col" if params.config.xs === true', () => {
  const hook = renderHook(() => useGridOptions({ xs: true }))

  expect(hook.result.current).toBe('col')
})

it('returns "col-${breakpoint}-${span}" if params.config[breakpoint] is a number or string', () => {
  const hook = renderHook(() => useGridOptions({ lg: 5 }))

  expect(hook.result.current).toBe('col-lg-5')
})

it('returns "col-${span}" if params.config.xs is defined and the value is a number or string', () => {
  const hook = renderHook(() => useGridOptions({ xs: 5 }))

  expect(hook.result.current).toBe('col-5')
})
