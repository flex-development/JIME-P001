import { AnyObject } from '@flex-development/types'
import { ProductCardProps } from '@system/components'
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
const getProductCardProps = (obj: AnyObject): ProductCardProps => {
  const PROP_KEYS: (keyof ProductCardProps)[] = [
    'handle',
    'id',
    'title',
    'variants'
  ]

  const props = pick(obj, PROP_KEYS)

  if (props.id) props.id = `${props.id}`

  return props as ProductCardProps
}

export default getProductCardProps
