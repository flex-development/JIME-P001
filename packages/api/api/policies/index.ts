import type { IPolicy } from '@flex-development/kustomzcore'
import { axios } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import omit from 'lodash/omit'
import type { IPolicy as Hit } from 'shopify-api-node'
import { INDEX_SETTINGS, POLICIES, TurndownService } from '../../lib/config'
import { initPathLogger } from '../../lib/middleware'
import type { FindPoliciesReq as Req } from '../../lib/types'
import {
  formatError,
  getSearchIndex,
  includeParsedMDX,
  includeSEO,
  policySEO,
  shopifySearchOptions
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Policies
 * @module api/policies
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Convert policy query into search options object
  const options = shopifySearchOptions(req.query)

  try {
    // Get policies to update search index
    let policies: Hit[] | Promise<Hit>[] = await POLICIES.list()

    // Keep objectID consistent with policy handle
    policies = policies.map(obj => {
      return { ...obj, objectID: (obj as IPolicy).handle }
    })

    // Parse MDX body content
    if (includeParsedMDX(options)) {
      policies = policies.map(async hit => {
        const html = hit.body.replace('\n', '<br/>')

        const { code: body } = await axios({
          data: JSON.stringify(TurndownService.turndown(html)),
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          url: 'https://mdjsx.flexdevelopment.vercel.app'
        })

        return { ...hit, body }
      })

      // Complete MDX promise
      policies = await Promise.all(policies)
    }

    // Get SEO data for each policy
    if (includeSEO(options)) {
      policies = policies.map(async hit => ({
        ...hit,
        seo: await policySEO(hit as IPolicy)
      }))

      // Complete SEO data promise
      policies = await Promise.all(policies)
    }

    // Get empty search index
    const index = await getSearchIndex(INDEX_SETTINGS.policies.name)

    // Update index data
    await index.saveObjects(policies)

    // Perform search
    const { hits } = await index.search<Hit>(req.query?.text ?? '', options)

    // Return results and remove `objectID` field
    return res.json(hits.map(data => omit(data, ['objectID'])))
  } catch (err) {
    const error = formatError(err, { options, query: req.query })
    const { search_index_404 } = error.data

    if (!search_index_404) req.logger.error({ error })
    return search_index_404 ? res.json([]) : res.status(error.code).json(error)
  }
}
