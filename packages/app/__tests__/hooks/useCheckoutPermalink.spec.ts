import { useCheckoutPermalink } from '@app/subdomains/sales'
import { CheckoutLineItemInput } from '@flex-development/types'
import { renderHook } from '@testing-library/react-hooks'
import CheckoutLineItems from '../__mocks__/data/checkout-line-items.mock.json'

/**
 * @file Tests - useCheckoutPermalink
 * @module tests/hooks/useCheckoutPermalink
 */

const CHECKOUT_BASE_URL = `${process.env.SHOPIFY_DOMAIN}/cart/`

const LINE_ITEMS: Array<CheckoutLineItemInput> = CheckoutLineItems.map(i => {
  return i.item
})

describe('useCheckoutPermalink', () => {
  it('creates the default checkout URL', () => {
    const { result } = renderHook(() => useCheckoutPermalink())

    expect(result.current.url).toBe(CHECKOUT_BASE_URL)
    expect(result.current.items.length).toBe(0)
  })

  it('creates a checkout URL', () => {
    const items = [LINE_ITEMS[0]]
    const item_path_0 = `${items[0].variant_id}:${items[0].quantity}`

    const { result } = renderHook(() => useCheckoutPermalink(items))

    expect(result.current.url).toBe(`${CHECKOUT_BASE_URL}${item_path_0}`)
    result.current.items.map((item, i) => {
      expect(item.id).toBe(items[i].variant_id)
    })
  })

  it('creates a checkout URL with cart attributes', () => {
    const items = [LINE_ITEMS[1]]
    let item_path_0 = `${items[0].variant_id}:${items[0].quantity}`
    item_path_0 = `${item_path_0}?attributes[kpd]=${items[0].properties?.kpd}`

    const { result } = renderHook(() => useCheckoutPermalink(items))

    expect(result.current.url).toBe(`${CHECKOUT_BASE_URL}${item_path_0}`)
  })
})
