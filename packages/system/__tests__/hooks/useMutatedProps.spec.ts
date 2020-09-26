import { useMutatedProps } from '@kustomz/lib'
import { renderHook } from '@testing-library/react-hooks'

/**
 * @file Unit Tests - useMutatedProps
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

it('adds the class "bg-dark" using the `variant` property', () => {
  const hook = renderHook(() => useMutatedProps({ variant: 'dark' }))

  expect(hook.result.current).toMatchObject({ className: 'bg-dark' })
})

it('adds the classes "btn btn-primary" using the `variant` property', () => {
  const hook = renderHook(() =>
    useMutatedProps(
      { variant: 'primary' },
      {
        btn: true
      }
    )
  )

  expect(hook.result.current).toMatchObject({ className: 'btn btn-primary' })
})
