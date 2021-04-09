import { createApiError, createRetryError } from '@algolia/transporter'

/**
 * @file Test Fixture - Algolia Errors
 * @module lib/mixins/ErrorHandling/tests/fixtures/algolia-errors
 */

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

export const RETRY_ERROR = createRetryError([])
