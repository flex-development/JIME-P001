import { AnyObject } from '@flex-development/types'
import { ProductReviewProps } from '@system/components'
import { pick } from 'lodash'

/**
 * @file Create a `ProductReviewProps` object
 * @module utils/getProductReviewProps
 */

/**
 * Creates a new `ProductReviewProps` object.
 *
 * @param obj - Object to get `ProductReview` component properties from
 */
const getProductReviewProps = (obj: AnyObject): ProductReviewProps => {
  const PROP_KEYS: (keyof ProductReviewProps)[] = [
    'body',
    'id',
    'product_image_url',
    'product_title',
    'product_url',
    'title'
  ]

  return pick(obj, PROP_KEYS) as ProductReviewProps
}

export default getProductReviewProps
