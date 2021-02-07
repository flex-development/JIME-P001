import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject } from '@flex-development/json'
import { createError } from '@flex-development/kustomzcore'
import merge from 'lodash/merge'
import type { AlgoliaError } from '../../types'
import searchIndex404 from './searchIndex404'

/**
 * @file Implementation - formatError
 * @module lib/utils/errors/formatError
 */

/**
 * Converts {@param error} into `FeathersErrorJSON`.
 *
 * @param error - Error argument
 * @param data - Additional error data
 */
const formatError = (
  error: Error | AlgoliaError | FeathersErrorJSON,
  data: AnyObject = {}
): FeathersErrorJSON => {
  // If already `FeathersErrorJSON`, return error argument
  if ((error as FeathersErrorJSON).className) return error as FeathersErrorJSON

  // Cast error
  const $error: AlgoliaError = error as AlgoliaError

  // Get error details
  const { name, message, stack, status, transporterStackTrace } = $error

  // Get error data
  const $data: AnyObject = merge({ name, stack, transporterStackTrace }, data)

  // Check for "Index <foo> does not exist" error
  $data.search_index_404 = searchIndex404($error) || undefined

  return createError(message, $data, status)
}

export default formatError
