import type { NullishNumber, NullishString } from '@flex-development/json'
import type { ICustomer, IProductListing } from './shopify-rest-admin-api'

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
 * Error response objects from the Judge.me API.
 */
export namespace JudgeMeErrorRes {
  export type GeneralError = { error: string }
  export interface Unauthorized extends GeneralError {
    error: 'Failed to authenticate. Shop domain or Api Token is wrong'
  }
}

/**
 * Object representing a Judge.me review.
 */
export type JudgeMeReview = {
  body: string
  created_at: string
  curated: JudgeMeReviewCuratedStatus
  featured: boolean
  hidden: boolean
  id: number
  ip_address: NullishString
  pictures: JudgeMeReviewPicture[]
  product_external_id: IProductListing['product_id']
  product_handle: IProductListing['handle']
  product_title: IProductListing['title']
  rating: ReviewRating
  reviewer: JudgeMeReviewer
  source: JudgeMeReviewSource
  title: NullishString
  updated_at: string
  verified: JudgeMeReviewVerifiedStatus
}

/**
 * JSON body expected by the Judge.me "Reviews Create" endpoint.
 *
 * @see https://judge.me/api/docs/v1#!#reviews-reviewcreate
 */
export type JudgeMeReviewCreateData = {
  /**
   * Review body. Maximum `500` characters.
   *
   * Defaults if blank:
   *
   * - Product: Product description
   * - Shop: "Judge.me Shop Reviews"
   */
  body?: NullishString

  /**
   * Object containing custom form answers for new review.
   */
  cf_answers?: Record<string, JudgeMeCustomFormAnswer>

  /**
   * Reviewer email.
   */
  email: ICustomer['email']

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
  name?: string

  /**
   * Pictures url for review.
   */
  picture_urls?: Record<string, string>

  /**
   * Review platform.
   */
  platform?: 'shopify'

  /**
   * Review rating. Should be a value between 1 and 5.
   *
   * @default 5
   */
  rating?: ReviewRating

  /**
   * Review title. Maximum `100` characters.
   */
  title?: JudgeMeReview['title']

  /**
   * Shop domain without http/https protocol.
   */
  url: string
}

/**
 * `JudgeMeReviewCreateData` without authentication parameters, or parameters
 * needed to identify product listing resources.
 */
export type JudgeMeReviewCreateDataDTO = Omit<
  JudgeMeReviewCreateData,
  'body' | 'cf_answers' | 'id' | 'name' | 'picture_urls' | 'platform' | 'url'
> & { body: string; id: IProductListing['product_id'] | string }

/**
 * Shape of success response from the Judge.me "Reviews Create" endpoint.
 *
 * @see https://judge.me/api/docs/v1#!#reviews-reviewcreate
 */
export type JudgeMeReviewCreateRes = {
  message: string
}

/**
 * Possible values for the `curated` property.
 */
export enum JudgeMeReviewCuratedStatus {
  CURATED = 'curated',
  NOT_YET = 'not-yet',
  SPAM = 'spam'
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
   * Number of reviews per page. Maximum `10`.
   *
   * @default 10
   */
  per_page?: number

  /**
   * Filter reviews by product ID.
   */
  product_id?: JudgeMeReview['product_external_id']

  /**
   * Filter reviews by rating.
   *
   * Validations:
   *
   * - Should be between 1 and 5
   */
  rating?: ReviewRating

  /**
   * Filter reviews by reviewer.
   */
  reviewer_id?: JudgeMeReviewer['id']

  /**
   * Shop domain without http/https protocol.
   */
  shop_domain: string
}

/**
 * `JudgeMeReviewIndexParams` without authentication parameters.
 */
export type JudgeMeReviewIndexParamsNoAuth = Omit<
  JudgeMeReviewIndexParams,
  'api_token' | 'shop_domain'
>

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
 * Object representing a Judge.me review photo.
 */
export type JudgeMeReviewPicture = {
  hidden: boolean
  urls: Record<'compact' | 'huge' | 'original' | 'small', string>
}

/**
 * Types of review sources.
 */
export enum JudgeMeReviewSource {
  ADMIN = 'admin',
  IMPORTED = 'imported',
  WEB = 'web'
}

/**
 * Possible values for the `verified` property.
 */
export enum JudgeMeReviewVerifiedStatus {
  BUYER = 'buyer',
  NOTHING = 'nothing'
}

/**
 * Object representing a Judge.me reviewer.
 */
export type JudgeMeReviewer = {
  accepts_marketing: ICustomer['accepts_marketing']
  email: ICustomer['email']
  external_id: NullishNumber
  id: ICustomer['id']
  name: ICustomer['default_address']['name']
  phone: ICustomer['default_address']['phone']
  source_email: ICustomer['email'] | null
  tags: ICustomer['tags'][]
  unsubscribed_at: NullishString
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
