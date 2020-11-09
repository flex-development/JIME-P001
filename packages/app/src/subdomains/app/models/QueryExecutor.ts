import {
  AnyObject,
  NullishPrimitive
} from '@flex-development/kustomzdesign/types'
import {
  get,
  gt,
  gte,
  includes,
  isArray,
  isEqual,
  isNumber,
  isObject,
  isUndefined,
  lt,
  lte,
  orderBy,
  pick,
  takeRight
} from 'lodash'
import { FieldQuery, IQueryExecutor as IQE, QEData, Query } from '../interfaces'

/**
 * @file Executes queries against JSON data from Firebase RTD repositories
 * @module subdomains/app/QueryExecutor
 */

/**
 * Class for executing queries against JSON data from Firebase RTD repositories.
 *
 * @class QueryExecutor
 * @implements IQueryExecutor
 */
export class QueryExecutor<T extends AnyObject = AnyObject> implements IQE<T> {
  /**
   * Creates a new array of data where each object has a {@param field} that
   * equals {@param $eq}.
   *
   * This query supports comparing arrays, array buffers, booleans, date
   * objects, error objects, maps, numbers, Object objects, regexes, sets,
   * strings, symbols, and typed arrays. Object objects are compared by their
   * own, not inherited, enumerable properties. Functions and DOM nodes are not
   * supported.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/query/eq
   * @see https://lodash.com/docs/4.17.15#isEqual
   *
   * @param data - Array of data to filter
   * @param field - Name of field to match against
   * @param $eq - Value to match against
   */
  $eq(data: QEData<T>, field: string, $eq?: FieldQuery['$eq']): typeof data {
    // If value is undefined, returned unfiltered array
    if (isUndefined($eq)) return data

    // Filter array based on equality
    return data.filter(obj => isEqual(get(obj, field), $eq))
  }

  /**
   * Creates a new array of data where each object has a {@param field} that
   * is greater than {@param $gt}.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/query/gt
   * @see https://lodash.com/docs/4.17.15#gt
   *
   * @todo Handle arrays
   *
   * @param data - Array of data to filter
   * @param field - Name of field to match against
   * @param $gt - Value to match against
   */
  $gt(data: QEData<T>, field: string, $gt?: FieldQuery['$gt']): typeof data {
    // If value is undefined, returned unfiltered array
    if (isUndefined($gt)) return data

    // Filter array
    return data.filter(obj => gt(get(obj, field), $gt))
  }

  /**
   * Creates a new array of data where each object has a {@param field} that
   * is greater than or equal to {@param $gte}.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/query/gte
   * @see https://lodash.com/docs/4.17.15#gte
   *
   * @todo Handle arrays
   *
   * @param data - Array of data to filter
   * @param field - Name of field to match against
   * @param $gte - Value to match against
   */
  $gte(data: QEData<T>, field: string, $gte?: FieldQuery['$gte']): typeof data {
    // If value is undefined, returned unfiltered array
    if (isUndefined($gte)) return data

    // Filter array
    return data.filter(obj => gte(get(obj, field), $gte))
  }

  /**
   * Creates a new array of data where each object has a {@param field}
   * value that is included in {@param $in}.
   *
   * If {@param field} is an array field, the function will select objects
   * whose {@param field} holds an array that contains at least one element that
   * matches a value in the specified array.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/query/in
   *
   * @param data - Array of data to filter
   * @param field - Name of field to match against
   * @param $in - Values to match against
   */
  $in(data: QEData<T>, field: string, $in?: FieldQuery['$in']): typeof data {
    // If value isn't an array or array is empty, return original array
    if (!isArray($in) || !$in.length) return data

    // Filter array
    return data.filter(obj => {
      const value = get(obj, field) as NullishPrimitive

      if (isArray(value)) return value.some(v => $in.includes(v))
      return includes<NullishPrimitive | AnyObject>($in, value)
    })
  }

  /**
   * Returns {@param $limit} number of data from the beginning of
   * {@param data}. If {@param $limit} is negative, data will be taken
   * from the end of the array.
   *
   * @see https://lodash.com/docs/4.17.15#take
   * @see https://lodash.com/docs/4.17.15#takeRight
   *
   * @param data - Array of data to take values from
   * @param $limit - Maximum number of data to return
   */
  $limit(data: QEData<T>, $limit?: Query<T>['$limit']): typeof data {
    // If value isn't a number, returned original array
    if (!isNumber($limit)) return data

    // Return portion of original array
    return takeRight(data, $limit < 0 ? $limit * -1 : $limit)
  }

  /**
   * Creates a new array of data where each object has a {@param field} that
   * is less than {@param $lt}.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/query/lt
   * @see https://lodash.com/docs/4.17.15#lt
   *
   * @todo Handle arrays
   *
   * @param data - Array of data to filter
   * @param field - Name of field to match against
   * @param $lt - Value to match against
   */
  $lt(data: QEData<T>, field: string, $lt?: FieldQuery['$lt']): typeof data {
    // If value is undefined, returned unfiltered array
    if (isUndefined($lt)) return data

    // Filter array
    return data.filter(obj => lt(get(obj, field), $lt))
  }

  /**
   * Creates a new array of data where each object has a {@param field} that
   * is less than or equal to {@param $lte}.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/query/lte
   * @see https://lodash.com/docs/4.17.15#lte
   *
   * @todo Handle arrays
   *
   * @param data - Array of data to filter
   * @param field - Name of field to match against
   * @param $lte - Value to match against
   */
  $lte(data: QEData<T>, field: string, $lte?: FieldQuery['$lte']): typeof data {
    // If value is undefined, returned unfiltered array
    if (isUndefined($lte)) return data

    // Filter array
    return data.filter(obj => lte(get(obj, field), $lte))
  }

  /**
   * Creates a new array of data where each object has a {@param field} that
   * does **not** equal {@param $ne}.
   *
   * This query supports comparing arrays, array buffers, booleans, date
   * objects, error objects, maps, numbers, Object objects, regexes, sets,
   * strings, symbols, and typed arrays. Object objects are compared by their
   * own, not inherited, enumerable properties. Functions and DOM nodes are not
   * supported.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/query/eq
   * @see https://lodash.com/docs/4.17.15#isEqual
   *
   * @param data - Array of data to filter
   * @param field - Name of field to match against
   * @param $ne - Value to match against
   */
  $ne(data: QEData<T>, field: string, $ne?: FieldQuery['$ne']): typeof data {
    // If value is undefined, returned unfiltered array
    if (isUndefined($ne)) return data

    // Filter array based on inequality
    return data.filter(obj => !isEqual(get(obj, field), $ne))
  }

  /**
   * Creates a new array of data where each object has a {@param field}
   * value that is **not** included in {@param $nin}.
   *
   * If {@param field} is an array field, the function will select entities
   * whose {@param field} holds an array with no element equal to a value in the
   * specified array.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/query/nin
   *
   * @param data - Array of data to filter
   * @param field - Name of field to match against
   * @param $nin - Values to match against
   */
  $nin(data: QEData<T>, field: string, $nin?: FieldQuery['$nin']): typeof data {
    // If value isn't an array or array is empty, return original array
    if (!isArray($nin) || !$nin.length) return data

    // Filter array
    return data.filter(obj => {
      const value = get(obj, field) as NullishPrimitive

      if (isArray(value)) return value.every(v => !$nin.includes(v))
      return !includes<NullishPrimitive | AnyObject>($nin, value)
    })
  }

  /**
   * Returns an array of data where each entity only contains the fields
   * specified in {@param $select}.
   *
   * @see https://lodash.com/docs/4.17.15#pick
   *
   * @param data - Array of data to slice
   * @param $select - Names of fields to pick from data
   */
  $select(data: QEData<T>, $select?: Query<T>['$select']): typeof data {
    // If value isn't an array or array is empty, return original array
    if (!isArray($select) || !$select.length) return data

    // Mutate data in array
    return data.map(obj => pick(obj, $select))
  }

  /**
   * Offsets {@param data} by {@param $skip}.
   *
   * @param data - Array of data to slice
   * @param $skip - Offset amount
   */
  $skip(data: QEData<T>, $skip?: Query<T>['$skip']): typeof data {
    // If value isn't a number, returned original array
    if (!isNumber($skip)) return data

    // Return portion of original array
    return data.slice($skip, data.length)
  }

  /**
   * Sorts the array according to the rules defined in {@param $sort}.
   *
   * @see https://lodash.com/docs/4.17.15#orderBy
   *
   * @param data - Array of entities to sort
   * @param $sort - Sorting rules
   */
  $sort(data: QEData<T>, $sort?: Query<T>['$sort']): QEData<T> {
    // If value isn't an object or is an empty object, return original array
    if (!isObject($sort) || !Object.keys($sort).length) return data

    // Get names of fields to sort by
    const iteratees = Object.keys($sort)

    // Get order - asc or desc
    const orders = iteratees.map(iter => $sort[iter])

    // Return sorted data
    return orderBy(data, iteratees, orders)
  }
}
