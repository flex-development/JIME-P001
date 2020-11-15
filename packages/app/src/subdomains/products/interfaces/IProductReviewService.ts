import {
  IQueryExecutor as IQE,
  OneOrMany,
  QEData,
  Query
} from '@app/subdomains/app'
import {
  ProductResource,
  ProductReviewResource,
  ProductReviewResourceInput
} from '@flex-development/kustomzdesign/types'

/**
 * @file Subdomain Interfaces - Product Review Service
 * @module subdomains/products/interfaces/IProductReviewService
 */

export interface IProductReviewService extends IQE<ProductReviewResource> {
  api_key_private: string
  api_key_public: string
  store_hash: string

  create(data: ProductReviewResourceInput): Promise<ProductReviewResource>
  find(query?: ProductReviewQuery): Promise<QEData<ProductReviewResource>>
  findByProductId(
    id: ProductResource['id']
  ): Promise<Array<ProductReviewResource>>
  get(id: ProductReviewResource['id']): Promise<ProductReviewResource>
}

/**
 * Object representing a response from the "Get Reviews" endpoint.
 *
 * @see https://developers.stamped.io/#1e9fc214-5b59-40a0-9a7b-1030fbaef679
 */
export type GetReviews = {
  page: number
  results: Array<{ review: ProductReviewResource }>
  summary: GetReviewsSummary | null
  total: number
  totalPages: number
}

/**
 * Object representing a response summary from the "Get Reviews" endpoint.
 *
 * @see https://developers.stamped.io/#1e9fc214-5b59-40a0-9a7b-1030fbaef679
 */
export type GetReviewsSummary = {
  archived: number
  flagged: number
  published: number
  spam: number
  unpublished: number
  unread: number
}

/**
 * Object representing a product review query.
 */
export type ProductReviewQuery = Query<ProductReviewResource>

/**
 * Object representing product review search parameters.
 */
export type ProductReviewSearchParams = {
  author?: OneOrMany<ProductReviewResource['author']>
  email?: OneOrMany<ProductReviewResource['email']>
  id?: OneOrMany<ProductReviewResource['id']>
  productHandle?: OneOrMany<ProductReviewResource['productHandle']>
  productId?: OneOrMany<ProductReviewResource['productId']>
  productImageUrl?: OneOrMany<ProductReviewResource['productImageUrl']>
  productTitle?: OneOrMany<ProductReviewResource['productTitle']>
  productUrl?: OneOrMany<ProductReviewResource['productUrl']>
  published?: OneOrMany<ProductReviewResource['isPublishedShopify']>
  rating?: OneOrMany<ProductReviewResource['rating']>
  title?: OneOrMany<ProductReviewResource['title']>
}
