import type {
  VercelRequest as IVercelRequest,
  VercelRequestBody,
  VercelRequestCookies,
  VercelRequestQuery
} from '@vercel/node'
import isUndefined from 'lodash/isUndefined'
import omit from 'lodash/omit'
import type { MockRequestOptions } from 'mock-http'
import { Request } from 'mock-http'

/**
 * @file Global Test Fixture - Mock VercelRequest Class
 * @module tests/fixtures/VercelRequest
 * @see https://github.com/commenthol/mock-http
 * @see https://github.com/vercel/vercel/blob/master/packages/node/src
 */

export interface MockVercelRequestOptions extends MockRequestOptions {
  body?: VercelRequestBody
  cookies?: VercelRequestCookies
  query?: VercelRequestQuery
  url: string
}

export default class VercelRequest extends Request implements IVercelRequest {
  body: VercelRequestBody = null
  cookies: VercelRequestCookies = {}
  method: string
  query: VercelRequestQuery = {}
  url: string

  constructor(options: MockVercelRequestOptions) {
    super({
      ...omit(options, ['body', 'cookies', 'query']),
      method: (options.method || 'GET').toUpperCase()
    })

    this.body = isUndefined(options.body) ? null : options.body
    this.cookies = options.cookies || {}
    this.query = options.query || {}
  }
}
