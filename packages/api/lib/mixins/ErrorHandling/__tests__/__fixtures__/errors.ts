import { createApiError, createRetryError } from '@algolia/transporter'
import createError from '@flex-development/kustomzcore/utils/createError'

/**
 * @file Test Fixture - Errors
 * @module lib/mixins/ErrorHandling/tests/fixtures/errors
 */

jest.unmock('@flex-development/kustomzcore/utils/createError')

export const ALGOLIA_API_ERROR = createApiError(
  'AlgoliaApiError message',
  500,
  []
)

export const ALGOLIA_API_ERROR_INDEX_404 = createApiError(
  'Index foo does not exist',
  404,
  []
)

export const ERROR = new Error('Error message')

export const ERROR_JSON = createError('ErrorJSON message')

export const ERROR_JSON_WITH_DATA = createError('ErrorJSON with data message', {
  test: true
})

export const RETRY_ERROR = createRetryError([])
