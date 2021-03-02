import type { AnyObject } from '@flex-development/json/utils/types'
import type { CheckoutLineItemInput, IProductListing } from '@kustomzcore/types'
import type { CartContextProviderProps } from '@system/providers'
import { CartContextProvider } from '@system/providers'
import { render } from '@testing-library/react'
import ITEMS from './data/checkout-line-items.mock.json'
import products from './data/product-listings.mock.json'
import ReviewsMockRepoRoot from './data/reviews.mock.json'
import SONGS from './data/song-attributes.mock.json'

/**
 * @file Testing Utilities
 * @module tests/mocks/utils
 */

export const LINE_ITEMS = (ITEMS as unknown) as CheckoutLineItemInput[]
export const PRODUCTS = (products as unknown) as Array<IProductListing>
export const REVIEWS = Object.values(ReviewsMockRepoRoot) as Array<AnyObject>

/**
 * Renders a test component wrapped in the `MockCartContextProvider`.
 *
 * @param consumer - Component to render
 * @param props - Provider props
 * @param options - Render options
 */
export const renderWithMockCartContext = (
  consumer: Parameters<typeof render>[0],
  props: CartContextProviderProps = {},
  options: Parameters<typeof render>[1] = {}
): ReturnType<typeof render> => {
  props.children = consumer
  return render(<CartContextProvider {...props} items={LINE_ITEMS} />, options)
}

export { SONGS }
