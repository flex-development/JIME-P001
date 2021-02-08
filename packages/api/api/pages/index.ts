import type { IPage as Hit } from '@flex-development/kustomzcore'
import { axios } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import omit from 'lodash/omit'
import { INDEX_SETTINGS, PAGES, TurndownService } from '../../lib/config'
import { initPathLogger } from '../../lib/middleware'
import type { FindCollectionsReq as Req } from '../../lib/types'
import {
  findPagesOptions,
  formatError,
  getSearchIndex,
  includeMetafields,
  includeSEO,
  pageMetafields,
  pageSEO
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Pages
 * @module api/pages
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // True if looking for page with handle "index"
  const INDEX_AS_HANDLE = req.url.includes('/pages/index')

  // Convert page query into search options object
  const options = findPagesOptions({
    ...req.query,
    handle: INDEX_AS_HANDLE ? 'index' : req.query.handle
  })

  try {
    // Get pages to update search index
    let pages: Hit[] | Promise<Hit>[] = await PAGES.list()

    // Keep objectID consistent with page ID
    pages = pages.map(obj => ({ ...obj, objectID: obj.id }))

    // ! Remove API Menus page
    pages = pages.filter(obj => obj.handle !== 'api-menus')

    try {
      // Parse MDX body content
      pages = pages.map(async hit => {
        const html = hit.body_html.replace('\n', '<br/>')

        const { code: body_html } = await axios({
          data: JSON.stringify(TurndownService.turndown(html)),
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          url: 'https://mdjsx.flexdevelopment.vercel.app'
        })

        return { ...hit, body_html }
      })

      // Complete MDX promise
      pages = await Promise.all(pages)
    } catch (error) {
      return res.status(error.code).json(error)
    }

    // Get metafields for each page
    if (includeMetafields(options) || includeSEO(options)) {
      pages = pages.map(async hit => {
        return { ...hit, metafield: await pageMetafields(hit.id) } as Hit
      })

      // Complete metafields promise
      pages = await Promise.all(pages)
    }

    // Get SEO data for each page
    if (includeSEO(options)) {
      pages = pages.map(async hit => ({ ...hit, seo: await pageSEO(hit) }))

      // Complete SEO data promise
      pages = await Promise.all(pages)
    }

    // Get empty search index
    const index = await getSearchIndex(INDEX_SETTINGS.pages.name)

    // Update index data
    await index.saveObjects(pages)

    // Perform search
    const { hits } = await index.search<Hit>(req.query?.text ?? '', options)

    // Remove `objectID` field
    const payload = hits.map(data => omit(data, ['objectID']))

    return res.json(INDEX_AS_HANDLE ? payload[0] : payload)
  } catch (err) {
    const error = formatError(err, { options, query: req.query })
    const { search_index_404 } = error.data

    if (!search_index_404) req.logger.error({ error })
    return search_index_404 ? res.json([]) : res.status(error.code).json(error)
  }
}
