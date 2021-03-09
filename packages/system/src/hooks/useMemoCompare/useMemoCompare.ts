import type { ANYTHING } from '@flex-development/json/utils/types'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import { useEffect, useMemo, useRef } from 'react'

/**
 * @file Use previous value if data hasn't changed
 * @module hooks/useMemoCompare/impl
 */

export type MemoCompare<T = ANYTHING> = (v1: T, v2: T) => boolean
export type MemoNext<T = ANYTHING> = T | (() => T)

/**
 * Takes a custom compare function that receives the previous and new value.
 *
 * The compare function can then compare nested properties, call object methods,
 * or anything else to determine equality. If the compare function returns true,
 * then the hook returns the old data reference.
 *
 * By default, the `isEqual` Lodash module will be used to compare values.
 *
 * @see https://lodash.com/docs/4.17.15
 * @see https://usehooks.com/useMemoCompare
 *
 * @template T - Data type
 *
 * @param {MemoNext<T>} next - Next value or function that returns next value
 * @param {MemoCompare<T>} compare - Function to compare values
 * @return {T} Old data reference if compare function return `true`
 */
export function useMemoCompare<T = ANYTHING>(
  next: MemoNext<T>,
  compare: MemoCompare<T> = isEqual
): T {
  // If next is a function, call it to get initial value
  const _next = isFunction(next) ? next() : next

  // Ref for storing previous value
  const previous = useRef<T>()

  // Pass prev and next value to compare function to determine equality
  const equal = useMemo<boolean>(() => {
    return compare(previous.current as T, _next)
  }, [compare, _next])

  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true
  useEffect(() => {
    if (!equal) previous.current = _next
  })

  // If equal then return the previous value
  return equal ? (previous.current as T) : _next
}
