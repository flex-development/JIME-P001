import { renderHook } from '@testing-library/react-hooks'
import { useColumn } from './useColumn'

/**
 * @file Tests - useColumn
 * @module tests/hooks/useColumn
 */

describe('useColumn', () => {
  it('returns "col" if args.config is an empty object', () => {
    expect(renderHook(() => useColumn({})).result.current).toBe('col')
  })

  it('returns "col" if args.config.xs === true', () => {
    const hook = renderHook(() => useColumn({ xs: true }))

    expect(hook.result.current).toBe('col')
  })

  it('returns "col-${breakpoint}" if args.config[breakpoint] === true', () => {
    const hook = renderHook(() => useColumn({ md: true }))

    expect(hook.result.current).toBe('col-md')
  })

  it('returns "col-${breakpoint}-${span}" if args.config[breakpoint] is a number or string', () => {
    const hook = renderHook(() => useColumn({ lg: 5 }))

    expect(hook.result.current).toBe('col-lg-5')
  })

  it('returns "col-${span}" if args.config.xs is defined and the value is a number or string', () => {
    const hook = renderHook(() => useColumn({ xs: 5 }))

    expect(hook.result.current).toBe('col-5')
  })
})
