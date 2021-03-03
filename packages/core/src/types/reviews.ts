import type { ICustomer, IProductListing } from './shopify'

/**
 * @file Types Definitions - Reviews
 * @module types/reviews
 * @see https://judge.me/api/docs/v1
 */

/**
 * Object representing an answer to a custom form question.
 */
export type JudgeMeCustomFormAnswer = {
  cf_question_id: number
  value: string
}

/**
 * Object representing a Judge.me review.
 */
export type JudgeMeReview = {
  body: string
  curated: string
  created_at: string
  featured: boolean
  hidden: boolean
  id: number
  ip_address: string
  pictures: JudgeMeReviewPicture[]
  product_id: number
  reviewer_id: number
  source: string
  title: string
  updated_at: string
  verified: string
}

/**
 * Query parameters accepeted by the Judge.me "Reviews Index" endpoint.
 *
 * @see https://judge.me/api/docs/v1#!#reviews-reviewsindex
 */
export type JudgeMeReviewIndexParams = {
  /**
   * Shop API token for authentication.
   */
  api_token: string

  /**
   * Page number for reviews pagination.
   */
  page?: number

  /**
   * Number of reviews per page.
   */
  per_page?: number

  /**
   * Query reviews by product. Must be Judge.me `product_id`.
   */
  product_id?: JudgeMeReview['product_id']

  /**
   * Query reviews by rating. Should be a value between 1 and 5.
   */
  rating?: ReviewRating

  /**
   * Query reviews by reviewer.
   */
  reviewer_id?: JudgeMeReview['reviewer_id']

  /**
   * Shop domain without http/https protocol.
   */
  shop_domain: string
}

/**
 * Shape of success response from the Judge.me "Reviews Index" endpoint.
 *
 * @see https://judge.me/api/docs/v1#!#reviews-reviewsindex
 */
export type JudgeMeReviewIndexRes = {
  current_page: number
  per_page: number
  reviews: JudgeMeReview[]
}

/**
 * Query parameters accepeted by the Judge.me "Review Create" endpoint.
 *
 * @see https://judge.me/api/docs/v1#!#reviews-reviewcreate
 */
export type JudgeMeReviewCreateParams = {
  /**
   * Review body.
   */
  body: string

  /**
   * Object containing custom form answers for new review.
   */
  cf_answers?: Record<string, JudgeMeCustomFormAnswer>

  /**
   * Reviewer email.
   */
  email: ICustomer['verified_email']

  /**
   * ID of product being reviewed.
   * Leave this blank if the review is for shop (shop level review).
   */
  id?: IProductListing['product_id']

  /**
   * Reviewer's ip address.
   */
  ip_addr?: string

  /**
   * Reviewer name.
   */
  name: string

  /**
   * Pictures for review.
   */
  picture_keys?: Record<string, string>

  /**
   * Pictures url for review.
   */
  picture_urls?: Record<string, string>

  /**
   * Review platform.
   */
  platform: 'shopify'

  /**
   * Review rating. Should be a value between 1 and 5.
   */
  rating: ReviewRating

  /**
   * Review title.
   */
  title?: JudgeMeReview['title']

  /**
   * Shop domain without http/https protocol.
   */
  url: string
}

/**
 * Shape of success response from the Judge.me "Reviews Create" endpoint.
 *
 * @see https://judge.me/api/docs/v1#!#reviews-reviewcreate
 */
export type JudgeMeReviewCreateRes = {
  message: string
}

/**
 * Object representing a Judge.me review photo.
 */
export type JudgeMeReviewPicture = {
  hidden: boolean
  urls: Record<'compact' | 'huge' | 'original' | 'small', string>
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
