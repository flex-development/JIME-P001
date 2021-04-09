import { ZodError, ZodIssueCode } from 'zod'

/**
 * @file Test Fixture - ZodError
 * @module lib/mixins/ErrorHandling/tests/fixtures/zod-error
 * @see https://github.com/colinhacks/zod/blob/alpha/ERROR_HANDLING.md
 */

export default new ZodError([
  {
    code: ZodIssueCode.invalid_type,
    expected: 'string',
    message: 'Invalid input: expected string, received number',
    path: ['names', 1],
    received: 'number'
  },
  {
    code: ZodIssueCode.too_small,
    inclusive: true,
    message: 'Value should be greater than or equal to 10000',
    minimum: 10000,
    path: ['address', 'zipCode'],
    type: 'number'
  },
  {
    code: ZodIssueCode.unrecognized_keys,
    keys: ['extra'],
    message: "Unrecognized key(s) in object: 'extra'",
    path: ['address']
  }
])
