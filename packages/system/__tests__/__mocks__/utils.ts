import ReviewsMockRepoRoot from '@app-mocks/data/reviews.mock.json'
import { IReview } from '@flex-development/kustomzcore'
import products from '@system-mocks/data/product-listings.mock.json'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Testing Utilities
 * @module tests/mocks/utils
 */

export const PRODUCTS = (products as unknown) as Array<IProductListing>
export const REVIEWS = Object.values(ReviewsMockRepoRoot) as Array<IReview>
