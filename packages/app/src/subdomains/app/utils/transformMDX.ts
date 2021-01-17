import { axios } from '@app/config/axios'
import { TransformOutput } from 'buble'
import debug from 'debug'

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
  const url = 'https://mdjsx.flexdevelopment.vercel.app/'

  try {
    return axios<TransformOutput>({ data, method: 'get', url })
  } catch (error) {
    debug('subdomains/app/utils/transformMDX')(error)
    throw error
  }
}

export default transformMDX
