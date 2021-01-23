import { renderHook } from '@testing-library/react-hooks'
import { useSanitizedProps } from './useSanitizedProps'

/**
 * @file Tests - useSanitizedProps
 * @module hooks/useSanitizedProps/spec
 */

describe('useSanitizedProps', () => {
  it('returns an empty object if args.props is an empty object', () => {
    const hook = renderHook(() => useSanitizedProps({}))

    expect(hook.result.current).toMatchObject({})
  })

  it('adds the class "mb-24" using the `mb` property', () => {
    const hook = renderHook(() => useSanitizedProps({ $mb: 24 }))

    expect(hook.result.current).toMatchObject({ className: 'mb-24' })
  })

  it('adds the class "pt-sm-72" using the `pt` property', () => {
    const hook = renderHook(() => useSanitizedProps({ $pt: { sm: 72 } }))

    expect(hook.result.current).toMatchObject({ className: 'sm:pt-72' })
  })

  it('adds the class "bg-black" using the `bg` property', () => {
    const hook = renderHook(() => useSanitizedProps({ $bg: 'black' }))

    expect(hook.result.current).toMatchObject({ className: 'bg-black' })
  })

  it('adds the class "c-muted" using the `c` property', () => {
    const hook = renderHook(() => useSanitizedProps({ $color: 'muted' }))

    expect(hook.result.current).toMatchObject({ className: 'text-muted' })
  })

  it('sets props.style.backgroundImage', () => {
    const $img = 'assets/placeholder.webp'
    const hook = renderHook(() => useSanitizedProps({ $img }))

    expect(hook.result.current).toMatchObject({
      style: { backgroundImage: `url(${$img})` }
    })
  })

  it('sets props.dangerouslySetInnerHTML', () => {
    const $html = '<h1>Hello, World</h1>'
    const hook = renderHook(() => useSanitizedProps({ $html }))

    expect(hook.result.current).toMatchObject({
      dangerouslySetInnerHTML: { __html: $html }
    })
  })

  it('removes the "class" property if it is an empty string', () => {
    const hook = renderHook(() => useSanitizedProps({ className: '' }))

    expect(hook.result.current).toMatchObject({})
  })
})
