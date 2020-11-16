import { IQueryExecutor as IQE, QEData, Query } from '@app/subdomains/app'
import { ICustomerService } from '@app/subdomains/customers/interfaces'
import {
  CreateProductReviewRequest,
  ProductResource,
  ProductReviewResource
} from '@flex-development/kustomzdesign/types'
import { IProductService } from './IProductService'

/**
 * @file Subdomain Interfaces - Product Review Service
 * @module subdomains/sales/interfaces/IProductReviewService
 */

export interface IProductReviewService extends IQE<ProductReviewResource> {
  api_key_private: string
  api_key_public: string
  customers: ICustomerService
  products: IProductService
  store_hash: string

  create(data: IProductReviewCreateRequest): Promise<ProductReviewResource>
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
 * Object representing a product review creation request.
 */
export interface IProductReviewCreateRequest {
  email: CreateProductReviewRequest['email']
  productId: CreateProductReviewRequest['productId']
  productSKU: CreateProductReviewRequest['productSKU']
  reviewMessage: CreateProductReviewRequest['reviewMessage']
  reviewRating: CreateProductReviewRequest['reviewRating']
  reviewRecommendProduct: CreateProductReviewRequest['reviewRecommendProduct']
  reviewSource?: CreateProductReviewRequest['reviewSource']
  reviewTitle: CreateProductReviewRequest['reviewTitle']
}

/**
 * Object representing a product review query.
 */
export type ProductReviewQuery = Query<ProductReviewResource>
