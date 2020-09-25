import {isBoolean} from 'lodash'
import {useCallback, useState} from 'react'

/**
 * @file Boolean value hook
 * @module hooks/useBoolean
 */

/**
 * Takes {@param initial} as the starting boolean value, and provides methods to
 * toggle the boolean value.
 *
 * @param initial - Initial boolean(ish) value
 */
export const useBoolean = (initialValue: any): any => {
  const bool = (value: any): boolean => {
    return isBoolean(value) ? value : value !== undefined
  }

  const [boolean, setBoolean] = useState(bool(initialValue))

  return {
    boolean,
    setBoolean: (value: boolean): void => setBoolean(bool(value)),
    setFalse: (): void => setBoolean(false),
    setTrue: (): void => setBoolean(true),
    toggle: useCallback(() => setBoolean(bool => !bool), []),
  }
}

export default useBoolean
