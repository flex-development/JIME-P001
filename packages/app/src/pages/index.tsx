import kapi from '@app/config/axios-kapi'
import { IndexTemplate } from '@components/templates/IndexTemplate'
import ofa from '@flex-development/kustomzcore/utils/objectFromArray'
import type { GetPageResJSON, GetProductResJSON } from '@kapi/types'
import { SEO } from '@subdomains/app/components/SEO'
import type {
  IPagePropsIndex as PageProps,
  PageComponent
} from '@subdomains/app/types'
import type { GetServerSideProps } from 'next'

/**
 * @file Page - Home
 * @module pages/index
 */

/**
 * Renders the homepage.
 *
 * @param props - Page component props
 * @param props.seo - `SEO` component properties
 * @param props.template - `IndexTemplate` component properties
 */
const Home: PageComponent<PageProps> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <IndexTemplate {...template} />
  </>
)

/**
 * Fetches the data required to render the homepage.
 *
 * @todo Fetch product reviews
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 *
 * @async
 * @param context - Server side page context
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
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
  } = ofa(data.metafield ?? [], 'key')

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
