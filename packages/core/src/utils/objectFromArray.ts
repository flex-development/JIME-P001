import type { AnyObject } from '@flex-development/json/utils/types'
import type { NumberString } from '../types/utils'

/**
 * @file Implementation - objectFromArray
 * @module utils/objectFromArray
 */

/**
 * Converts an {@param array} of objects to a single object.
 *
 * @param array - Array of objects
 * @param key - Name of array object field to use as key
 */
function objectFromArray<T extends AnyObject = AnyObject>(
  array: T[],
  key: keyof T
): Record<NumberString, T> {
  const obj: Record<NumberString, T> = {}

  array.forEach(item => (obj[item[key]] = item))

  return obj as Record<string, T>
}

export default objectFromArray
