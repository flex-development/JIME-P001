import type { IPage as Hit } from '@flex-development/kustomzcore'
import { axios, createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import omit from 'lodash/omit'
import { ALGOLIA, INDEX_SETTINGS, PAGES } from '../../lib/config'
import type { FindCollectionsReq as Req } from '../../lib/types'
import {
  findPagesOptions,
  isSearchIndex404Error,
  pageMetafields,
  pageSEO
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Pages
 * @module api/pages
 */

export default async ({ query, url }: Req, res: Res): Promise<Res> => {
  const INDEX_AS_HANDLE = url?.includes('/pages/index')

  // Convert page query into search options object
  const options = findPagesOptions({
    ...query,
    handle: INDEX_AS_HANDLE ? 'index' : query.handle
  })

  try {
    // Get pages to update search index
    let pages: Hit[] | Promise<Hit>[] = await PAGES.list()

    // Keep objectID consistent with page ID
    pages = pages.map(obj => ({ ...obj, objectID: obj.id }))

    // Parse MDX body content
    pages = pages.map(async hit => {
      const { code: body_html } = await axios({
        data: hit.body_html,
        url: 'https://mdjsx.flexdevelopment.vercel.app'
      })

      return { ...hit, body_html }
    })

    // Complete MDX promise
    pages = await Promise.all(pages)

    // Get metafields for each page
    pages = pages.map(async hit => {
      return { ...hit, metafield: await pageMetafields(hit.id) } as Hit
    })

    // Complete metafields promise
    pages = await Promise.all(pages)

    // Get SEO data for each page
    pages = pages.map(async hit => ({ ...hit, seo: await pageSEO(hit) }))

    // Complete SEO data promise
    pages = await Promise.all(pages)

    // Initialize search index
    const index = ALGOLIA.initIndex(INDEX_SETTINGS.pages.name)

    // Set index settings
    index.setSettings(omit(INDEX_SETTINGS.pages, ['name']))

    // Update index data
    await index.saveObjects(pages)

    // Perform search
    const { hits } = await index.search<Hit>(query?.text ?? '', options)

    // Remove `objectID` field
    const payload = hits.map(data => omit(data, ['objectID']))

    return res.json(INDEX_AS_HANDLE ? payload[0] : payload)
  } catch (err) {
    const index404 = isSearchIndex404Error(err)
    const error = createError(err, { options, query }, err.status || err.code)

    debug('api/pages')(error)
    return index404 ? res.json([]) : res.status(error.code).json(error)
  }
}
