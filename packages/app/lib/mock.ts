import { FeathersErrorJSON } from '@feathersjs/errors'
import { AnyObject, NullishString } from '@flex-development/kustomtypez'
import { getFeathersError } from './getFeathersError'
import logger from './logger'

/**
 * @file Retrieves a file from the mock data directory
 * @module lib/utils/mock
 */

/**
 * Retrieves a file from the mock data directory.
 *
 * @param filename - File name, including extension
 * @throws {FeathersErrorJSON}
 */
export const mock = async (
  filename?: NullishString
): Promise<JSON | FeathersErrorJSON> => {
  filename = filename && filename.length ? filename : ''

  let data = {} as AnyObject

  try {
    data = (await import(`../../__tests__/__mocks__/data/${filename}`)).default
    if (data?.code) throw data
  } catch (err) {
    data = getFeathersError('Mock data not found.', { filename }, 404)

    logger.error({ 'lib/utils/mock': data })
    throw data.toJSON()
  }

  return JSON.parse(JSON.stringify(data))
}
