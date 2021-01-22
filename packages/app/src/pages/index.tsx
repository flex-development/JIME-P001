import { IndexTemplate } from '@components/templates/IndexTemplate'
import ofa from '@flex-development/kustomzcore/utils/objectFromArray'
import type { GetPageResJSON, SEOData } from '@kapi/types'
import { SEO } from '@subdomains/app/components/SEO'
import type {
  IPagePropsIndex as PageProps,
  NotFound,
  PageComponent
} from '@subdomains/app/types'
import getLayoutData from '@subdomains/app/utils/getLayoutData'
import getPage from '@subdomains/cms/utils/getPage'
import findProducts from '@subdomains/sales/utils/findProducts'
import type { GetServerSideProps } from 'next'

/**
 * @file Page - Home
 * @module pages/index
 */

/**
 * Renders the homepage.
 *
 * @param props - Page component props
 * @param props.layout - Data to populate `AppLayout` component
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
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  // Get page data
  const data = await getPage({ fields: 'metafield,seo', handle: 'index' })

  // Redirect to /404 if page data isn't found
  if ((data as NotFound).notFound) return data as NotFound

  // Guarenteed to be page data. Error will be thrown otherwise
  const { metafield, seo } = data as NonNullable<GetPageResJSON>

  // Parse page metafields
  const {
    about_section_text,
    about_section_title,
    max_products,
    max_reviews,
    products_section_text,
    products_section_title,
    reviews_section_title
  } = ofa(metafield ?? [], 'key')

  // Get product listing data for product grid
  const products = await findProducts({
    fields: 'handle,images,seo,title,variants'
  })

  // Get `IndexTemplate` props
  const template: PageProps['template'] = {
    about_section_text: about_section_text.value as string,
    about_section_title: about_section_title.value as string,
    max_products: JSON.parse(max_products.value as string),
    max_reviews: JSON.parse(max_reviews.value as string),
    products: products as PageProps['template']['products'],
    products_section_text: products_section_text.value as string,
    products_section_title: products_section_title.value as string,
    reviews: [],
    reviews_section_title: reviews_section_title.value as string
  }

  // Get layout data
  const layout = await getLayoutData()

  return { props: { layout, seo: seo as NonNullable<SEOData>, template } }
}

export default Home
