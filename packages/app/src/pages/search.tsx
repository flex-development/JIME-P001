import { getSEOData, SearchPageUrlQuery } from '@app/subdomains/app/utils'
import { getGlobalMetafields } from '@app/subdomains/metafields/utils'
import {
  SearchTemplate,
  SearchTemplateProps
} from '@flex-development/kustomzdesign'
import { SEO, SEOProps } from '@subdomains/app/components'
import { IPagePropsSearch as PageProps, PC } from '@subdomains/app/interfaces'
import { ProductService } from '@subdomains/sales/services'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * @file Page - Product Search
 * @module pages/search
 */

/**
 * Renders the product search page.
 *
 * @param props - Page component props
 * @param props.globals - Shopify `globals` namespace metafields obj
 * @param props.seo - `SEO` component properties
 * @param props.template - `SearchTemplate` component properties
 */
const Search: PC<PageProps> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <SearchTemplate {...template} />
  </>
)

/**
 * Fetches the data required to display a product listing using the
 * `SearchTemplate` component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.query - The query string
 * @param context.req - HTTP request object
 * @return Array of search results
 */
export const getServerSideProps: GetServerSideProps<
  PageProps,
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
  const template: SearchTemplateProps = { results: await Products.find(query) }

  // Get global metafields
  const globals = await getGlobalMetafields()

  // Get SEO data
  const seo: SEOProps = await getSEOData(globals, {
    seo: { title: term?.length ? `Search results for "${term}"` : 'Search' }
  })

  return { props: { globals, seo, template } }
}

export default Search
