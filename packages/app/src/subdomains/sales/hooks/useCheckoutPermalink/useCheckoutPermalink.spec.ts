import LINE_ITEMS from '@app-mocks/data/checkout-line-items.mock.json'
import { CheckoutLineItemInputWithId } from '@flex-development/kustomzcore'
import { renderHook } from '@testing-library/react-hooks'
import { useCheckoutPermalink } from './useCheckoutPermalink'

/**
 * @file Tests - useCheckoutPermalink
 * @module subdomains/sales/hooks/useCheckoutPermalink/spec
 */

const CHECKOUT_BASE_URL = '/checkouts'

describe('useCheckoutPermalink', () => {
  it('creates the default checkout URL', () => {
    const { result } = renderHook(() => useCheckoutPermalink())

    expect(result.current.url).toBe(CHECKOUT_BASE_URL)
    expect(result.current.items.length).toBe(0)
  })

  it('creates a checkout URL', () => {
    const items = [LINE_ITEMS[0]]
    const item_path = `${items[0].data.variant_id}:${items[0].data.quantity}`

    const { result } = renderHook(() => useCheckoutPermalink(items))

    expect(result.current.url).toBe(`${CHECKOUT_BASE_URL}/${item_path}`)
    result.current.items.map((item, i) => {
      expect((item as CheckoutLineItemInputWithId).id).toBe(
        items[i].data.variant_id
      )
    })
  })

  it('creates a checkout URL with cart attributes', () => {
    const items = [LINE_ITEMS[1]]
    let item_path = `${items[0].data.variant_id}:${items[0].data.quantity}`
    item_path = `${item_path}?attributes[kpd]=${items[0].data.properties?.kpd}`

    const { result } = renderHook(() => useCheckoutPermalink(items))

    expect(result.current.url).toBe(`${CHECKOUT_BASE_URL}/${item_path}`)
  })
})
