import { NullishString } from './global'

/**
 * @file Type Definitions for Shopify Resources
 * @module lib/shopify
 * 
 * @todo Update documentation
 */

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
  available: boolean
  description: string
  handle: string
  id: string
  images: ImageResource[]
  options: ProductOptionResource[]
  variants: ProductVariantResource[]
  title: string
}

/**
 * Custom product property names like "size", "color", or "material".
 * `ProductResource` objects may have a maximum of 3 options.
 *
 * @see https://shopify.dev/docs/storefront-api/reference/object/productoption
 */
export type ProductOptionResource = {
  id: string
  name: string
  values: string[]
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

/**
 * Product Review resource from Stamped Shopify App.
 * 
 * The fields defined are the ones used in this project.
 * 
 * @see https://developers.stamped.io/#1e9fc214-5b59-40a0-9a7b-1030fbaef679
 */
export type StampedProductReviewEntity = {
  author: string
  body: string
  email: string
  id: number
  isPublishedShopify: boolean
  productHandle: string
  productId: number
  productImageUrl: string
  productTitle: string
  productUrl: string
  rating: number
  title: string
}

/**
 * Fields needed to create a product review.
 * 
 * @see https://developers.stamped.io/#d06415c3-5eae-46b1-a8db-c1016fd09902
 */
export type StampedProductReviewEntityInput = {
  author: StampedProductReviewEntity['author']
  email: StampedProductReviewEntity['email']
  location: string
  reviewMessage: StampedProductReviewEntity['body']
  reviewRating: StampedProductReviewEntity['rating']
  reviewRecommendProduct: boolean
  reviewTitle: StampedProductReviewEntity['title']
  productImageUrl: StampedProductReviewEntity['productImageUrl']
  productName: StampedProductReviewEntity['productTitle']
  productSKU: string
  productUrl: StampedProductReviewEntity['productUrl']
  reviewSource: string
}
