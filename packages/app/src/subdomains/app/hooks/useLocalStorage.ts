import { ANYTHING } from '@flex-development/types'
import { isFunction } from 'lodash'
import { useState } from 'react'
import { Logger } from '../utils'

/**
 * @file Use local storage
 * @module subdomains/app/hooks/useLocalStorage
 */

/**
 * `useLocalStorage` return type.
 */
export type UseLocalStorage<T = ANYTHING> = [T, (v: T | ((v: T) => T)) => void]

/**
 * Returns an object with CRUD functions to interact with local storage.
 *
 * @param key - Name of local storage key
 * @param value - Initial value to store
 */
function useLocalStorage<T = ANYTHING>(
  key: string,
  value: T
): UseLocalStorage<T> {
  // State to store value
  // Pass initial state function to useState so logic is only executed once
  const [persisted, setPersisted] = useState<T>(() => {
    if (typeof window === 'undefined') return value

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : value
    } catch (error) {
      Logger.error({ useLocalStorage: error })
      return value
    }
  })

  /**
   * Updates the local storage state.
   *
   * @param value - New storage value or function that returns new value
   */
  const persist = (value: T | ((value: T) => T)): void => {
    // Allow value to be a function so we have same API as useState
    const state = isFunction(value) ? value(persisted) : value

    // Stringify data to store in local storage
    const stringified = JSON.stringify(state)

    // Save state and persist to local storage
    setPersisted(state)
    if (typeof window !== 'undefined') localStorage.setItem(key, stringified)
  }

  return [persisted, persist]
}

export { useLocalStorage }
