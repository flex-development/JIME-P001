import { useMutatedProps } from '@system/hooks/useMutatedProps'
import { renderHook } from '@testing-library/react-hooks'

/**
 * @file Tests - useMutatedProps
 * @module tests/hooks/useMutatedProps
 */

it('returns an empty object', () => {
  const hook = renderHook(() => useMutatedProps({}))

  expect(hook.result.current).toMatchObject({})
})

it('adds the class "mb-24" using the `mb` property', () => {
  const hook = renderHook(() => useMutatedProps({ mb: 24 }))

  expect(hook.result.current).toMatchObject({ className: 'mb-24' })
})

it('adds the class "pt-sm-72" using the `pt` property', () => {
  const hook = renderHook(() => useMutatedProps({ pt: { sm: 72 } }))

  expect(hook.result.current).toMatchObject({ className: 'pt-sm-72' })
})

it('adds the class "d-flex" using the `flex` property', () => {
  const hook = renderHook(() => useMutatedProps({ flex: true }))

  expect(hook.result.current).toMatchObject({ className: 'd-flex' })
})

it('adds the class "d-inline-flex" using the `flex` property', () => {
  const hook = renderHook(() => useMutatedProps({ flex: 'inline' }))

  expect(hook.result.current).toMatchObject({ className: 'd-inline-flex' })
})

it('sets props.style.backgroundImage', () => {
  const img = 'assets/placeholder.png'
  const hook = renderHook(() => useMutatedProps({ img }))

  expect(hook.result.current).toMatchObject({
    style: { backgroundImage: `url(${img})` }
  })
})

it('sets props.dangerouslySetInnerHTML', () => {
  const innerHTML = '<h1>Hello, World</h1>'
  const hook = renderHook(() => useMutatedProps({ innerHTML }))

  expect(hook.result.current).toMatchObject({
    dangerouslySetInnerHTML: { __html: innerHTML }
  })
})

it('removes the "class" property if it is an empty string', () => {
  const hook = renderHook(() => useMutatedProps({ className: '' }))

  expect(hook.result.current).toMatchObject({})
})
