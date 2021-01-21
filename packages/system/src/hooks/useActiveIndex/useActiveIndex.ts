import { useCallback, useEffect } from 'react'
import type { UseNumberActions } from 'react-hanger/array/useNumber'
import useNumber from 'react-hanger/array/useNumber'

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
   * Returns true if {@param curr} is equal to the `active` state.
   *
   * @param curr - Current index
   */
  isActive(curr: number): boolean

  /**
   * Updates the active index state.
   *
   * @param new_index - New index state
   */
  setIndex: (curr: string | number) => void
}

/**
 * Returns an object containing the active index and functions to update the
 * active state. The value of {@param options.lowerLimit} will be set to -1.
 *
 * @see https://github.com/kitze/react-hanger#usenumber
 *
 * @param index - Current active index
 * @param options - useNumber options
 */
export const useActiveIndex = (
  index: number | string = 0,
  options: Parameters<typeof useNumber>[1] = {}
): UseActiveIndex => {
  // Get `useNumber` options and override lowerLimit settings
  const _options = { ...options, lowerLimit: -1 }

  // Initialize active index state
  const [active, { decrease, increase, setValue }] = useNumber(-1, _options)

  /**
   * Helper function to convert {@param val} into a number if it's a string.
   * If the value is already a number, it will be returned.
   *
   * @param val - Number or string containing number to convert
   */
  const parse = (val: number | string) => {
    let parsed = val as number

    if (typeof val === 'string') {
      // Get number from string. Empty strings will be set to '-1'
      const _val = JSON.parse(val.length ? val : '-1')

      // Use lowerLimit settings to set minimum value
      parsed = _val < _options.lowerLimit ? _options.lowerLimit : _val
    }

    return parsed
  }

  // Callback version of `parse`
  const parseCB = useCallback(parse, [_options.lowerLimit])

  /**
   * Updates the active state.
   *
   * @param new_index - New index state
   */
  const setIndex = (new_index: typeof index) => setValue(parseCB(new_index))

  // Callback version of `setIndex`
  const setIndexCB = useCallback(setIndex, [parseCB, setValue])

  /**
   * Returns true if {@param curr} is equal to the value of the active state.
   *
   * @param curr - Current index
   */
  const isActive = (curr: typeof index): boolean => {
    return parseCB(curr) === active
  }

  // Callback version of `isActive`
  const isActiveCB = useCallback(isActive, [active, parseCB])

  // Update active state if args.index changes
  useEffect(() => {
    setIndexCB(index)
  }, [index, setIndexCB])

  return {
    active,
    decreaseIndex: decrease,
    increaseIndex: increase,
    isActive: isActiveCB,
    setIndex: setIndexCB
  }
}
