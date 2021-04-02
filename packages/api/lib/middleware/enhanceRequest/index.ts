import createLogger from '@flex-development/kustomzcore/config/logger'
import type { VercelRequest } from '@vercel/node'
import URI from 'urijs'
import type { APIRequest } from '../../types'

/**
 * @file Implementation - enhanceRequest
 * @module lib/middleware/enhanceRequest
 */

/**
 * Route enhancement middleware. The following will happen:
 *
 * - The property `path` will be attached to {@param req}
 * - The property `logger` will be initialized as a Pino child logger instance
 *
 * @param {VercelRequest} req - API request object
 * @return {boolean} `true` when initialization is complete
 */
const enhanceRequest = (req: VercelRequest): req is APIRequest => {
  // Get path segment of request URL
  const path = URI.parse(req.url as string).path as string

  // Attach logger and path segment of request URL
  req = Object.assign(req, { ...req, logger: createLogger(path), path })

  return true
}

export default enhanceRequest
