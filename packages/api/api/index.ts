import type { VercelResponse as Res } from '@vercel/node'
import { readFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'yaml'
import routeWrapper from '../lib/middleware/routeWrapper'
import type { APIRequest as Req } from '../lib/types'

/**
 * @file Handler - API Root
 * @module api
 */

/**
 * Returns the API documentation as a JSON object.
 * Documentation follows OpenAPI Specification v3.0.3 standards.
 *
 * @async
 * @param {Req} req - API request object
 * @param {Res} res - Server response object
 * @return {void} Nothing
 */
const next = (req: Req, res: Res): void => {
  const docspath = join(__dirname, '..', 'lib/config/openapi.yaml')

  res.json(parse(readFileSync(docspath, 'utf-8')))
  return
}

/**
 * Route handler.
 *
 * @param {Req} req - API request object
 * @param {Res} res - Server response object
 * @return {void} Nothing
 */
export default async (req: Req, res: Res): Promise<void> => {
  return routeWrapper<Req, Res>(req, res, next)
}
