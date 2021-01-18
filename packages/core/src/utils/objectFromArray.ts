import { AnyObject } from '@flex-development/json/utils/types'

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
): Record<number | string, T> {
  const obj: Record<number | string, T> = {}

  array.forEach(item => (obj[item[key]] = item))

  return obj as Record<string, T>
}

export default objectFromArray
