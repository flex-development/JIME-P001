import { CollectionService, ProductService } from '@app/subdomains/sales'
import {
  createError,
  ICollectionListing,
  Logger
} from '@flex-development/kustomzcore'
import { sortBy } from 'lodash'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'

/**
 * @file Sitemap Generator
 * @module pages/api/sitemap
 * @see https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs
 */

// Initialize services
const Collections = new CollectionService()
const Products = new ProductService()

export default async (req: Req, res: Res): Promise<void> => {
  // Get sitemap base URL
  const { host } = req.headers

  // Get sitemap hostname
  const hostname = `http${host?.includes('localhost') ? '' : 's'}://${host}`

  // Initialize page slugs array
  const slugs = ['', '404', 'cart', 'search']

  try {
    // Get product collections and products
    const collections = (await Collections.find()) as ICollectionListing[]

    // Add collections and products to stream
    await Promise.all(
      collections.map(async collection => {
        const { collection_id, handle: ch } = collection

        // Add collection URL to slugs array
        slugs.push(`collections/${ch}`)

        // Get products in collection
        const products = await Products.findByCollection(collection_id)

        // Add product URLs to slugs array
        products.forEach(({ handle: ph }) => {
          slugs.push(`products/${ph}`)
          slugs.push(`collections/${ch}/products/${ph}`)
        })
      })
    )
  } catch (err) {
    Logger.error({ 'api/sitemap': err })
    res.status(err.code).json(err)
  }

  try {
    // Create sitemap stream
    const stream = new SitemapStream({ hostname })

    // Create chunks from page slugs
    sortBy(slugs).forEach(slug => {
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
    const error = createError(err.message, { errors: err })

    Logger.error({ 'api/sitemap': error })
    res.status(error.code).json(error)
  }
}
