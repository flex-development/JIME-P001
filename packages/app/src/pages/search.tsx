import { IPagePropsSearch, PC, SearchPageUrlQuery } from '@app/subdomains/app'
import { ProductService } from '@app/subdomains/sales'
import {
  SearchTemplate,
  SearchTemplateProps
} from '@flex-development/kustomzdesign'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'

/**
 * @file Page - Product Search
 * @module pages/search
 */

/**
 * Renders the product search page.
 * The value of {@param props.session} will always be `null`.
 *
 * @param props - Page component props
 * @param props.page.results - Search results
 * @param props.session - CMS admin user session or null
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
export const getServerSideProps: GetServerSideProps<
  IPagePropsSearch,
  SearchPageUrlQuery
> = async (context: GetServerSidePropsContext) => {
  // Initialize services
  const Products = new ProductService()

  // Get search term from query
  const { term } = context.query as SearchPageUrlQuery

  // Build search rules based on types of product property values
  const search_rules_prim = { $lte: term }
  const search_rules_arr = term ? { $lte: [term] } : search_rules_prim

  // Build search query
  const query = {
    body_html: search_rules_prim,
    product_type: search_rules_prim,
    tags: search_rules_arr,
    title: search_rules_prim,
    variant_skus: search_rules_arr,
    variant_titles: search_rules_arr,
    vendor: search_rules_prim
  }

  // Get template data
  const page: SearchTemplateProps = { results: await Products.find(query) }

  // Get current user session
  const session = (await getSession(context)) as IPagePropsSearch['session']

  return { props: { page, session } }
}

export default Search
