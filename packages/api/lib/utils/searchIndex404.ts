import type { AlgoliaError } from '../types'

/**
 * @file Implementation - searchIndex404
 * @module lib/utils/searchIndex404
 */

/**
 * Returns true if {@param error} is a missing search index error.
 *
 * @param error - Algolia error
 */
const searchIndex404 = (error: AlgoliaError): boolean => {
  const { message, status } = error

  const message_start_pass = message.toLowerCase().startsWith('index')
  const message_end_pass = message.toLowerCase().endsWith('does not exist')

  return status === 404 && message_start_pass && message_end_pass
}

export default searchIndex404
