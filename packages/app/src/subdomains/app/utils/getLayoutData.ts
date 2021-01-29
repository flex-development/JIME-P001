import kapi from '@app/config/axios-kapi'
import log from '@app/config/logger'
import type { GetLayoutDataResJSON } from '@kapi/types'

/**
 * @file Implementation - getLayoutData
 * @module subdomains/app/utils/getLayoutData
 */

/**
 * Fetches the data to populate the `Layout` component. The sidebar profile
 * snippet and playlist bar songs will be included in the response.
 *
 * @async
 * @throws {FeathersErrorJSON}
 */
const getLayoutData = async (): Promise<GetLayoutDataResJSON> => {
  try {
    return await kapi<GetLayoutDataResJSON>({ url: 'layout' })
  } catch (error) {
    log('subdomains/app/utils/getLayoutData').error(error)
    throw error
  }
}

export default getLayoutData
