import { isEmpty } from 'lodash'
import { ProductVariant } from 'shopify-buy'

/**

 * @file Find a product variant by ID
 * @module utils/findVariantByID
 */

/**
 * Find a product variant by ID.
 *
 * @param variants - Product variant data to search
 * @param id - ID of product variant to find
 */
export const findVariantByID = (
  variants: ProductVariant[],
  id: ProductVariant['id']
): ProductVariant | null => {
  // If undefined or empty array / string
  if (isEmpty(variants) || isEmpty(id)) return null

  return variants.find(v => v.id === id) || null
}
