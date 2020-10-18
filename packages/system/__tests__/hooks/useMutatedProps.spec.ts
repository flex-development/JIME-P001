import { useMutatedProps } from '@system/hooks'
import { renderHook } from '@testing-library/react-hooks'

/**
 * @file Tests - useMutatedProps
 * @module tests/hooks/useMutatedProps
 */

it('returns an empty object', () => {
  const hook = renderHook(() => useMutatedProps({}))

  expect(hook.result.current).toMatchObject({})
})

it('sets props.dangerouslySetInnerHTML', () => {
  const innerHTML = '<h1>Hello, World</h1>'
  const hook = renderHook(() => useMutatedProps({ innerHTML }))

  expect(hook.result.current).toMatchObject({
    dangerouslySetInnerHTML: { __html: innerHTML }
  })
})

it('adds the class "d-flex" using the `flex` property', () => {
  const hook = renderHook(() => useMutatedProps({ flex: true }))

  expect(hook.result.current).toMatchObject({ className: 'd-flex' })
})

it('adds the class "d-inline-flex" using the `flex` property', () => {
  const hook = renderHook(() => useMutatedProps({ flex: 'inline' }))

  expect(hook.result.current).toMatchObject({ className: 'd-inline-flex' })
})

it('removes the "class" property if it is an empty string', () => {
  const hook = renderHook(() => useMutatedProps({ className: '' }))

  expect(hook.result.current).toMatchObject({})
})
