import URI from 'urijs'
import createLogger from '../config/logger'
import type { APIRequest } from '../types'

/**
 * @file Implementation - initPathLogger
 * @module lib/middleware/initPathLogger
 */

/**
 * Attaches a Pino child logger instance to the incoming {@param req}.
 *
 * @param req - Incoming API request
 */
const initPathLogger = (req: APIRequest): void => {
  // Get request path
  req.path = URI.parse(req.url).path as string

  // Attach logger
  req.logger = createLogger(req.path)
}

export default initPathLogger
