import log from '@app/config/logger'
import { AnyObject } from '@flex-development/json/utils/types'
import createError from '@flex-development/kustomzcore/utils/createError'
import sortBy from 'lodash/sortBy'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'

/**
 * @file Sitemap Generator
 * @module pages/api/sitemap
 * @see https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs
 */

const {
  SHOPIFY_API_KEY: apiKey = '',
  SHOPIFY_API_VERSION: apiVersion = '',
  SHOPIFY_DOMAIN: shopName = '',
  SHOPIFY_PASSWORD: password = ''
} = process.env

export default async (req: Req, res: Res): Promise<void> => {
  // Get sitemap base URL
  const { host } = req.headers

  // Get sitemap hostname
  const hostname = `http${host?.includes('localhost') ? '' : 's'}://${host}`

  // Initialize page slugs array
  const slugs = ['', '404', 'cart', 'search']

  // Get Shopify module
  const { default: Shopify } = await import('shopify-api-node')

  // Initialize Shopify client
  const shopify = new Shopify({
    apiKey,
    apiVersion,
    autoLimit: true,
    password,
    shopName
  })

  try {
    // Get online store pages and policies
    const pages = [
      ...(await shopify.page.list()),
      ...(await shopify.policy.list())
    ]

    // Add page URLs to slugs array
    pages.forEach(({ handle }: AnyObject) => {
      if (['api-menus', 'index'].includes(handle)) return
      slugs.push(handle)
    })

    // Get blogs
    const blogs = await shopify.blog.list()

    // Add blogs and artivles to stream
    await Promise.all(
      blogs.map(async blog => {
        // Add blog URL to slugs array
        slugs.push(`blogs/${blog.handle}`)

        // Get articles
        const articles = await shopify.article.list(blog.id)

        // Add article URLs to slugs array
        articles.forEach(article => {
          slugs.push(`blogs/${blog.handle}/articles/${article.handle}`)
        })
      })
    )

    // Get product collections and products
    const collections = await shopify.collectionListing.list()

    // Add collections and products to stream
    await Promise.all(
      collections.map(async collection => {
        const { collection_id, handle: ch } = collection

        // Add collection URL to slugs array
        slugs.push(`collections/${ch}`)

        // Get products in collection
        const products = await shopify.productListing.list({ collection_id })

        // Add product URLs to slugs array
        products.forEach(({ handle: ph }) => {
          slugs.push(`products/${ph}`)
          slugs.push(`collections/${ch}/products/${ph}`)
        })
      })
    )
  } catch (err) {
    log('pages/api/sitemap').error(err)
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

    log('pages/api/sitemap').error(error)
    res.status(error.code).json(error)
  }
}
