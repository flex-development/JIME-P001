import { ANYTHING } from '@flex-development/types'
import { isBoolean, isNumber, isString } from 'lodash'

/**
 * @file Convert a value into a product quantity
 * @module utils/sanitizeQuantity
 */

/**
 * Converts a value into a product quantity.
 *
 * `0` will be returned if:
 *
 * - `value` is `null`, `undefined`, or `false`
 * - `value` isn't a number or a string containing a number
 * - `value` is less than 0 after being parsed with `JSON.parse`
 *
 * @param value - Quantity value to sanitize
 */
const sanitizeQuantity = (value?: ANYTHING): number => {
  // Check if value is a boolean
  if (isBoolean(value)) return value ? 1 : 0

  // Return 0 if value isn't a number or a string possibly containing a number
  if (!isNumber(value) && !isString(value)) return 0

  const parsed = JSON.parse(`${value}`)

  return !isNumber(parsed) || parsed < 0 ? 0 : parsed
}

export default sanitizeQuantity
