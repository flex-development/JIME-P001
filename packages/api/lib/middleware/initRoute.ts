import URI from 'urijs'
import createLogger from '../config/logger'
import type { APIRequest } from '../types'

/**
 * @file Implementation - initRoute
 * @module lib/middleware/initRoute
 */

/**
 * Route initialization middleware. The following will happen:
 *
 * - The property `path` will be attached to {@param req}
 * - The property `logger` will be initialized as a Pino child logger instance
 *
 * @param req - API request object
 */
const initRoute = (req: APIRequest): void => {
  // Get request path
  req.path = URI.parse(req.url).path as string

  // Attach logger
  req.logger = createLogger(req.path)
}

export default initRoute
