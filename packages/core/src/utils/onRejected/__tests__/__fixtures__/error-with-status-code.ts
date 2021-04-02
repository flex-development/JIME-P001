import type { AxiosRequestConfig } from 'axios'
import createAxiosError from 'axios/lib/core/createError'
import type { AxiosError } from '../../../../types/errors'

/**
 * @file Test Fixture - Error With Status Code (Response)
 * @module utils/createError/tests/fixtures/error-with-status-code
 */

const config: AxiosRequestConfig = {
  method: 'get',
  url: 'http://localhost:8080'
}

const message = 'Test message'

const response = {
  config: {},
  data: {},
  headers: {},
  status: 401,
  statusText: 'NOT AUTHORIZED'
}

export default createAxiosError(
  message,
  config,
  undefined,
  undefined,
  response
) as AxiosError
