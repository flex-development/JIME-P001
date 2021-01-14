import {
  ICustomer,
  IProductImage,
  IProductListing,
  IProductListingVariant
} from './shopify'

/**
 * @file Types Declarations - Product Reviews
 * @module types/reviews
 */

export interface IReview {
  /**
   * Number of milliseconds between 1 January 1970 00:00:00 UTC and the date the
   * entity was created.
   */
  readonly created_at: number

  /**
   * Unique entity ID.
   */
  readonly id: string

  body: string
  customer_id: ICustomer['id']
  published: boolean
  product_handle: IProductListing['handle']
  product_id: IProductListing['product_id']
  product_image_url: IProductImage['src']
  product_sku: IProductListingVariant['sku']
  product_title: IProductListing['title']
  product_url: string
  rating: ReviewRating
  title: string
}

/**
 * Fields needed to create a product review.
 */
export type CreateReviewRequest = {
  body: IReview['body']
  email: ICustomer['email']
  product_id: IProductListing['product_id']
  product_sku: IProductListingVariant['sku']
  rating: IReview['rating']
  title: IReview['title']
}

/**
 * Product review rating values.
 */
export enum ReviewRating {
  'ONE' = 1,
  'TWO' = 2,
  'THREE' = 3,
  'FOUR' = 4,
  'FIVE' = 5
}
