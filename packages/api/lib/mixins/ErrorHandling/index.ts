import type { AnyObject } from '@flex-development/json'
import type { ErrorJSON } from '@flex-development/kustomzcore'
import ga from '@flex-development/kustomzcore/config/google-analytics'
import vercel from '@flex-development/kustomzcore/config/vercel-env'
import createError from '@flex-development/kustomzcore/utils/createError'
import type { VercelResponse } from '@vercel/node'
import type { EventParam } from 'ga-measurement-protocol'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import type { AlgoliaError, APIError, APIRequest } from '../../types'

/**
 * @file Implementation - Error Handling Mixin
 * @module lib/mixins/ErrorHandling
 */

/**
 * Error handling service.
 *
 * @see https://www.algolia.com/doc/api-client/methods/advanced/#error-handling
 * @see https://github.com/wusuopu/ts-ga-measurement-protocol
 *
 * @class
 */
class ErrorHandling {
  /**
   * Converts {@param error} into a `ErrorJSON` object.
   *
   * @param {APIError} error - Error object
   * @param {AnyObject} [data] - Additional error data
   * @return {ErrorJSON} Error object
   */
  static formatError(error: APIError, data: AnyObject = {}): ErrorJSON {
    const { env } = vercel

    // Cast error
    const $error: AlgoliaError = error as AlgoliaError

    // Get error details
    const { status, transporterStackTrace } = error as AlgoliaError

    // Get error data
    const $data: AnyObject = merge((error as ErrorJSON)?.data ?? {}, {
      ...data,
      created_at: env !== 'development' ? new Date().valueOf() : undefined,
      search_index_404: ErrorHandling.searchIndex404(error) || undefined,
      transporterStackTrace,
      vercel: env !== 'development' ? vercel : undefined
    })

    return createError($error, $data, status)
  }

  /**
   * Handles an API request error.
   *
   * Errors will be logged and tracked with Google Analytics.
   *
   * @template Req - API request object
   * @template Res - Server response object
   *
   * @async
   * @param {Req} req - API request object
   * @param {Res} res - Server response object
   * @param {APIError} err - Request error object
   * @param {AnyObject} [data] - Additional error data
   * @return {Promise<void>} Empty promise
   */
  static async handleAPIError<
    Req extends APIRequest = APIRequest,
    Res extends VercelResponse = VercelResponse
  >(req: Req, res: Res, err: APIError, data: AnyObject = {}): Promise<void> {
    // Convert into `ErrorJSON` object
    const error = ErrorHandling.formatError(err, {
      ...data,
      req: pick(req, ['headers', 'query', 'url'])
    })

    // Log error
    if (vercel.env !== 'development') req.logger.error({ error })

    // Track error with Google Analytics
    await ErrorHandling.track(error, {
      method: req.method.toUpperCase(),
      path: req.path,
      ua: error.data.req.headers['user-agent']
    })

    // ! Remove senstive information
    delete error.data.transporterStackTrace

    // Send error response
    res.status(error.code).json(error)
    return
  }

  /**
   * Returns true if {@param error} is a missing search index error.
   *
   * @template E - Error object
   * @param {AlgoliaError} error - Algolia error
   * @return {boolean} True if formatted error message starts with "index" and
   * ends with "does not exist"
   */
  static searchIndex404<E extends AnyObject = AlgoliaError>(error: E): boolean {
    const { message, status } = error

    const message_start_pass = message?.toLowerCase().startsWith('index')
    const message_end_pass = message?.toLowerCase().endsWith('does not exist')

    return status === 404 && message_start_pass && message_end_pass
  }

  /**
   * Sends an error `event` hit will be sent to Google Analytics.
   *
   * Responses will be tracked under the "Error Response" category, and labeled
   * with the error message.
   *
   * @param {ErrorJSON} error - Error to report
   * @param {Partial<EventParam>} [param] - Additional event parameters
   * @return {Promise<boolean>} Promise containing `true` if event was tracked
   * successfully, `false` otherwise
   */
  static async track(
    error: ErrorJSON,
    param: Partial<EventParam> = {}
  ): Promise<boolean> {
    const { code: eventValue, message: eventLabel, name: eventAction } = error

    // Build base event param object
    const bparam: EventParam = {
      error: JSON.stringify(error),
      eventAction,
      eventCategory: ga.categories.responses.error,
      eventLabel,
      eventValue
    }

    return await ga.event(merge(bparam, param))
  }
}

export default ErrorHandling
