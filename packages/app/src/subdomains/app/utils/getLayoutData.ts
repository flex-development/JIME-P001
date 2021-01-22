import kapi from '@app/config/axios-kapi'
import type { GetLayoutDataResJSON } from '@kapi/types'
import debug from 'debug'

/**
 * @file Implementation - getLayoutData
 * @module subdomains/app/utils/getLayoutData
 */

/**
 * Fetches the data to populate the `AppLayout` component. The sidebar profile
 * snippet and playlist bar songs will be included in the response.
 *
 * @async
 * @throws {FeathersErrorJSON}
 */
const getLayoutData = async (): Promise<GetLayoutDataResJSON> => {
  try {
    return await kapi<GetLayoutDataResJSON>({ url: 'layout' })
  } catch (error) {
    debug('subdomains/app/utils/getLayoutData')(error)
    throw error
  }
}

export default getLayoutData
