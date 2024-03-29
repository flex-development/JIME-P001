import type { ANYTHING } from '@flex-development/json/utils/types'

/**
 * @file Implementation - sanitizeQuantity
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
 * @param {ANYTHING} [value] - Quantity value to sanitize
 * @return {number} Product quanity
 * @throws {Error}
 */
const sanitizeQuantity = (value?: ANYTHING): number => {
  // Check if value is a boolean
  if (typeof value === 'boolean') return value ? 1 : 0

  // Return 0 if value isn't a number or a string possibly containing a number
  if (typeof value !== 'number' && typeof value !== 'string') return 0

  try {
    const parsed = JSON.parse(`${value}`)
    return typeof parsed !== 'number' || parsed < 0 ? 0 : parsed
  } catch (error) {
    if (error.name === 'SyntaxError') return 0
    throw error
  }
}

export default sanitizeQuantity
