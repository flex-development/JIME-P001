import { AnyObject } from '@flex-development/kustomtypez'
import { ProductCardProps } from '@system/lib'
import { pick } from 'lodash'

/**
 * @file Create a `ProductCardProps` object
 * @module utils/getProductCardProps
 */

/**
 * Creates a new `ProductCardProps` object.
 *
 * @param obj - Object to get `ProductCard` component properties from
 */
export const getProductCardProps = (obj: AnyObject): ProductCardProps => {
  const PROP_KEYS: (keyof ProductCardProps)[] = [
    'handle',
    'id',
    'title',
    'variants'
  ]

  return pick(obj, PROP_KEYS) as ProductCardProps
}
