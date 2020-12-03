import products from '@app-mocks/data/product-listings.mock.json'
import ReviewsMockRepoRoot from '@app-mocks/data/reviews.mock.json'
import { IReview } from '@flex-development/kustomzcore'
import { IProductListing } from 'shopify-api-node'
/**
 * @file Testing Utilities
 * @module tests/mocks/utils
 */

export const PRODUCTS = (products as unknown) as Array<IProductListing>
export const REVIEWS = Object.values(ReviewsMockRepoRoot) as Array<IReview>
