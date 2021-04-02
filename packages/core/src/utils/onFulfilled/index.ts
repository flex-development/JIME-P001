import type { ANYTHING } from '@flex-development/json'
import type { AxiosResponse } from 'axios'

/**
 * @file Implementation - onFulfilled
 * @module utils/onFulfilled
 */

/**
 * Returns the data from a successful Axios request.
 *
 * @param {AxiosResponse<ANYTHING>} response - Success response object
 * @param {ANYTHING} response.data - Response data
 * @return {ANYTHING} Response data
 */
const onFulfilled = (
  response: AxiosResponse<ANYTHING>
): ANYTHING | AxiosResponse<ANYTHING> => {
  return response.data
}

export default onFulfilled
