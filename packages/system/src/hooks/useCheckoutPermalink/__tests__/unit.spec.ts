import { CHECKOUT_BASE_URL } from '@core/config/constants'
import LINE_ITEMS from '@system/tests/fixtures/checkout-line-items'
import { renderHook } from '@testing-library/react-hooks'
import { useCheckoutPermalink } from '../useCheckoutPermalink'

/**
 * @file Unit Tests - useCheckoutPermalink
 * @module hooks/useCheckoutPermalink/tests/unit
 */

describe('unit:useCheckoutPermalink', () => {
  describe('initial state', () => {
    describe('items', () => {
      it('empty array', () => {
        const { result } = renderHook(() => useCheckoutPermalink())

        expect(result.current.items.length).toBe(0)
      })

      it('non-empty array', () => {
        const { result } = renderHook(() => useCheckoutPermalink(LINE_ITEMS))

        expect(result.current.items.length).toBe(LINE_ITEMS.length)
      })
    })

    describe('url', () => {
      it('items as empty array', () => {
        const { result } = renderHook(() => useCheckoutPermalink())

        expect(result.current.url).toBe(CHECKOUT_BASE_URL)
      })

      describe('items as non-empty array', () => {
        it('with cart attributes', () => {
          const items = [LINE_ITEMS[1]]

          let item_path = `${items[0].variant_id}:${items[0].quantity}`
          item_path = `${item_path}?attributes[kpd]=${items[0].properties?.kpd}`

          const { result } = renderHook(() => useCheckoutPermalink(items))

          expect(result.current.url).toBe(`${CHECKOUT_BASE_URL}/${item_path}`)
        })

        it('without cart attributes', () => {
          const items = [LINE_ITEMS[0]]

          const item_path = `${items[0].variant_id}:${items[0].quantity}`

          const { result } = renderHook(() => useCheckoutPermalink(items))

          expect(result.current.url).toBe(`${CHECKOUT_BASE_URL}/${item_path}`)
        })
      })
    })
  })
})
