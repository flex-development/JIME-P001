import type { ANYTHING } from '@flex-development/json/dist/utils/types'

/**
 * @file Type Definitions - Utilities
 * @module types/utils
 */

/**
 * Type representing a `number` or `string`.
 */
export type NumberString = number | string

/**
 * Represents data returned by a function, or the return type of a function that
 * never returns a value because an error was thrown.
 */
export type OrNever<T = ANYTHING> = T | never

/**
 * Type representing an asynchronous or synchronous value.
 */
export type OrPromise<T = ANYTHING> = T | Promise<T>
