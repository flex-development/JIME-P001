import { IProductListing } from 'shopify-api-node'
import { NullishString } from './utils'

/**
 * @file Shopify Type Definitons
 * @module types/shopify
 */

/**
 * Represents a collection resource.
 */
export type CollectionResource = {
  description: string
  handle: string
  id: string
  image: ImageResource
  products: ProductResource[]
  title: string
}

/**
 * Fields needed to create a product review using the Stamped API.
 * 
 * @see https://developers.stamped.io/#d06415c3-5eae-46b1-a8db-c1016fd09902
 */
export type CreateProductReviewRequest = {
  author: ProductReviewResource['author']
  email: ProductReviewResource['email']
  location: string
  productId: IProductListing['product_id']
  productImageUrl: ProductReviewResource['productImageUrl']
  productName: ProductReviewResource['productTitle']
  productSKU: string
  productUrl: ProductReviewResource['productUrl']
  reviewMessage: ProductReviewResource['body']
  reviewRating: ProductReviewResource['rating']
  reviewRecommendProduct: boolean
  reviewSource?: string
  reviewTitle: ProductReviewResource['title']
}

/**
 * Represents an image resource.
 * 
 * @see https://shopify.dev/docs/storefront-api/reference/object/image
 */
export type ImageResource = {
  alt: NullishString
  id: string
  src: string
}

/**
 * Represents an individual item for sale in a Shopify store.
 *
 * @see https://shopify.dev/docs/storefront-api/reference/object/product
 */
export type ProductResource = {
  description: string
  handle: string
  id: string
  images: ImageResource[]
  variants: ProductVariantResource[]
  title: string
}

/**
 * Product Review resource from Stamped Shopify App.
 * 
 * The fields defined are the ones used in this project.
 * 
 * @see https://developers.stamped.io/#1e9fc214-5b59-40a0-9a7b-1030fbaef679
 */
export type ProductReviewResource = {
  author: string
  body: string
  email: string
  id: number
  isPublishedShopify: boolean
  productHandle: string
  productId: number | string
  productImageUrl: string
  productTitle: string
  productUrl: string
  rating: 1 | 2 | 3 | 4 | 5
  title: string
}

/**
 * Represents a different version of a product, such as differing sizes or
 * differing colors. 
 *
 * @see https://shopify.dev/docs/storefront-api/reference/object/productvariant
 */
export type ProductVariantResource = {
  available: boolean
  id: string
  image: ImageResource
  price: string
  sku: string
  title: string
}
