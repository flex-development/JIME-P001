import {
  IPagePropsSearch,
  PC,
  SearchPageUrlQuery,
  SEO
} from '@app/subdomains/app'
import { getCMSPageSEO } from '@app/subdomains/cms'
import { ProductService } from '@app/subdomains/sales'
import {
  SearchTemplate,
  SearchTemplateProps
} from '@flex-development/kustomzdesign'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

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
 * @param props.session - CMS user session or null
 */
const Search: PC = ({ page }) => {
  const router = useRouter()
  const seo = getCMSPageSEO({
    description: `Search products for Morena's Kustomz.`,
    keywords: 'grinders, ash trays, rolling trays, weed, cannabis, marijuana',
    title: router.query ? `Search results for "${router.query}"` : 'Search'
  })

  return (
    <>
      <SEO {...seo} />
      <SearchTemplate {...(page as SearchTemplateProps)} />
    </>
  )
}

/**
 * Returns the data for the `SearchTemplate` and the current CMS user session.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @todo Parse {@param context.query} and perform product search
 *
 * @param context - Next.js page component context
 * @param context.query - The query string
 * @param context.req - HTTP request object
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
