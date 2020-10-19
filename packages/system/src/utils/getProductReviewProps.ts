import { AnyObject } from '@flex-development/kustomtypez'
import { ProductReviewProps } from '@system/lib'
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
export const getProductReviewProps = (obj: AnyObject): ProductReviewProps => {
  const PROP_KEYS: (keyof ProductReviewProps)[] = [
    'body',
    'id',
    'productImageUrl',
    'productTitle',
    'productUrl',
    'title'
  ]

  return pick(obj, PROP_KEYS) as ProductReviewProps
}
