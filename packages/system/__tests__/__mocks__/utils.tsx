import ReviewsMockRepoRoot from '@app-mocks/data/reviews.mock.json'
import { IProductListing, IReview } from '@flex-development/kustomzcore'
import products from '@system-mocks/data/product-listings.mock.json'
import SONGS from '@system-mocks/data/song-attributes.mock.json'
import { CartContextProviderProps } from '@system/components/context'
import { render } from '@testing-library/react'
import { MockCartContextProvider } from './components'

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
  return render(<MockCartContextProvider {...props} />, options)
}

export { SONGS }
