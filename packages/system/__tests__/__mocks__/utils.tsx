import type { AnyObject } from '@flex-development/json/utils/types'
import type {
  CheckoutLineItemInput,
  GetCollectionResJSON,
  IProductListing
} from '@kustomzcore/types'
import type { CartContextProviderProps } from '@system/providers'
import { CartContextProvider } from '@system/providers'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import ITEMS from './data/checkout-line-items.mock.json'
import collections from './data/collection-listings.mock.json'
import products from './data/product-listings.mock.json'
import ReviewsMockRepoRoot from './data/reviews.mock.json'
import SONGS from './data/song-attributes.mock.json'

/**
 * @file Testing Utilities
 * @module tests/mocks/utils
 */

export const COLLECTIONS = (collections as unknown) as GetCollectionResJSON[]
export const LINE_ITEMS = (ITEMS as unknown) as CheckoutLineItemInput[]
export const PRODUCTS = (products as unknown) as IProductListing[]
export const REVIEWS = Object.values(ReviewsMockRepoRoot) as AnyObject[]

/**
 * Renders a test component wrapped in the `MockCartContextProvider`.
 *
 * @param {ReactElement} ui - Component to render
 * @param {CartContextProviderProps} props - `CartContextProvider` properties
 * @param {RenderOptions} options - Render options
 * @return {RenderResult} Render result
 */
export const renderWithMockCartContext = (
  ui: ReactElement,
  props: CartContextProviderProps = {},
  options: RenderOptions = {}
): ReturnType<typeof render> => {
  props.children = ui
  return render(<CartContextProvider {...props} items={LINE_ITEMS} />, options)
}

export { SONGS }
