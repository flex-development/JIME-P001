import { isString } from 'lodash'
import { useCallback, useEffect } from 'react'
import useNumber, { UseNumberActions } from 'react-hanger/array/useNumber'

/**
 * @file Create a Bootstrap carousel instance
 * @module hooks/useActiveIndex
 */

/**
 * `useActiveIndex` state.
 */
export type UseActiveIndex = {
  /**
   * Index of active slide.
   */
  active: number

  /**
   * Decreases the value of the index.
   */
  decreaseIndex: UseNumberActions['decrease']

  /**
   * Increases the value of the index.
   */
  increaseIndex: UseNumberActions['increase']

  /**
   * Determines the active item index.
   *
   * @param curr - Current array index
   */
  isActive(curr: number): boolean

  /**
   * Updates the active index state.
   */
  setIndex: UseNumberActions['setValue']
}

/**
 * Returns an object containing the active index and a functions to update the
 * active state. The value of {@param options.lowerLimit} will be set to -1.
 *
 * @see https://github.com/kitze/react-hanger#usenumber
 *
 * @param index - Initial active item index
 * @param options - useNumber options
 */
export const useActiveIndex = (
  index: number | string = 0,
  options: Parameters<typeof useNumber>[1] = {}
): UseActiveIndex => {
  // Parse index if string
  if (isString(index)) {
    index = JSON.parse(index.length ? index : '-1')
    index = index as number
  }

  // Set index to zero if negative number
  if (index < -1) index = -1

  // Initialize state
  const [active, { decrease, increase, setValue }] = useNumber(0, {
    ...options,
    lowerLimit: -1
  })

  // Update active state if args.index changes
  useEffect(() => {
    if (index) setValue(index as number)
  }, [index, setValue])

  /* eslint-disable prettier/prettier */

  /**
   * Determines the active item index.
   *
   * @param curr - Current index
   * @returns True if {@param curr} === value of active state
   */
  const isActive = useCallback(
    (curr: typeof index): boolean => {
      return curr === active
    },
    [active]
  )

  /* eslint-enable prettier/prettier */

  return {
    active,
    decreaseIndex: decrease,
    increaseIndex: increase,
    isActive,
    setIndex: setValue
  }
}
