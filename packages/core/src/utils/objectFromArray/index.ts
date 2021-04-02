import type { AnyObject } from '@flex-development/json'

/**
 * @file Implementation - objectFromArray
 * @module utils/objectFromArray
 */

/**
 * Converts an {@param array} of objects to a single object.
 *
 * @template T - Array item type
 *
 * @param {T[]} array - Array of objects
 * @param {string} key - Name of array item object field to use as object key
 * @return {Record<string, T>} Object from array items
 */
function objectFromArray<T extends AnyObject = AnyObject>(
  array: T[],
  key: keyof T
): Record<string, T> {
  const obj: Record<string, T> = {}

  array.forEach(item => {
    const value = `${item[key]}`.trim()
    if (value.length) obj[value] = item
  })

  return obj as Record<string, T>
}

export default objectFromArray
