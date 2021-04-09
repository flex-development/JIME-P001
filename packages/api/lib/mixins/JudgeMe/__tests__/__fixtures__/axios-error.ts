import type { AxiosError } from '@flex-development/kustomzcore/types'
import createAxiosError from 'axios/lib/core/createError'

/**
 * @file Test Fixture - AxiosError
 * @module lib/mixins/JudgeMe/tests/fixtures/axios-error
 */

const message = 'Request failed with status code 401'

const response = {
  config: {
    params: { api_token: process.env.JUDGEME_API_TOKEN, shop_domain: undefined }
  },
  data: {
    error: 'Failed to authenticate. Shop domain or Api Token is wrong'
  },
  headers: { 'Content-Type': 'application/json' },
  status: 401,
  statusText: 'NOT AUTHORIZED'
}

export default createAxiosError(
  message,
  response.config,
  undefined,
  undefined,
  response
) as AxiosError
