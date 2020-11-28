import { ANYTHING } from '@flex-development/types'
import { isBoolean, isNull, isNumber, isString } from 'lodash'

/**
 * @file Check if data is a boolean, null, number, or string value
 * @module subdomains/app/utils/isPrimitive
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Data_structures
 */

/**
 * Returns true if {@param data} is a boolean, null, number, or string value.
 *
 * @param data - Value to check
 */
const isPrimitive = (data: ANYTHING): boolean => {
  return isBoolean(data) || isNull(data) || isNumber(data) || isString(data)
}

export default isPrimitive
