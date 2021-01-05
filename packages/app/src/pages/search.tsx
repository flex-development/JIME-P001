import { getCMSPageSEO } from '@app/subdomains/cms'
import {
  SearchTemplate,
  SearchTemplateProps
} from '@flex-development/kustomzdesign'
import { IPagePropsSearch, PC, SearchPageUrlQuery, SEO } from '@subdomains/app'
import { ProductService } from '@subdomains/sales'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

/**
 * @file Page - Product Search
 * @module pages/search
 */

/**
 * Renders the product search page.
 *
 * @param props - Page component props
 * @param props.page.results - Search results
 */
const Search: PC = ({ page }) => {
  const { query } = useRouter()
  const { term = null } = (query || {}) as SearchPageUrlQuery

  const seo = getCMSPageSEO({
    description: `Search products for Morena's Kustomz.`,
    keywords: 'grinders, ash trays, rolling trays, weed, cannabis, marijuana',
    title: term?.length ? `Search results for "${term}"` : 'Search'
  })

  return (
    <>
      <SEO {...seo} />
      <SearchTemplate {...(page as SearchTemplateProps)} />
    </>
  )
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
 * @param context.req - HTTP request object
 * @return Array of search results
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

  return { props: { page } }
}

export default Search
