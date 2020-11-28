import { ANYTHING } from '@flex-development/types'
import isPrimitive from './isPrimitive'

/**
 * @file Check if every array item is a boolean, null, number, or string
 * @module subdomains/app/utils/isPrimitiveArray
 */

/**
 * Returns true if every item in {@param arr} is a boolean, null, number, or
 * string value.
 *
 * @param arr - Data array
 */
const isPrimitiveArray = (arr: Array<ANYTHING>): boolean => {
  return arr.every(item => isPrimitive(item))
}

export default isPrimitiveArray
