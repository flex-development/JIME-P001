import type { AnyObject } from '@flex-development/json'
import type { OrPromise } from '@flex-development/kustomzcore'
import type { APIRequest as APIReq } from '@kapi/types'
import type {
  VercelApiHandler as Handler,
  VercelRequest as VercelReq,
  VercelRequestQuery as Query,
  VercelResponse as Res
} from '@vercel/node'
import { Server } from 'http'
import merge from 'lodash/merge'
import qs from 'querystring'
import type { SuperTest, Test } from 'supertest'
import supertest from 'supertest'
import { createServer } from 'vercel-node-server'

/**
 * @file Test Utilities
 * @module tests/utils
 */

export type SuperTestSetup = { request: SuperTest<Test>; server: Server }

export type SuperTestSubject<Req extends APIReq | VercelReq = APIReq> = {
  (req: Req, res: Res): OrPromise<void>
}

/**
 * Returns a setup object for integration tests using `supertest`.
 *
 * @see https://github.com/visionmedia/supertest
 *
 * @template Req - Request object type
 *
 * @param {SuperTestSubject} subject - Test route
 * @return {SuperTestSetup} SuperTest server and request object
 */
export function supertestSetup<Req extends APIReq | VercelReq = APIReq>(
  subject: SuperTestSubject<Req>
): SuperTestSetup {
  const server = createServer(subject as Handler)
  return { request: supertest(server), server }
}

/**
 * Generates a URL path with optional query parameters.
 *
 * @param {Query | AnyObject | string} [pathOrQuery] - URL path or query params
 * @param {Query | AnyObject} [query] - Query parameters
 * @return {string} Test URL path with stringified query params
 */
export const testURLPath = (
  pathOrQuery?: Query | AnyObject | string,
  query?: Query | AnyObject
): string => {
  if (!pathOrQuery || typeof pathOrQuery === 'string') {
    const querystring = query ? `?${qs.stringify(query)}` : ''
    return `/${pathOrQuery || ''}${querystring}`
  }

  return `/?${qs.stringify(merge(pathOrQuery, query))}`
}
