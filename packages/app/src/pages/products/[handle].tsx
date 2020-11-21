import { database } from '@app/config/firebase'
import {
  IPageProps,
  Logger,
  PC,
  serialize,
  ServerSidePageProps
} from '@app/subdomains/app'
import { ProductService, ReviewService } from '@app/subdomains/sales'
import {
  ProductTemplate,
  ProductTemplateProps
} from '@flex-development/kustomzdesign'
import { findIndex, isArray } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

/**
 * @file Page - Product
 * @module pages/products/handle
 */

/**
 * Renders a product page.
 * The value of {@param props.session} will always be `null`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.collection - `LinkProps` for product collection
 * @param props.collection.href - Link to collection
 * @param props.collection.title - Title of collection
 * @param props.product - Product listing data
 * @param props.session - Current user session or null
 */
const Product: PC = ({ page }: IPageProps) => {
  return <ProductTemplate {...(page as ProductTemplateProps)} />
}

/**
 * Retrieves the data for the `ProductTemplate`.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.params - Route parameters if dynamic route
 * @returns Product listing object and an array of products in the collection
 */
export const getServerSideProps: ServerSidePageProps = async (
  context: GetServerSidePropsContext
) => {
  let { handle, sku } = context.query || {}

  // Get single product handle and variant sku
  handle = (isArray(handle) ? handle[0] : handle) as string
  sku = (isArray(sku) ? sku[0] : sku) as string

  // Initialize services
  const Products = new ProductService()
  const Reviews = new ReviewService(database)

  try {
    // Get data for template
    const product = await Products.getByHandle(handle)
    const reviews = await Reviews.findByProductId(product.product_id)

    // Get index of active carousel position
    const active = findIndex(
      product.variants,
      product.variants.find(variant => variant.sku === sku)
    )

    // Build template data object
    const page: ProductTemplateProps = {
      active,
      collection: { href: 'products', title: 'Products' },
      product,
      reviews
    }

    // Return page component props and user session
    return {
      props: { page: serialize<ProductTemplateProps>(page), session: null }
    }
  } catch (error) {
    Logger.error({ 'Product.getServerSideProps': error })
    return { props: { page: error, session: null } }
  }
}

export default Product
