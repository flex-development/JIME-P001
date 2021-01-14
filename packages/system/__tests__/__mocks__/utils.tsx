import ReviewsMockRepoRoot from '@app-mocks/data/reviews.mock.json'
import { IProductListing, IReview } from '@flex-development/kustomzcore/types'
import ITEMS from '@system-mocks/data/checkout-line-items.mock.json'
import products from '@system-mocks/data/product-listings.mock.json'
import SONGS from '@system-mocks/data/song-attributes.mock.json'
import {
  CartContextProvider,
  CartContextProviderProps
} from '@system/providers'
import { render } from '@testing-library/react'

/**
 * @file Testing Utilities
 * @module tests/mocks/utils
 */

export const PRODUCTS = (products as unknown) as Array<IProductListing>
export const REVIEWS = Object.values(ReviewsMockRepoRoot) as Array<IReview>

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
  return render(<CartContextProvider {...props} items={ITEMS} />, options)
}

export { SONGS }
