import { database } from '@app/config/firebase'
import {
  IndexTemplatePropsServer,
  IPageProps,
  PC,
  ServerSidePageProps,
  SortOrder
} from '@app/subdomains/app'
import { ICMSPage } from '@app/subdomains/cms'
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
 * Renders the homepage.
 *
 * @param props - Page component props
 */
const Index: PC = ({ page }) => {
  const { content } = page as ICMSPage
  return <IndexTemplate {...(content as IndexTemplateProps)} />
}

/**
 * Retrieves the current user session.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param ctx - Next.js page component context
 * @param ctx.params - Route parameters if page uses a dynamic route
 * @param ctx.req - HTTP request object
 * @param ctx.res - HTTP response object
 * @param ctx.resolvedUrl - Normalized version of the request URL
 */
export const getServerSideProps: ServerSidePageProps = async (
  context: GetServerSidePropsContext
) => {
  const ProductReviews = new ReviewService(database)
  const Products = new ProductService()

  const product_query = { $sort: { handle: SortOrder.ASCENDING } }
  const reviews_query = { $sort: { id: SortOrder.ASCENDING } }

  const page: IndexTemplatePropsServer = {
    products: (await Products.find(product_query)) as Array<IProductListing>,
    reviews: (await ProductReviews.find(reviews_query)) as Array<IReview>
  }

  const session = (await getSession(context)) as IPageProps['session']

  return { props: { page, session } }
}

export default Index
