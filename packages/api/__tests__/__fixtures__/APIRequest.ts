import createLogger from '@flex-development/kustomzcore/config/logger'
import type { APIRequest as IAPIRequest } from '@kapi/types'
import type { Logger } from 'pino'
import URI from 'urijs'
import type { MockVercelRequestOptions } from './VercelRequest'
import VercelRequest from './VercelRequest'

/**
 * @file Global Test Fixture - Mock APIRequest Class
 * @module tests/fixtures/APIRequest
 */

export default class APIRequest extends VercelRequest implements IAPIRequest {
  logger: Logger
  path: string

  constructor(options: MockVercelRequestOptions) {
    super(options)

    this.path = URI.parse(options.url).path as string
    this.logger = createLogger(this.path)
  }
}
