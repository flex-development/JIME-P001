import type { AnyObject } from '@flex-development/json'
import type { NumberString, OrPromise } from '@flex-development/kustomzcore'
import ALGOLIA from '@kapi/config/algolia'
import type { APIRequest as APIReq, SearchIndexName } from '@kapi/types'
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
 * Clears a `test` environment search index.
 *
 * @param {SearchIndexName} name - Name of search index to clear
 * @return {Promise<void>} Empty promise when complete
 */
export const cleanupSearchIndex = async (
  name: SearchIndexName
): Promise<void> => {
  const index = ALGOLIA.initIndex(`test_${name}`)
  await index.clearObjects().wait()
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
 * @param {Query | AnyObject | NumberString} [pq] - URL path or query params
 * @param {Query | AnyObject} [query] - Query parameters
 * @return {string} Test URL path with stringified query params
 */
export const testURLPath = (
  pq?: Query | AnyObject | NumberString,
  query?: Query | AnyObject
): string => {
  if (!pq || typeof pq === 'number' || typeof pq === 'string') {
    const querystring = query ? `?${qs.stringify(query)}` : ''
    return `/${pq || ''}${querystring}`
  }

  return `/?${qs.stringify(merge(pq, query))}`
}
