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
