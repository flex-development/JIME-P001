import kapi from '@app/config/axios-kapi'
import { SearchTemplate } from '@components/templates/SearchTemplate'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/constants'
import type { GetProductResJSON } from '@kapi/types'
import { SEO } from '@subdomains/app/components/SEO'
import type {
  IPagePropsSearch as PageProps,
  PageComponent,
  SearchPageUrlQuery
} from '@subdomains/app/types'
import globalSEO from '@subdomains/app/utils/globalSEO'
import isArray from 'lodash/isArray'
import join from 'lodash/join'
import merge from 'lodash/merge'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * @file Page - Product Search
 * @module pages/search
 */

/**
 * Renders the product search results page.
 *
 * @param props - Page component props
 * @param props.seo - `SEO` component properties
 * @param props.template - `SearchTemplate` component properties
 */
const Search: PageComponent<PageProps> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <SearchTemplate {...template} />
  </>
)

/**
 * Fetches the data required to display a product search results page using the
 * `SearchTemplate` component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Server side page context
 * @param context.query - The query string
 * @param context.req - `HTTP` request object
 */
export const getServerSideProps: GetServerSideProps<
  PageProps,
  SearchPageUrlQuery
> = async (context: GetServerSidePropsContext) => {
  // Get search term from query
  const { term } = context.query as SearchPageUrlQuery

  // API request config
  const config: Parameters<typeof kapi>[0] = {
    params: { text: isArray(term) ? join(term, EMPTY_SPACE) : term },
    url: 'products'
  }

  return {
    props: {
      seo: merge(await globalSEO(), {
        title: term?.length ? `Search results for "${term}"` : 'Search'
      }),
      template: { results: await kapi<GetProductResJSON[]>(config) }
    }
  }
}

export default Search
