import kapi from '@core/config/axios-kapi'
import ga from '@core/config/google-analytics'
import log from '@core/config/logger'
import vercel from '@core/config/vercel-env'
import type { APIPayload, IProductListing } from '@core/types'
import createError from '@core/utils/createError'
import type { PageViewParam } from 'ga-measurement-protocol'
import sortBy from 'lodash/sortBy'
import uniq from 'lodash/uniq'
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'
import URI from 'urijs'

/**
 * @file Sitemap Generator
 * @module pages/api/sitemap
 * @see https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs
 */

export default async (req: Req, res: Res): Promise<void> => {
  const { headers, method, url = '' } = req

  // Check if creating sitemap from localhost
  const local = (headers.host as string).includes('localhost')

  // Build `pageview` params object
  const pageview_param: PageViewParam = {
    ...vercel,
    dl: url,
    documentHost: `http${local ? '' : 's'}://${headers.host}`,
    documentPath: URI.parse(url).path as string,
    ds: 'storefront-api',
    ua: headers['user-agent'] as string
  }

  // Send `pageview` hit to Google Analytics
  await ga.pageview(pageview_param)

  // Initialize page slugs array
  const slugs = ['', '404', 'cart', 'search']

  try {
    // Get online store pages
    const pages = await kapi<APIPayload.Page[]>({ url: '/pages' })

    // Add page slugs to slugs array
    pages.forEach(({ handle }) => slugs.push(handle as string))

    // Get store policies
    const policies = await kapi<APIPayload.Policy[]>({ url: '/policies' })

    // Add store policy slugs to slugs array
    policies.forEach(({ handle }) => slugs.push(handle as string))

    // Get product collections and products
    const collections = await kapi<APIPayload.Collection[]>({
      params: { fields: 'handle,products' },
      url: '/collections'
    })

    // Add collection and product slugs to slugs array
    collections.forEach(({ handle, products }) => {
      // Add collection slug
      slugs.push(`collections/${handle}`)

      // `products` field was requested, so assume `products` is an array
      const $products = products as IProductListing[]

      // Add product slugs
      $products.forEach(({ handle: phandle }) => {
        slugs.push(`products/${handle}`)
        slugs.push(`collections/${handle}/products/${phandle}`)
      })
    })

    // Create sitemap stream
    const stream = new SitemapStream({ hostname: pageview_param.documentHost })

    // Create chunks from slugs array
    sortBy(uniq(slugs)).forEach(slug => {
      if (slug === 'api-menus') return
      if (slug === 'index') slug = ''

      stream.write({ changefreq: 'daily', priority: 0.9, url: `/${slug}` })
    })

    // End sitemap stream
    stream.end()

    // Get XML sitemap string
    const xml = (await streamToPromise(stream)).toString()

    // Update response header
    res.writeHead(200, { 'Content-Type': 'application/xml' })

    // Return sitemap output
    return res.end(xml)
  } catch (err) {
    // Format error as `ErrorJSON` object
    const error = createError(err, {
      errors: err?.className ? undefined : err,
      headers,
      method,
      url
    })

    // Send error `event` hit to Google Analytics
    await ga.event({
      ...vercel,
      error: JSON.stringify(error),
      eventAction: error.name,
      eventCategory: pageview_param.documentPath,
      eventLabel: error.message,
      eventValue: error.code,
      ua: pageview_param.ua,
      url: pageview_param.dl
    })

    // Log error and return error response
    log('pages/api/sitemap').error({ error })
    return res.status(error.code).json(error)
  }
}
