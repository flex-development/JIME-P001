import type { AnyObject, ANYTHING } from '@flex-development/json'
import type { VercelResponse as IVercelResponse } from '@vercel/node'
import {
  format as formatContentType,
  parse as parseContentType
} from 'content-type'
import etag from 'etag'
import omit from 'lodash/omit'
import type { MockResponseOptions } from 'mock-http'
import { Response as Res } from 'mock-http'
import VercelRequest from './VercelRequest'

/**
 * @file Global Test Fixture - Mock VercelResponse Class
 * @module tests/fixtures/VercelResponse
 * @see https://github.com/commenthol/mock-http
 * @see https://github.com/vercel/vercel/blob/master/packages/node/src
 */

/**
 * NOTICE: Logic pulled from official @vercel/node builder package.
 *
 * - https://github.com/vercel/vercel/blob/master/packages/node/src/helpers.ts
 */

export interface MockVercelResponseOptions extends MockResponseOptions {
  req: VercelRequest
}

/**
 * Creates an HTTP ETag.
 *
 * @param {ANYTHING} body - Server response body
 * @param {'utf8'} [encoding] - Content encoding
 * @return {string} HTTP ETag
 */
export function createETag(body: ANYTHING, encoding?: 'utf8'): string {
  const buf = !Buffer.isBuffer(body) ? Buffer.from(body, encoding) : body
  return etag(buf, { weak: true })
}

/**
 * Create and parse HTTP Content-Type header according to RFC 7231.
 *
 * @param {string} type - Content type
 * @param {string} charset - HTTP charset parameter
 * @return {string} Formatted HTTP Content-Type header
 */
export function setCharset(type: string, charset: string): string {
  const parsed = parseContentType(type)
  parsed.parameters.charset = charset

  return formatContentType(parsed)
}

export default class VercelResponse extends Res implements IVercelResponse {
  req: VercelRequest

  constructor(options: MockVercelResponseOptions) {
    super(omit(options, ['req']))

    this.req = options.req
  }

  /**
   * Send a JSON response.
   *
   * @param {ANYTHING} jsonBody - JSON content
   * @return {VercelResponse} Server response object
   */
  json(jsonBody: ANYTHING): VercelResponse {
    const body = JSON.stringify(jsonBody)

    if (!this.getHeader('content-type')) {
      this.setHeader('content-type', 'application/json; charset=utf-8')
    }

    return this.send(body)
  }

  /**
   * Redirect to the URL derived from the specified path with status code "307
   * Temporary Redirect". If {@param statusOrUrl} is an HTTP status code, it
   * will be used instead.
   *
   * @param {number | string} statusOrUrl - Redirect URL or HTTP status code
   * @param {string} [url] - Redirect URL
   * @return {VercelResponse} Server response object
   * @throws {Error}
   */
  redirect(statusOrUrl: string | number, url?: string): VercelResponse {
    if (typeof statusOrUrl === 'string') {
      url = statusOrUrl
      statusOrUrl = 307
    }

    if (typeof statusOrUrl !== 'number' || typeof url !== 'string') {
      throw new Error(
        'Invalid redirect arguments. Please use a single argument URL or status code and URL'
      )
    }

    this.writeHead(statusOrUrl, { Location: url }).end()

    return this
  }

  /**
   * Sets the content of the response.
   *
   * @param {AnyObject | Buffer | string} body - Response content
   * @return {VercelResponse} Server response object
   * @throws {Error}
   */
  send(body: AnyObject | Buffer | string): VercelResponse {
    let chunk: unknown = body
    let encoding: 'utf8' | undefined

    switch (typeof chunk) {
      // string defaulting to html
      case 'string':
        if (!this.getHeader('content-type')) {
          this.setHeader('content-type', 'text/html')
        }
        break
      case 'boolean':
      case 'number':
      case 'object':
        if (chunk === null) {
          chunk = ''
        } else if (Buffer.isBuffer(chunk)) {
          if (!this.getHeader('content-type')) {
            this.setHeader('content-type', 'application/octet-stream')
          }
        } else {
          return this.json(chunk)
        }
        break
    }

    // write strings in utf-8
    if (typeof chunk === 'string') {
      encoding = 'utf8'

      // reflect this in content-type
      const type = this.getHeader('content-type')
      if (typeof type === 'string') {
        this.setHeader('content-type', setCharset(type, 'utf-8'))
      }
    }

    // populate Content-Length
    let len: number | undefined
    if (chunk !== undefined) {
      if (Buffer.isBuffer(chunk)) {
        // get length of Buffer
        len = chunk.length
      } else if (typeof chunk === 'string') {
        if (chunk.length < 1000) {
          // just calculate length small chunk
          len = Buffer.byteLength(chunk, encoding)
        } else {
          // convert chunk to Buffer and calculate
          const buf = Buffer.from(chunk, encoding)
          len = buf.length
          chunk = buf
          encoding = undefined
        }
      } else {
        const valid_types = 'boolean, object, number, string, Buffer, or Stream'
        throw new Error(`\`body\` is not a valid ${valid_types}`)
      }

      if (len !== undefined) {
        this.setHeader('content-length', len)
      }
    }

    // populate ETag
    const etag: string | undefined = createETag(chunk, encoding)
    if (!this.getHeader('etag') && len !== undefined && etag) {
      this.setHeader('etag', etag)
    }

    // strip irrelevant headers
    if (204 === this.statusCode || 304 === this.statusCode) {
      this.removeHeader('Content-Type')
      this.removeHeader('Content-Length')
      this.removeHeader('Transfer-Encoding')
      chunk = ''
    }

    if (this.req.method === 'HEAD') {
      // skip body for HEAD
      this.end()
    } else if (encoding) {
      // respond with encoding
      this.end(chunk, encoding)
    } else {
      // respond without encoding
      this.end(chunk)
    }

    return this
  }

  /**
   * Sets the response status code.
   *
   * @param {number} statusCode - HTTP status code
   * @return {VercelResponse} Server response object
   */
  status(statusCode: number): VercelResponse {
    this.statusCode = statusCode
    return this
  }
}
