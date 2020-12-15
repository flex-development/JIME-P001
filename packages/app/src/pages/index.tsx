import { database } from '@app/subdomains/firebase/config/web'
import { SortOrder } from '@flex-development/json'
import { IReview } from '@flex-development/kustomzcore'
import {
  IndexTemplate,
  IndexTemplateProps
} from '@flex-development/kustomzdesign'
import {
  CMSPageParams,
  IPagePropsCMS,
  NotFound,
  PC,
  SEO
} from '@subdomains/app'
import {
  getCMSPageSEO,
  ICMSPageIndex,
  ICMSPageSlug,
  PageService,
  ProviderSessionGitHub
} from '@subdomains/cms'
import { ProductService, ReviewService } from '@subdomains/sales'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Page - Home
 * @module pages/slug
 * @see https://nextjs.org/docs/basic-features/data-fetching
 */

// Initialize services
const Pages = new PageService(database)
const ProductReviews = new ReviewService(database)
const Products = new ProductService()

/**
 * Renders the homepage.
 *
 * The value of {@param props.page.component} will be always be `IndexTemplate`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.page.component - Display name of template component
 * @param props.page.content - `IndexTemplate` component props
 * @param props.page.draft - True if page is in draft mode
 * @param props.page.id - Unique page entity ID
 * @param props.page.keywords - Comma-delimitted list of SEO keywords
 * @param props.page.path - URL path page can be accessed from
 * @param props.page.title - Title of page
 * @param props.page.uuid - Unique page entity UUID
 * @param props.preview - True if CMS is enabled
 * @param props.session - CMS user session or null
 */
const Slug: PC<IPagePropsCMS> = ({ page }) => (
  <>
    <SEO {...getCMSPageSEO(page)} />
    <IndexTemplate {...(page.content as IndexTemplateProps)} />
  </>
)

/**
 * Retrieves the data for the `IndexTemplate` or `PageTemplate`.
 *
 * @param context - Next.js page component context
 * @param context.params - Dynamic route parameters
 * @param context.query - The query string
 * @param context.req - HTTP request object
 * @returns Template data and current user session
 */
export const getServerSideProps: GetServerSideProps<
  IPagePropsCMS,
  CMSPageParams
> = async (context: GetServerSidePropsContext<CMSPageParams>) => {
  const { slug } = (context.params || {}) as CMSPageParams

  // Get incoming page path
  const path = !slug || slug === 'index' ? '/' : `/${slug}`

  // Get current user session
  const session = (await getSession()) as ProviderSessionGitHub

  // Get page data. Throws if in draft mode and not signed-in with GitHub
  let page = await Pages.getPage(path, session)

  // If page isn't found, show 404 layout
  if ((page as NotFound).notFound) return page as NotFound

  // ! Guarenteed to be page data. Error will be thrown otherwise
  page = page as IPagePropsCMS['page']

  // Get data for homepage
  if (page.component === 'IndexTemplate') {
    // Cast page data
    page = page as ICMSPageIndex

    // Get products and product reviews
    let products = await Products.find()
    products = Products.$sort(products, { handle: SortOrder.ASCENDING })

    // Get product reviews
    let reviews = await ProductReviews.find()
    reviews = ProductReviews.$sort(reviews, { id: SortOrder.ASCENDING })

    // Get template props
    page.content = {
      ...page.content,
      products: (products as Array<IProductListing>).map(product => ({
        product,
        product_link: { href: `products/${product.handle}` }
      })),
      reviews: reviews as Array<IReview>
    }
  }

  // Return page component props
  return { props: { page: page as ICMSPageSlug } }
}

export default Slug
