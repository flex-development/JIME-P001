/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * To be used in cases where `any` is a valid type.
 */
export type ANYTHING = any

/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Type representing any object (`{}`) value.
 */
export type AnyObject = Record<string, Any>

/**
 * Boolean and string values representing `true` or `false`.
 */
export type Booleanish = boolean | 'true' | 'false'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Helper type indicating a type that needs a better type declaration.
 */
export type FIXME = any

/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Type capturing null, undefined, and empty strings.
 */
export type NonExistent = '' | null | undefined

/**
 * Type representing any boolean that can also be null.
 */
export type NullishBoolean = boolean | null

/**
 * Type representing any number that can also be null.
 */
export type NullishNumber = number | null

/**
 * Type representing any `Primitive` that can also be null.
 */
export type NullishPrimitive = Primitive | null

/**
 * Type representing any string that can also be null.
 */
export type NullishString = string | null

/**
 * Type capturing primitive value types.
 */
export type Primitive = boolean | number | string
