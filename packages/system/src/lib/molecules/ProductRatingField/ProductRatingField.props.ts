import { ANYTHING } from '@flex-development/json'
import { BoxProps } from '@system/lib/atoms'
import { EventHandlers } from '@system/types'

/**
 * @file Component Props - ProductRatingField
 * @module lib/molecules/ProductRatingField/props
 */

export interface ProductRatingFieldProps extends BoxProps {
  /**
   * Accessible name for assistive technologies.
   */
  'aria-label'?: string

  /**
   * Fires when a product rating star is clicked.
   */
  handleRating?(event: EventHandlers.Change.Input): ANYTHING

  /**
   * Name of `<button>` elements.
   *
   * @default rating
   */
  name?: string

  /**
   * Initial value to use for the rating state. If omitted, defaults to the last
   * value in the `values` array, or 5 if `values` is an empty array.
   */
  rating?: number

  /**
   * Array of values to use as rating values.
   *
   * @default [1, 2, 3, 4, 5]
   */
  values?: number[]
}
