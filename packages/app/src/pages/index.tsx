import { getSEOData, objectFromArray } from '@app/subdomains/app/utils'
import { PageService } from '@app/subdomains/cms/services'
import { getGlobalMetafields } from '@app/subdomains/metafields/utils'
import { ProductService } from '@app/subdomains/sales/services'
import { IPage, IProductListing } from '@flex-development/kustomzcore'
import {
  IndexTemplate,
  IndexTemplateProps
} from '@flex-development/kustomzdesign'
import { SEO, SEOProps } from '@subdomains/app/components'
import { IPagePropsIndex as PageProps, PC } from '@subdomains/app/interfaces'
import { GetStaticProps } from 'next'

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
 * Fetches the data required to pre-render the homepage.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 *
 * @async
 */
export const getStaticProps: GetStaticProps<PageProps> = async () => {
  // Initialize services
  const Pages = new PageService()
  const Products = new ProductService()

  // Initialize page data object
  let page: IPage | null = null

  try {
    // Get page data
    page = (await Pages.get('index')) as IPage
  } catch (error) {
    // Redirect to /404 if page data isn't found
    if (error.code === 404) return { notFound: true }
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
  } = objectFromArray(page.metafield, 'key')

  // Get `IndexTemplate` props
  const template: IndexTemplateProps = {
    about_section_text: about_section_text.value as string,
    about_section_title: about_section_title.value as string,
    max_products: JSON.parse(max_products.value as string),
    max_reviews: JSON.parse(max_reviews.value as string),
    products: (await Products.find()) as IProductListing[],
    products_section_text: products_section_text.value as string,
    products_section_title: products_section_title.value as string,
    reviews: [],
    reviews_section_title: reviews_section_title.value as string
  }

  // Get global metafields
  const globals = await getGlobalMetafields()

  // Get SEO object
  const seo: SEOProps = await getSEOData(globals, page, 'page')

  return { props: { globals, page, seo, template }, revalidate: 1 }
}

export default Home
