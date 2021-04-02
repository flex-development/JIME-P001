import type { AxiosError } from '@flex-development/kustomzcore/types'
import createAxiosError from 'axios/lib/core/createError'

/**
 * @file Test Fixture - AxiosError
 * @module lib/mixins/ShopifyAPI/tests/fixtures/axios-error
 */

const message = 'Request failed with status code 400'

const response = {
  config: {},
  data: {
    errors: 'Limit exceeds maximum limit of 250'
  },
  headers: {},
  status: 400,
  statusText: 'BAD REQUEST'
}

export default createAxiosError(
  message,
  response.config,
  undefined,
  undefined,
  response
) as AxiosError
