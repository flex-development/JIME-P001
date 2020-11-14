import {
  AnyObject,
  NullishPrimitive
} from '@flex-development/kustomzdesign/types'
import { SortOrder } from '../utils'

/**
 * @file Subdomain Interfaces - QueryExecutor
 * @module config/interfaces/IQueryExecutor
 */

/**
 * Interface for executing queries against JSON data from Firebase RTD
 * repositories.
 */
export interface IQueryExecutor<T extends AnyObject = AnyObject> {
  $eq(data: QEData<T>, field: string, $eq?: FieldQuery['$eq']): typeof data
  $gt(data: QEData<T>, field: string, $gt?: FieldQuery['$gt']): typeof data
  $gte(data: QEData<T>, field: string, $gte?: FieldQuery['$gte']): typeof data
  $in(data: QEData<T>, field: string, $in?: FieldQuery['$in']): typeof data
  $limit(data: QEData<T>, $limit: Query<T>['$limit']): typeof data
  $lt(data: QEData<T>, field: string, $lt?: FieldQuery['$lt']): typeof data
  $lte(data: QEData<T>, field: string, $lte?: FieldQuery['$lte']): typeof data
  $ne(data: QEData<T>, field: string, $ne?: FieldQuery['$ne']): typeof data
  $nin(data: QEData<T>, field: string, $nin?: FieldQuery['$nin']): typeof data
  $select(data: QEData<T>, $select?: Query<T>['$select']): typeof data
  $skip(data: QEData<T>, $skip?: Query<T>['$skip']): typeof data
  $sort(data: QEData<T>, $sort?: Query<T>['$sort']): typeof data
  query(data: QEData<T>, params?: Query<T>): typeof data
}

/**
 * Parameters that can be used when querying fields of an entity.
 *
 * - https://docs.feathersjs.com/api/databases/querying
 * - https://docs.mongodb.com/manual/reference/operator/query-comparison
 */
export type FieldQuery = {
  /**
   * Matches values that are equal to a specified value.
   */
  $eq?: NullishPrimitive | NullishPrimitive[]

  /**
   * Matches values that are greater than a specified value.
   */
  $gt?: NullishPrimitive

  /**
   * Matches values that are greater than or equal to a specified value.
   */
  $gte?: NullishPrimitive

  /**
   * Matches any of the values specified in an array.
   */
  $in?: NullishPrimitive[] | AnyObject[]

  /**
   * Matches values that are less than a specified value.
   */
  $lt?: NullishPrimitive

  /**
   * Matches values that are less than or equal to a specified value.
   */
  $lte?: NullishPrimitive

  /**
   * Matches all values that are not equal to a specified value.
   */
  $ne?: NullishPrimitive | NullishPrimitive[]

  /**
   * Matches none of the values specified in an array.
   */
  $nin?: NullishPrimitive[] | AnyObject[]
}

/**
 * Object containing entity field names mapped to query requests.
 */
export type FieldQueryParams<T extends AnyObject> = Partial<
  Record<string, Array<keyof T> | FieldQuery | QuerySort | number>
>

/**
 * Type of data that can be handled by the `QueryExecutor`.
 */
export type QEData<T extends AnyObject = AnyObject> = Array<T | Partial<T>>

/**
 * Object representing a query.
 */
export type Query<T extends AnyObject> = FieldQueryParams<T> & {
  /**
   * Maximum number of items to return.
   */
  $limit?: number

  /**
   * Pick which fields to include in the result.
   */
  $select?: Array<keyof T>

  /**
   * Skip the specified number of results.
   */
  $skip?: number

  /**
   * Object containing properties to sort data by mapped to the sort order.
   *
   * - https://docs.feathersjs.com/api/databases/querying.html#sort
   * - https://firebase.google.com/docs/database/web/lists-of-data#sort_data
   */
  $sort?: QuerySort
}

/**
 * Object containing repository sorting rules.
 */
export type QuerySort = Record<string, SortOrder>
