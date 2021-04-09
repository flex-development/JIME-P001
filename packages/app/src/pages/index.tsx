import type { IPagePropsIndex as PageProps, PageComponent } from '@app/types'
import kapi from '@core/config/axios-kapi'
import type { APIPayload } from '@core/types'
import {
  IndexTemplate,
  IndexTemplateProps as TemplateProps
} from '@design/lib/templates/IndexTemplate'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { ReactElement } from 'react'

/**
 * @file Page - Home
 * @module pages/index
 */

/**
 * Renders the homepage.
 *
 * @param {PageProps} props - Page component props
 * @param {TemplateProps} props.template - Template component properties
 * @return {ReactElement<TemplateProps>} Homepage
 */
const Home: PageComponent<PageProps> = (
  props: PageProps
): ReactElement<TemplateProps> => {
  return <IndexTemplate {...props.template} />
}

/**
 * Fetches the data required to render the homepage.
 *
 * @todo Fetch product reviews
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 *
 * @async
 * @return {Promise<GetServerSidePropsResult<PageProps>>} Page props
 * @throws {ErrorJSON}
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async (): Promise<
  GetServerSidePropsResult<PageProps>
> => {
  // Initialize page data object
  let data = {} as APIPayload.Page

  try {
    data = await kapi<APIPayload.Page>({
      params: { fields: 'metafield,seo' },
      url: `/pages/index`
    })
  } catch (error) {
    // Instead of redirecting to /404 page, force Sentry to catch this error
    if (error.code === 404) error.code = 500
    throw error
  }

  // Get product listing data for product grid
  const products = await kapi<APIPayload.Product[]>({
    params: { fields: 'handle,images,seo,title,variants' },
    url: 'products'
  })

  // Get `IndexTemplate` props
  const template: PageProps['template'] = {
    page: data,
    products: products as PageProps['template']['products'],
    reviews: []
  }

  return { props: { seo: data.seo as NonNullable<typeof data.seo>, template } }
}

export default Home
