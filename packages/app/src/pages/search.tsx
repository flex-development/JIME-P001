import { SEO } from '@app/components/SEO'
import kapi from '@app/config/axios-kapi'
import type {
  IPagePropsSearch as PageProps,
  PageComponent,
  SearchPageUrlQuery
} from '@app/types'
import globalSEO from '@app/utils/globalSEO'
import type { GetProductResJSON } from '@kapi/types'
import { EMPTY_SPACE } from '@kustomzcore/constants'
import { SearchTemplate } from '@kustomzdesign/lib/templates/SearchTemplate'
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
