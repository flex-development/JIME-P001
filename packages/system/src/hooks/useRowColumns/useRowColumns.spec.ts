import { renderHook } from '@testing-library/react-hooks'
import { useRowColumns } from './useRowColumns'

/**
 * @file Tests - useRowColumns
 * @module tests/hooks/useRowColumns
 */

it('returns an empty string if params.config is an empty object', () => {
  expect(renderHook(() => useRowColumns({})).result.current).toBe('')
})

it('returns "row-cols-${span}"', () => {
  const hook = renderHook(() => useRowColumns({ xs: 5 }))

  expect(hook.result.current).toBe('row-cols-5')
})

it('returns "row-cols-${breakpoint}-${span}"', () => {
  const hook = renderHook(() => useRowColumns({ md: 4 }))

  expect(hook.result.current).toBe('row-cols-md-4')
})
