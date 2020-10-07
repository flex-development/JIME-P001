import { NullishString } from '@flex-development/kustomtypez'
import { uniqueId } from 'lodash'

/**
 * @file Generate a unique id
 * @module utils/uid
 */

/**
 * Generates a unique ID. If a prefix is supplied, the function will return
 * `${prefix}_${uid}`.
 *
 * @param prefix - If defined, prepend this value to uid
 */
export const uid = (prefix?: NullishString): string => {
  const uid = `${Math.floor(Math.random() * JSON.parse(uniqueId()))}`
  return prefix ? `${prefix}_${uid}` : uid
}
