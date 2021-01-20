import { AlgoliaError } from '../../types'

/**
 * @file Implementation - isSearchIndex404Error
 * @module utils/search/isSearchIndex404Error
 */

/**
 * Returns true if {@param error} is a missing search index error.
 *
 * @param error - Algolia error
 */
const isSearchIndex404Error = (error: AlgoliaError): boolean => {
  const { message, status } = error

  const message_start_pass = message.toLowerCase().startsWith('Index')
  const message_end_pass = message.toLowerCase().endsWith('does not exist')

  return status === 404 && message_start_pass && message_end_pass
}

export default isSearchIndex404Error
