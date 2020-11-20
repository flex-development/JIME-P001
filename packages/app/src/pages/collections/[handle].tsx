import { IPageProps, PC, ServerSidePageProps } from '@app/subdomains/app'
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
 * @file Product Collection Page
 * @module pages/collections/handle
 */

/**
 * Renders a product collection.
 * The value of {@param props.session} will always be `null`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.page.body_html - Collection description
 * @param props.page.products - Product listings in collection
 * @param props.page.title - Collection title
 * @param props.session - Current user session or null
 */
const Collection: PC = ({ page }: IPageProps) => {
  const data = page as CollectionTemplateProps

  // Get router instance to generate `LinkProps` for each collection product
  const router = useRouter()

  /**
   * Generates product `LinkProps` using the `handle` of the current collection.
   *
   * @param product - Product listing object
   * @returns `LinkProps` for the product listing
   */
  const handleProductLink = (product: IProductListing): LinkProps => {
    const href = `products/${product.handle}`
    const as = `${router.query.handle}/${href}`

    return { onClick: () => router.push(href, as) }
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
  const { handle = '' } = context.params || {}
  const collection_handle = isArray(handle) ? handle[0] : handle

  const Collections = new CollectionService()
  const Products = new ProductService()

  try {
    const collection = await Collections.getByHandle(collection_handle)
    const products = await Products.findByCollection(collection.collection_id)

    const page: CollectionTemplateProps = {
      collection,
      products: products as Array<IProductListing>
    }

    return { props: { page, session: null } }
  } catch (error) {
    return { props: { page: error, session: null } }
  }
}

export default Collection
