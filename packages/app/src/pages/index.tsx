import { database } from '@app/config/firebase'
import { IPagePropsIndex, PC, SEO, ServerSide404 } from '@app/subdomains/app'
import { getCMSPageSEO, ICMSPageIndex, PageService } from '@app/subdomains/cms'
import { ProductService, ReviewService } from '@app/subdomains/sales'
import { SortOrder } from '@flex-development/json'
import { IReview } from '@flex-development/kustomzcore'
import { IndexTemplate } from '@flex-development/kustomzdesign'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Index Page
 * @module pages/index
 */

/**
 * Renders the homepage.
 * The value of {@param props.page.component} will always be `IndexTemplate`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.page.component - Display name of template component
 * @param props.page.content - `IndexTemplate` component props
 * @param props.page.description - SEO page description
 * @param props.page.draft - True if page is in draft mode
 * @param props.page.keywords - Comma-delimitted list of SEO keywords
 * @param props.page.path - URL path page can be accessed from
 * @param props.page.title - Title of page
 * @param props.preview - True if CMS is enabled
 * @param props.session - CMS user session or null
 */
const Index: PC<IPagePropsIndex> = ({ page }) => {
  return (
    <>
      <SEO {...getCMSPageSEO(page)} />
      <IndexTemplate {...page.content} />
    </>
  )
}

/**
 * Retrieves the data for the `IndexTemplate` and the current CMS user session.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.req - HTTP request object
 * @returns Template data and current user session
 */
export const getServerSideProps: GetServerSideProps<IPagePropsIndex> = async (
  context: GetServerSidePropsContext
) => {
  // Initialize services
  const Pages = new PageService(database)
  const ProductReviews = new ReviewService(database)
  const Products = new ProductService()

  // Get current user session
  const session = (await getSession(context)) as IPagePropsIndex['session']

  // Get page data. Throws if in draft mode and not signed-in with GitHub
  let page = await Pages.getPage(context.req.url as string, session)

  // If page isn't found, show 404 layout
  if ((page as ServerSide404).notFound) return page as ServerSide404

  // ! Guarenteed to be page data. Error will be thrown otherwise
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

  // Return page component props
  return { props: { page: page as ICMSPageIndex, session } }
}

export default Index
