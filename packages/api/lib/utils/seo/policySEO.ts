import type { IPolicy } from '@flex-development/kustomzcore'
import merge from 'lodash/merge'
import stripHtml from 'string-strip-html'
import type { SEOData } from '../../types'
import globalSEO from './globalSEO'

/**
 * @file Implementation - policySEO
 * @module utils/seo/policySEO
 */

/**
 * Returns an object with SEO data for a policy resource.
 *
 * @param policy - Policy resource data
 */
const policySEO = async ({ body, title }: IPolicy): Promise<SEOData> => {
  return merge(await globalSEO(), {
    description: stripHtml(body).result,
    title
  })
}

export default policySEO
