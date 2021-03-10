import { CHECKOUT_BASE_URL } from '@kustomzcore/config/constants'
import { renderHook } from '@testing-library/react-hooks'
import { LINE_ITEMS } from '@tests/system/__mocks__/utils'
import { useCheckoutPermalink } from './useCheckoutPermalink'

/**
 * @file Tests - useCheckoutPermalink
 * @module hooks/useCheckoutPermalink/spec
 */

describe('useCheckoutPermalink', () => {
  it('creates the default checkout URL', () => {
    const { result } = renderHook(() => useCheckoutPermalink())

    expect(result.current.url).toBe(CHECKOUT_BASE_URL)
    expect(result.current.items.length).toBe(0)
  })

  it('creates a checkout URL', () => {
    const items = [LINE_ITEMS[0]]
    const item_path = `${items[0].variant_id}:${items[0].quantity}`

    const { result } = renderHook(() => useCheckoutPermalink(items))

    expect(result.current.url).toBe(`${CHECKOUT_BASE_URL}/${item_path}`)
  })

  it('creates a checkout URL with cart attributes', () => {
    const items = [LINE_ITEMS[1]]
    let item_path = `${items[0].variant_id}:${items[0].quantity}`
    item_path = `${item_path}?attributes[kpd]=${items[0].properties?.kpd}`

    const { result } = renderHook(() => useCheckoutPermalink(items))

    expect(result.current.url).toBe(`${CHECKOUT_BASE_URL}/${item_path}`)
  })
})
