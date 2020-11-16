import {
  ICustomer,
  IProductImage,
  IProductListing,
  IProductVariant
} from 'shopify-api-node'
import { IEntity } from './database'

/**
 * @file Type Declarations - Product Reviews
 * @module lib/reviews
 */

export interface IReview extends IEntity {
  body: string
  customer_id: ICustomer['id']
  published: boolean
  product_handle: IProductListing['handle']
  product_id: IProductListing['product_id']
  product_image_url: IProductImage['src']
  product_sku: IProductVariant['sku']
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
  product_sku: IProductVariant['sku']
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
