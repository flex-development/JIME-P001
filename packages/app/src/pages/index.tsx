import { IndexTemplate } from '@components/templates/IndexTemplate'
import { SEO } from '@subdomains/app/components/SEO'
import { IPagePropsIndex as PageProps, PC } from '@subdomains/app/interfaces'
import getSEO from '@subdomains/app/utils/getSEO'
import objectFromArray from '@subdomains/app/utils/objectFromArray'
import { NotFound } from '@subdomains/app/utils/types'
import getPage from '@subdomains/cms/utils/getPageByHandle'
import globalMetafields from '@subdomains/metafields/utils/globalMetafields'
import findProducts from '@subdomains/sales/utils/findProducts'
import { GetServerSideProps } from 'next'

/**
 * @file Page - Home
 * @module pages/index
 */

/**
 * Renders the homepage.
 *
 * @param props - Page component props
 * @param props.globals - Shopify `globals` namespace metafields obj
 * @param props.page - Shopify API page resource data
 * @param props.seo - `SEO` component properties
 * @param props.template - `IndexTemplate` component properties
 */
const Home: PC<PageProps> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <IndexTemplate {...template} />
  </>
)

/**
 * Fetches the data required to render the homepage.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 *
 * @async
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  // Get page data
  const data = await getPage('index')

  // Redirect to /404 if page data isn't found
  if ((data as NotFound).notFound) return data as NotFound

  // Guarenteed to be page data. Error will be thrown otherwise
  const page = data as PageProps['page']

  // Parse page metafields
  const {
    about_section_text,
    about_section_title,
    max_products,
    max_reviews,
    products_section_text,
    products_section_title,
    reviews_section_title
  } = objectFromArray(page.metafield, 'key')

  // Get `IndexTemplate` props
  const template: PageProps['template'] = {
    about_section_text: about_section_text.value as string,
    about_section_title: about_section_title.value as string,
    max_products: JSON.parse(max_products.value as string),
    max_reviews: JSON.parse(max_reviews.value as string),
    products: (await findProducts()) as PageProps['template']['products'],
    products_section_text: products_section_text.value as string,
    products_section_title: products_section_title.value as string,
    reviews: [],
    reviews_section_title: reviews_section_title.value as string
  }

  // Get global metafields
  const globals = await globalMetafields()

  // Get SEO object
  const seo = await getSEO(globals, page, 'page')

  return { props: { globals, page, seo, template } }
}

export default Home
