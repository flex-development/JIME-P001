import { PC, ServerSidePageProps } from '@app/subdomains/app'
import { ProductService } from '@app/subdomains/sales'
import {
  SearchTemplate,
  SearchTemplateProps
} from '@flex-development/kustomzdesign'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

/**
 * @file Product Search page
 * @module pages/search
 */

/**
 * Renders the product search page.
 * The value of {@param props.session} will always be `null`.
 *
 * @param props - Page component props
 * @param props.page.results - Search results
 * @param props.session - Current user session or null
 */
const Search: PC = ({ page }) => {
  return <SearchTemplate {...(page as SearchTemplateProps)} />
}

/**
 * Returns the data for the `SearchTemplate`.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @todo Parse {@param context.query} and perform product search
 *
 * @param context - Next.js page component context
 * @param context.query - The query string
 * @returns Array of search results
 */
export const getServerSideProps: ServerSidePageProps = async (
  context: GetServerSidePropsContext
) => {
  const Products = new ProductService()

  const page: SearchTemplateProps = { results: await Products.find() }

  return { props: { page, session: null } }
}

export default Search
