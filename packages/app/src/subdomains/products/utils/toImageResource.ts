import ShopifyBuy from '@app/config/shopify-buy'
import { ImageResource } from '@flex-development/kustomzdesign/types'

/**
 * @file Convert a `ShopifyBuy.Image` object to a `ImageResource` object
 * @module subdomains/products/utils/toImageResource
 */

/**
 * Converts a serialized GraphQL product image object from the Shopify JS Buy
 * SDK into a `ImageResource` object.
 *
 * @param data - Serialized GraphQL product object
 * @returns Formatted product image object
 */
const toImageResource = (data: ShopifyBuy.Image): ImageResource => {
  const { id, src } = data
  return { alt: null, id: `${id}`, src }
}

export default toImageResource
