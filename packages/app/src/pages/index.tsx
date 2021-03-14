import type { IPagePropsIndex as PageProps, PageComponent } from '@app/types'
import kapi from '@kustomzcore/config/axios-kapi'
import type { GetPageResJSON, GetProductResJSON } from '@kustomzcore/types'
import objectFromArray from '@kustomzcore/utils/objectFromArray'
import {
  IndexTemplate,
  IndexTemplateProps as TemplateProps
} from '@kustomzdesign/lib/templates/IndexTemplate'
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
@return {Promise<GetServerSidePropsResult<PageProps>>} Page props
 * @throws {FeathersErrorJSON}
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async (): Promise<
  GetServerSidePropsResult<PageProps>
> => {
  // Initialize page data object
  let data: GetPageResJSON = {}

  try {
    data = await kapi<GetPageResJSON>({
      params: { fields: 'metafield,seo' },
      url: `/pages/index`
    })
  } catch (error) {
    // Instead of redirecting to /404 page, force Sentry to catch this error
    if (error.code === 404) error.code = 500
    throw error
  }

  // Parse page metafields
  const {
    about_section_text,
    about_section_title,
    max_products,
    max_reviews,
    products_section_text,
    products_section_title,
    reviews_section_title
  } = objectFromArray(data.metafield ?? [], 'key')

  // Get product listing data for product grid
  const products = await kapi<GetProductResJSON[]>({
    params: { fields: 'handle,images,seo,title,variants' },
    url: 'products'
  })

  // Get `IndexTemplate` props
  const template: PageProps['template'] = {
    about_section_text: (about_section_text?.value as string) ?? '',
    about_section_title: (about_section_title?.value as string) ?? '',
    max_products: JSON.parse(`${max_products?.value ?? 0}`),
    max_reviews: JSON.parse(`${max_reviews?.value ?? 0}`),
    products: products as PageProps['template']['products'],
    products_section_text: (products_section_text?.value as string) ?? '',
    products_section_title: (products_section_title?.value as string) ?? '',
    reviews: [],
    reviews_section_title: (reviews_section_title?.value as string) ?? ''
  }

  return { props: { seo: data.seo as NonNullable<typeof data.seo>, template } }
}

export default Home
