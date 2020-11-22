import { database } from '@app/config/firebase'
import {
  IPageProps,
  Logger,
  PC,
  ServerSidePageProps,
  SortOrder
} from '@app/subdomains/app'
import { ICMSPage } from '@app/subdomains/cms'
import { PageService } from '@app/subdomains/cms/services'
import { ProductService, ReviewService } from '@app/subdomains/sales'
import {
  IndexTemplate,
  IndexTemplateProps
} from '@flex-development/kustomzdesign'
import { IReview } from '@flex-development/types'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import React from 'react'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Index Page
 * @module pages/index
 */

/**
 * Renders the homepage.
 * The value of {@param props.page.component} will always be `IndexTemplate`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.page.component - Display name of template component
 * @param props.page.content - Template component props
 * @param props.page.draft - True if page is in draft mode
 * @param props.page.metadata - SEO metadata
 * @param props.page.path - Page path
 * @param props.page.title - Page title
 * @param props.session - Current user session or null
 */
const Index: PC = ({ page }: IPageProps) => {
  const { content } = page as ICMSPage
  return <IndexTemplate {...(content as IndexTemplateProps)} />
}

/**
 * Retrieves the data for the `IndexTemplate`.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.req - HTTP request object
 * @returns Product listings, reviews, and current user session
 */
export const getServerSideProps: ServerSidePageProps = async (
  context: GetServerSidePropsContext
) => {
  // Initialize services
  const Pages = new PageService(database)
  const ProductReviews = new ReviewService(database)
  const Products = new ProductService()

  // Get current user session
  const session = (await getSession(context)) as IPageProps['session']

  try {
    // Get page data. Throws if in draft mode and not signed-in with GitHub
    const entity = await Pages.getPage(context.req.url as string, session)

    // Build service queries
    const p_query = { $sort: { handle: SortOrder.ASCENDING } }
    const r_query = { $sort: { id: SortOrder.ASCENDING } }

    // Get products and product reviews
    const products = (await Products.find(p_query)) as Array<IProductListing>
    const reviews = (await ProductReviews.find(r_query)) as Array<IReview>

    // Get template props
    entity.content = {
      ...(entity.content as IndexTemplateProps),
      products: products.map(product => ({
        product,
        product_link: { href: `products/${product.handle}` }
      })),
      reviews
    }

    // Return page component props
    return { props: { page: entity, session } }
  } catch (error) {
    Logger.error({ 'Index.getServerSideProps': error })

    if (error.code === 404) {
      context.res.setHeader('Location', '/404')
      context.res.statusCode = 302
      context.res.end()
    }

    throw error
  }
}

export default Index
