import type { AxiosRequestConfig } from 'axios'
import createAxiosError from 'axios/lib/core/createError'
import { ClientRequest } from 'http'
import type { AxiosError } from '../../../../types/errors'

/**
 * @file Test Fixture - Axios Error Without Response
 * @module utils/createError/tests/fixtures/error-with-no-response
 */

const config: AxiosRequestConfig = {
  method: 'get',
  url: 'http://localhost:8080'
}

const message = 'Test message'

const request = new ClientRequest(config.url as string)

export default createAxiosError(message, config, null, request) as AxiosError
