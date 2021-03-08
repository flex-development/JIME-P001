import kapi from '@app/config/axios-kapi'
import type {
  IPagePropsSearch as PageProps,
  NextIncomingMessage,
  PageComponent,
  SearchPageUrlQuery as Query
} from '@app/types'
import { EMPTY_SPACE } from '@kustomzcore/constants'
import type { GetProductResJSON } from '@kustomzcore/types'
import {
  SearchTemplate,
  SearchTemplateProps
} from '@kustomzdesign/lib/templates/SearchTemplate'
import isArray from 'lodash/isArray'
import join from 'lodash/join'
import type {
  GetServerSideProps,
  GetServerSidePropsContext as Context,
  GetServerSidePropsResult
} from 'next'
import type { ReactElement } from 'react'

/**
 * @file Page - Product Search
 * @module pages/search
 */

/**
 * Renders the product search results page.
 *
 * @param {PageProps} props - Page component props
 * @param {SearchTemplateProps} props.template - Template component properties
 * @return {ReactElement<SearchTemplateProps>} Product search results page
 */
const Search: PageComponent<PageProps> = ({
  template
}): ReactElement<SearchTemplateProps> => <SearchTemplate {...template} />

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
 * @return {Promise<GetServerSidePropsResult<PageProps>>} Promise containing
 * object with page props and settings to server side render page
 */
export const getServerSideProps: GetServerSideProps<PageProps, Query> = async (
  context: Context
): Promise<GetServerSidePropsResult<PageProps>> => {
  // Get search term from query
  const { term } = context.query as Query

  // API request config
  const config: Parameters<typeof kapi>[0] = {
    params: { text: isArray(term) ? join(term, EMPTY_SPACE) : term },
    url: 'products'
  }

  return {
    props: {
      seo: { title: term?.length ? `Search results for "${term}"` : 'Search' },
      template: { results: await kapi<GetProductResJSON[]>(config) }
    }
  }
}

export default Search
