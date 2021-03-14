import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject } from '@flex-development/json'
import ga, {
  GA_CATEGORIES
} from '@flex-development/kustomzcore/config/google-analytics'
import vercel from '@flex-development/kustomzcore/config/vercel-env'
import createError from '@flex-development/kustomzcore/utils/createError'
import type { EventParam } from 'ga-measurement-protocol'
import merge from 'lodash/merge'
import type { AlgoliaError, APIError } from '../types'

/**
 * @file Implementation - Error Handling Service
 * @module services/ErrorService
 */

/**
 * Error handling service.
 *
 * @see https://www.algolia.com/doc/api-client/methods/advanced/#error-handling
 * @see https://github.com/wusuopu/ts-ga-measurement-protocol
 *
 * @class
 */
class ErrorService {
  /**
   * Converts {@param error} into a `FeathersErrorJSON` object.
   *
   * @param {APIError} error - Error object
   * @param {AnyObject} [data] - Additional error data
   * @return {FeathersErrorJSON} Error object
   */
  static format(error: APIError, data: AnyObject = {}): FeathersErrorJSON {
    // Cast error
    const $error: AlgoliaError = error as AlgoliaError

    // Get error details
    const { status, transporterStackTrace } = error as AlgoliaError

    // Get error data
    const $data: AnyObject = merge((error as FeathersErrorJSON)?.data ?? {}, {
      ...data,
      created_at: new Date().valueOf(),
      search_index_404: ErrorService.searchIndex404(error) || undefined,
      transporterStackTrace,
      vercel: vercel.env !== 'development' ? vercel : undefined
    })

    return createError($error, $data, status)
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
   * @param {FeathersErrorJSON} error - Error to report
   * @param {Partial<EventParam>} [param] - Additional event parameters
   * @return {Promise<boolean>} Promise containing `true` if event was tracked
   * successfully, `false` otherwise
   */
  static async track(
    error: FeathersErrorJSON,
    param: Partial<EventParam> = {}
  ): Promise<boolean> {
    const { code: eventValue, message: eventLabel, name: eventAction } = error

    // Build base event param object
    const bparam: EventParam = {
      error: JSON.stringify(error),
      eventAction,
      eventCategory: GA_CATEGORIES.responses.error,
      eventLabel,
      eventValue
    }

    return await ga.event(merge(bparam, param))
  }
}

export default ErrorService
