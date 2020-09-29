import { fromPairs, map, sortBy } from 'lodash'

/**
 * @file Put the keys of an object in alphabetical order
 * @module utils/sortByKeys
 */

/**
 * Puts the keys of an object in alphabetical order.
 *
 * @param unsorted - Object with keys to sort
 */
export const sortByKeys = (unsorted: {}): ReturnType<typeof fromPairs> => {
  const keys = Object.keys(unsorted)
  const sortedKeys = sortBy(keys)

  return fromPairs(map(sortedKeys, key => [key, unsorted[key]]))
}
