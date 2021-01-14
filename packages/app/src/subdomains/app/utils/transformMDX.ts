import { axios } from '@app/config/axios'
import Logger from '@flex-development/kustomzcore/config/logger'
import { TransformOutput } from 'buble'

/**
 * @file Implementation - transformMDX
 * @module subdomains/app/utils/transformMDX/impl
 */

/**
 * Parses and transforms MDX into JavaScript.
 *
 * @param data - String containing MDX
 */
const transformMDX = async (data = ''): Promise<TransformOutput> => {
  const url = `${process.env.SITE_URL}/api/mdx`

  try {
    return axios<TransformOutput>({ data, method: 'get', url })
  } catch (error) {
    Logger.error({ transformMDX: error })
    throw error
  }
}

export default transformMDX
