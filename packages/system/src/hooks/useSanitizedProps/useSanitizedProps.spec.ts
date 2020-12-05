import { renderHook } from '@testing-library/react-hooks'
import { useSanitizedProps } from './useSanitizedProps'

/**
 * @file Tests - useSanitizedProps
 * @module hooks/useSanitizedProps/spec
 */

it('returns an empty object', () => {
  const hook = renderHook(() => useSanitizedProps({}))

  expect(hook.result.current).toMatchObject({})
})

it('adds the class "mb-24" using the `mb` property', () => {
  const hook = renderHook(() => useSanitizedProps({ mb: 24 }))

  expect(hook.result.current).toMatchObject({ className: 'mb-24' })
})

it('adds the class "pt-sm-72" using the `pt` property', () => {
  const hook = renderHook(() => useSanitizedProps({ pt: { sm: 72 } }))

  expect(hook.result.current).toMatchObject({ className: 'pt-sm-72' })
})

it('adds the class "bg-danger" using the `bg` property', () => {
  const hook = renderHook(() => useSanitizedProps({ bg: 'danger' }))

  expect(hook.result.current).toMatchObject({ className: 'bg-danger' })
})

it('adds the class "c-muted" using the `c` property', () => {
  const hook = renderHook(() => useSanitizedProps({ c: 'muted' }))

  expect(hook.result.current).toMatchObject({ className: 'c-muted' })
})

it('adds the class "d-flex" using the `flex` property', () => {
  const hook = renderHook(() => useSanitizedProps({ flex: true }))

  expect(hook.result.current).toMatchObject({ className: 'd-flex' })
})

it('adds the class "d-inline-flex" using the `flex` property', () => {
  const hook = renderHook(() => useSanitizedProps({ flex: 'inline' }))

  expect(hook.result.current).toMatchObject({ className: 'd-inline-flex' })
})

it('adds the class "bg-gradient" using the `gradient` property', () => {
  const hook = renderHook(() => useSanitizedProps({ gradient: true }))

  expect(hook.result.current).toMatchObject({ className: 'bg-gradient' })
})

it('sets props.style.backgroundImage', () => {
  const img = 'assets/placeholder.png'
  const hook = renderHook(() => useSanitizedProps({ img }))

  expect(hook.result.current).toMatchObject({
    style: { backgroundImage: `url(${img})` }
  })
})

it('sets props.dangerouslySetInnerHTML', () => {
  const innerHTML = '<h1>Hello, World</h1>'
  const hook = renderHook(() => useSanitizedProps({ innerHTML }))

  expect(hook.result.current).toMatchObject({
    dangerouslySetInnerHTML: { __html: innerHTML }
  })
})

it('removes the "class" property if it is an empty string', () => {
  const hook = renderHook(() => useSanitizedProps({ className: '' }))

  expect(hook.result.current).toMatchObject({})
})
