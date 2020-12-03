import { database } from '@app/config/firebase'
import {
  IPageProps,
  IPagePropsProduct,
  PC,
  ProductPageParams,
  ProductPageUrlQuery,
  ServerSide404
} from '@app/subdomains/app'
import { ProductService, ReviewService, useCart } from '@app/subdomains/sales'
import { serialize } from '@flex-development/json'
import { IReview } from '@flex-development/kustomzcore'
import {
  ProductTemplate,
  ProductTemplateProps
} from '@flex-development/kustomzdesign'
import { findIndex } from 'lodash'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Page - Product
 * @module pages/products/handle
 */

/**
 * Renders a product page.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.collection - `LinkProps` for product collection
 * @param props.collection.href - Link to collection
 * @param props.collection.title - Title of collection
 * @param props.product - Product listing data
 * @param props.session - CMS admin user session or null
 */
const Product: PC<IPagePropsProduct> = ({ page }) => {
  // Get cart functions
  const cart = useCart()

  /**
   * Adds a line item to the user's cart.
   *
   * @param item - Line item to add
   * @param event - <button> element click event
   */
  page.handleAddToCart = (item, event) => {
    event.preventDefault()
    return cart.upsertItem(item)
  }

  return <ProductTemplate {...page} />
}

/**
 * Retrieves the data for the `ProductTemplate` and the current user session.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.params - Route parameters if dynamic route
 * @returns Product listing object and an array of products in the collection
 */
export const getServerSideProps: GetServerSideProps<
  IPagePropsProduct,
  ProductPageUrlQuery
> = async (context: GetServerSidePropsContext<ProductPageParams>) => {
  // Initialize services
  const Products = new ProductService()
  const Reviews = new ReviewService(database)

  // Get product handle and variant sku
  const { handle, sku } = context.query as ProductPageUrlQuery

  // Get product data
  let product = await Products.getByHandle(handle)

  // If product isn't found, show 404 layout
  if ((product as ServerSide404).notFound) return product as ServerSide404

  // ! Guarenteed to be product data. Error will be thrown otherwise
  product = product as IProductListing

  // Get product reviews
  const reviews = await Reviews.findByProductId(product.product_id)

  // Get index of active carousel item
  const active = findIndex(
    product.variants,
    product.variants.find(variant => variant.sku === sku)
  )

  // Build template data object
  const page = serialize<ProductTemplateProps>({
    active,
    collection: { href: 'products', title: 'Products' },
    product,
    reviews: reviews as Array<IReview>
  })

  // Get current user session
  const session = (await getSession(context)) as IPageProps['session']

  // Return page component props and user session
  return { props: { page, session } }
}

export default Product
