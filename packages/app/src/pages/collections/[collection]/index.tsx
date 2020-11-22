import {
  IPageProps,
  PC,
  serialize,
  ServerSidePageProps
} from '@app/subdomains/app'
import { CollectionService, ProductService } from '@app/subdomains/sales'
import {
  CollectionTemplate,
  CollectionTemplateProps,
  LinkProps
} from '@flex-development/kustomzdesign'
import { isArray } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Page - Product Collection
 * @module pages/collections/collection
 */

/**
 * Renders a product collection.
 * The value of {@param props.session} will always be `null`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.page.collection - Shopify collection listing object
 * @param props.page.products - Product listings in collection
 * @param props.session - Current user session or null
 */
const Collection: PC = ({ page }: IPageProps) => {
  const data = page as CollectionTemplateProps

  // Get router instance to generate `LinkProps` for each collection product
  const { asPath, query } = useRouter()

  /**
   * Generates product `LinkProps` using the `handle` of the current collection.
   *
   * @param product - Product listing object
   * @returns `LinkProps` for the product listing
   */
  const handleProductLink = (product: IProductListing): LinkProps => {
    const base = !asPath.includes('collections') ? '/' : `${query.collection}/`
    return { href: `${base}products/${product.handle}` }
  }

  return <CollectionTemplate {...data} handleProductLink={handleProductLink} />
}

/**
 * Retrieves the data for the `CollectionTemplate`.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.params - Route parameters if dynamic route
 * @returns Collection listing object and an array of products in the collection
 */
export const getServerSideProps: ServerSidePageProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, params = {} } = context

  let { collection: handle = '' } = params

  handle = isArray(handle) ? handle[0] : handle

  const Collections = new CollectionService()
  const Products = new ProductService()

  const collection = await Collections.getByHandle(handle)
  const products = await Products.findByCollection(collection.collection_id)

  const page = serialize<CollectionTemplateProps>({
    collection: {
      ...collection,
      title: !req.url?.includes('collections') ? 'Products' : collection.title
    },
    products: products as Array<IProductListing>
  })

  return { props: { page, session: null } }
}

export default Collection
