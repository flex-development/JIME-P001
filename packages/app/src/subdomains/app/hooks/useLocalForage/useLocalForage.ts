import localforage from '@app/config/localforage'
import { ANYTHING } from '@flex-development/json'
import { Logger } from '@flex-development/kustomzcore'
import { isFunction } from 'lodash'
import { useState } from 'react'

/**
 * @file Use local storage (SSR friendly)
 * @module subdomains/app/hooks/useLocalForage/impl
 */

/**
 * `useLocalForage` return type.
 */
export type UseLocalForage<T = ANYTHING> = [T, (v: T | ((v: T) => T)) => void]

/**
 * Manipulate key/value pairs in Index DB, Web SQL, or Local Stoage.
 *
 * @see https://github.com/localForage/localForage
 *
 * @param key - Name of local storage key
 * @param value - Initial value to store
 */
function useLocalForage<T = ANYTHING>(
  key: string,
  value: T | null = null
): UseLocalForage<T | null> {
  // State to store value
  // Pass initial state function to useState so logic is only executed once
  const [persisted, setPersisted] = useState<T | null>(() => {
    if (typeof window === 'undefined') return value

    let item = value

    localforage.getItem<T | null>(key, (err, item_value) => {
      if (err) Logger.error({ useLocalForage: err })
      item = ((item_value as unknown) as T) || null
    })

    return item
  })

  /**
   * Updates the local storage state.
   *
   * @param value - New storage value or function that returns new value
   */
  const persist = (value: T | null | ((value: T | null) => T | null)): void => {
    // Allow value to be a function so we have same API as useState
    const state = isFunction(value) ? value(persisted) : value

    // Persist to local storage
    if (typeof window !== 'undefined') {
      localforage.setItem<T | null>(key, state, err => {
        if (err) Logger.error({ useLocalForage: err })
      })
    }

    return setPersisted(state)
  }

  return [persisted, persist]
}

export { useLocalForage }
