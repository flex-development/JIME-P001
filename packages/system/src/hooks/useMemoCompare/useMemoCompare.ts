import { ANYTHING } from '@flex-development/json'
import { useEffect, useMemo, useRef } from 'react'

/**
 * @file Use previous value if data hasn't changed
 * @module hooks/useMemoCompare/impl
 */

export type MemoCompare<T = ANYTHING> = (v1: T, v2: T) => boolean

/**
 * Takes a custom compare function that receives the previous and new value.
 *
 * The compare function can then compare nested properties, call object methods,
 * or anything else to determine equality. If the compare function returns true,
 * then the hook returns the old data reference.
 *
 * @see https://usehooks.com/useMemoCompare
 *
 * @param next - Next data value
 * @param compare - Function to compare previous value to next value
 */
function useMemoCompare<T = ANYTHING>(next: T, compare: MemoCompare): T {
  // Ref for storing previous value
  const previous = useRef<T>()

  // Pass prev and next value to compare function to determine equality
  const equal = useMemo<boolean>(() => {
    return compare(previous.current, next)
  }, [compare, next])

  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true
  useEffect(() => {
    if (!equal) previous.current = next
  })

  // If equal then return the previous value
  return equal ? (previous.current as T) : next
}

export default useMemoCompare
