import type { IPolicy } from '@flex-development/kustomzcore'
import { axios, createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import omit from 'lodash/omit'
import type { IPolicy as Hit } from 'shopify-api-node'
import {
  ALGOLIA,
  INDEX_SETTINGS,
  POLICIES,
  TurndownService
} from '../../lib/config'
import type { FindPoliciesReq as Req } from '../../lib/types'
import {
  isSearchIndex404Error,
  policySEO,
  shopifySearchOptions
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Policies
 * @module api/policies
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  // Convert policy query into search options object
  const options = shopifySearchOptions(query)

  try {
    // Get policies to update search index
    let policies: Hit[] | Promise<Hit>[] = await POLICIES.list()

    // Keep objectID consistent with policy handle
    policies = policies.map(obj => {
      return { ...obj, objectID: (obj as IPolicy).handle }
    })

    try {
      // Parse MDX body content
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
    } catch (error) {
      return res.status(error.code).json(error)
    }

    // Get SEO data for each policy
    policies = policies.map(async hit => ({
      ...hit,
      seo: await policySEO(hit as IPolicy)
    }))

    // Complete SEO data promise
    policies = await Promise.all(policies)

    // Initialize search index
    const index = ALGOLIA.initIndex(INDEX_SETTINGS.policies.name)

    // Set index settings
    index.setSettings(omit(INDEX_SETTINGS.policies, ['name']))

    // Update index data
    await index.saveObjects(policies)

    // Perform search
    const { hits } = await index.search<Hit>(query?.text ?? '', options)

    // Return results and remove `objectID` field
    return res.json(hits.map(data => omit(data, ['objectID'])))
  } catch (err) {
    const index404 = isSearchIndex404Error(err)
    let error = err

    if (!err.className) error = createError(err, { options, query }, err.status)

    debug('api/policies')(error)
    return index404 ? res.json([]) : res.status(error.code).json(error)
  }
}
