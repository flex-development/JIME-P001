import type {
  IMetafield,
  IPage
} from '@flex-development/kustomzcore/dist/types'
import ofa from '@flex-development/kustomzcore/dist/utils/objectFromArray'
import join from 'lodash/join'
import merge from 'lodash/merge'
import type { SEOData } from '../../types'
import globalSEO from './globalSEO'

/**
 * @file Implementation - pageSEO
 * @module utils/seo/pageSEO
 */

/**
 * Returns an object with SEO data for a page resource.
 *
 * @async
 * @param page - Page resource data
 */
const pageSEO = async (page: IPage | Promise<IPage>): Promise<SEOData> => {
  page = await page

  // Get global SEO data
  const global = await globalSEO()

  // Get SEO from metafields
  const {
    description_tag = { value: '' } as IMetafield,
    keywords: page_keywords = { value: '' } as IMetafield,
    title_tag = { value: '' } as IMetafield
  } = ofa(page.metafield, 'key')

  // Get array of page keywords
  const keywords: string[] = (page_keywords?.value as string)?.split(',') ?? []

  return merge(global, {
    description: description_tag.value,
    keywords: join([...keywords, ...(global.keywords?.split(',') ?? [])], ','),
    title: title_tag.value
  })
}

export default pageSEO
