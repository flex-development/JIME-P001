import type { AnyObject } from '@flex-development/json/utils/types'
import type { NumberString } from '../types/utils'

/**
 * @file Implementation - objectFromArray
 * @module utils/objectFromArray
 */

/**
 * Converts an {@param array} of objects to a single object.
 *
 * @template T - Array item
 *
 * @param {T[]} array - Array of objects
 * @param {string} key - Name of array object field to use as key
 * @return {Record<keyof T, T>} Object from array items
 */
function objectFromArray<T extends AnyObject = AnyObject>(
  array: T[],
  key: keyof T
): Record<NumberString, T> {
  const obj: Record<NumberString, T> = {}

  array.forEach(item => (obj[item[key]] = item))

  return obj as Record<keyof T, T>
}

export default objectFromArray
