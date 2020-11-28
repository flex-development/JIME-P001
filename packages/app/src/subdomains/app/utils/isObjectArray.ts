import { ANYTHING } from '@flex-development/types'
import { isObject, isPlainObject } from 'lodash'

/**
 * @file Determine if array if an array of objects (or plain objects)
 * @module subdomains/app/utils/isObjectArray
 */

/**
 * Determines if every item in {@param arr} is the language type of Object. This
 * includes: arrays, functions, objects, regexes, `new Number(0)`, and
 * `new String('')`.
 *
 * If {@param plain} is true, the function will check if every item is a plain
 * object ({}).
 *
 * @param arr - Data array
 * @param plain - If true, check if each item is a plain object
 */
const isObjectArray = (arr: Array<ANYTHING>, plain = false): boolean => {
  return arr.every(item => (plain ? isPlainObject : isObject)(item))
}

export default isObjectArray
