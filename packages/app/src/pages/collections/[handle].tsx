import { PC, ServerSidePageProps } from '@app/subdomains/app'
import { CollectionService, ProductService } from '@app/subdomains/sales'
import {
  CollectionTemplate,
  CollectionTemplateProps
} from '@flex-development/kustomzdesign'
import { isArray } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

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
const Collection: PC = ({ page }) => {
  return <CollectionTemplate {...(page as CollectionTemplateProps)} />
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

  let page = {}

  try {
    const collection = await Collections.getByHandle(collection_handle)

    page = {
      body_html: collection.body_html,
      collection,
      products: await Products.findByCollection(collection.collection_id),
      title: collection.title
    } as CollectionTemplateProps
  } catch (error) {
    return { props: { page: error, session: null } }
  }

  return { props: { page, session: null } }
}

export default Collection
