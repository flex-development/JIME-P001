/**
 * Type representing any object (`{}`) value.
 */
export declare type AnyObject = Record<string, any>

/**
 * Boolean and string values representing `true` or `false`.
 */
export declare type Booleanish = boolean | 'true' | 'false'

/**
 * Type capturing null, undefined, and empty strings.
 */
export declare type NonExistent = '' | null | undefined

/**
 * Type representing any string that can also be null.
 */
export declare type NullishString = string | null

/**
 * Type capturing primitive value types.
 */
export declare type Primitive = boolean | number | string
