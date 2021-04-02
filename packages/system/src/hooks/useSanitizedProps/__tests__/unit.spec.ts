import { renderHook } from '@testing-library/react-hooks'
import { useSanitizedProps } from '../useSanitizedProps'

/**
 * @file Unit Tests - useSanitizedProps
 * @module hooks/useSanitizedProps/tests/unit
 */

describe('unit:useSanitizedProps', () => {
  it('returns empty object if args[0] === empty object', () => {
    const hook = renderHook(() => useSanitizedProps({}))

    expect(hook.result.current).toMatchObject({})
  })

  it('removes "class" property if it is an empty string', () => {
    const hook = renderHook(() => useSanitizedProps({ className: '' }))

    expect(hook.result.current).toMatchObject({})
  })

  describe('transient props', () => {
    it('args[0].$bg', () => {
      const hook = renderHook(() => useSanitizedProps({ $bg: 'black' }))

      expect(hook.result.current).toMatchObject({ className: 'bg-black' })
    })

    it('args[0].$color', () => {
      const hook = renderHook(() => useSanitizedProps({ $color: 'muted' }))

      expect(hook.result.current).toMatchObject({ className: 'text-muted' })
    })

    it('args[0].$html', () => {
      const $html = '<h1>Hello, World</h1>'
      const hook = renderHook(() => useSanitizedProps({ $html }))

      expect(hook.result.current).toMatchObject({
        dangerouslySetInnerHTML: { __html: $html }
      })
    })

    it('args[0].$img', () => {
      const $img = 'assets/placeholder'
      const hook = renderHook(() => useSanitizedProps({ $img }))

      expect(hook.result.current).toMatchObject({
        style: { backgroundImage: `url(${$img})` }
      })
    })

    it('args[0].$mb', () => {
      const hook = renderHook(() => useSanitizedProps({ $mb: 24 }))

      expect(hook.result.current).toMatchObject({ className: 'mb-24' })
    })

    it('args[0].$pt', () => {
      const hook = renderHook(() => useSanitizedProps({ $pt: { sm: 72 } }))

      expect(hook.result.current).toMatchObject({ className: 'sm:pt-72' })
    })
  })
})
