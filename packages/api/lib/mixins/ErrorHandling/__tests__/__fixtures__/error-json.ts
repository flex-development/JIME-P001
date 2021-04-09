import createError from '@flex-development/kustomzcore/utils/createError'

/**
 * @file Test Fixture - ErrorJSON objects
 * @module lib/mixins/ErrorHandling/tests/fixtures/error-json
 */

jest.unmock('@flex-development/kustomzcore/utils/createError')

export const ERROR_JSON = createError('ErrorJSON message')

export const ERROR_JSON_WITH_DATA = createError('ErrorJSON with data message', {
  test: true
})
