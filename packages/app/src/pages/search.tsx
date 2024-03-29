import type {
  IPagePropsSearch as PageProps,
  NextIncomingMessage,
  PageComponent,
  SearchPageUrlQuery as Query
} from '@app/types'
import kapi from '@core/config/axios-kapi'
import { EMPTY_SPACE } from '@core/config/constants'
import type { ProductListingData } from '@core/types'
import {
  SearchTemplate,
  SearchTemplateProps as TemplateProps
} from '@design/lib/templates/SearchTemplate'
import isArray from 'lodash/isArray'
import join from 'lodash/join'
import type {
  GetServerSideProps,
  GetServerSidePropsContext as Context,
  GetServerSidePropsResult
} from 'next'
import type { ReactElement } from 'react'

/**
 * @file Page - Product Search Results
 * @module pages/search
 */

/**
 * Renders the product search results page.
 *
 * @param {PageProps} props - Page component props
 * @param {TemplateProps} props.template - Template component properties
 * @return {ReactElement<TemplateProps>} Product search results page
 */
const Search: PageComponent<PageProps> = (
  props: PageProps
): ReactElement<TemplateProps> => {
  return <SearchTemplate {...props.template} />
}

/**
 * Fetches the data required to display a product search results page using the
 * `SearchTemplate` component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param {Context<Query>} context - Server side page context
 * @param {Query} context.query - Query parameters
 * @param {string} [context.query.term] - Search term
 * @param {NextIncomingMessage} context.req - `HTTP` request object
@return {Promise<GetServerSidePropsResult<PageProps>>} Page props
 */
export const getServerSideProps: GetServerSideProps<PageProps, Query> = async (
  context: Context
): Promise<GetServerSidePropsResult<PageProps>> => {
  // Get search term from query
  const { term } = context.query as Query

  // API request config
  const config: Parameters<typeof kapi>[0] = {
    params: {
      fields: 'body_html,handle,images,product_id,title,variants',
      text: isArray(term) ? join(term, EMPTY_SPACE) : term
    },
    url: 'products'
  }

  return {
    props: {
      seo: { title: term?.length ? `Search results for "${term}"` : 'Search' },
      template: { results: await kapi<ProductListingData[]>(config) }
    }
  }
}

export default Search
