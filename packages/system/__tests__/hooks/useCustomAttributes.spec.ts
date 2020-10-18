import { useCustomAttributes } from '@system/hooks'
import { act, renderHook } from '@testing-library/react-hooks'

/**
 * @file Tests - useCustomAttributes
 * @module tests/hooks/useCustomAttributes
 */

it('initializes the customAttributes state to an empty array ([])', () => {
  const { result } = renderHook(() => useCustomAttributes())

  expect(result.current.customAttributes.length).toBe(0)
})

it('adds, updates, and removes a custom attribute', () => {
  const { result } = renderHook(() => useCustomAttributes())

  act(() => {
    result.current.updateAttribute('key', 'value')
  })

  expect(result.current.customAttributes.length).toBe(1)

  expect(result.current.customAttributes).toEqual(
    expect.arrayContaining([
      {
        key: 'key',
        value: 'value'
      }
    ])
  )

  act(() => {
    result.current.updateAttribute('key', 'new value')
  })

  expect(result.current.customAttributes[0].value).toBe('new value')

  act(() => {
    result.current.removeAttribute('key')
  })

  expect(result.current.customAttributes.length).toBe(0)
})
