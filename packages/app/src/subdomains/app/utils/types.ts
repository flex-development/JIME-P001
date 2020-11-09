import { ANYTHING } from '@flex-development/kustomzdesign/types'

/**
 * @file Subdomain Utility Types - App
 * @module subdomains/app/types
 */

/**
 * Type that accepts one piece of data or an array of data.
 */
export type OneOrMany<T = ANYTHING> = T | Array<T>

/**
 * Sort types.
 *
 * @see https://lodash.com/docs/4.17.15#orderBy
 */
export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}
