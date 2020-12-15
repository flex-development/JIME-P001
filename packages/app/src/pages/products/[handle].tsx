import { database } from '@app/subdomains/firebase/config/web'
import { AnyObject, serialize } from '@flex-development/json'
import { IReview } from '@flex-development/kustomzcore'
import {
  getProductVariantImage,
  ProductTemplate,
  ProductTemplateProps
} from '@flex-development/kustomzdesign'
import {
  IPagePropsProduct,
  NotFound,
  PC,
  ProductPageParams,
  ProductPageUrlQuery,
  SEO,
  SEOProps
} from '@subdomains/app'
import { ProductService, ReviewService } from '@subdomains/sales'
import { findIndex } from 'lodash'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { IProductListing } from 'shopify-api-node'
import stripHtml from 'string-strip-html'

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
 */
const Product: PC<IPagePropsProduct> = ({ page }) => {
  // Get current product variant to build page SEO
  const variant = page.product.variants[page.active || 0]
  const page_title = `${page.product.title} - ${variant.title}`
  const variant_img = getProductVariantImage(
    variant.image_id,
    page.product.images,
    page_title
  )

  // Get SEO metadata
  const { available, body_html, tags, vendor } = page.product as AnyObject

  const seo: SEOProps = {
    description: stripHtml(body_html).result,
    keywords: tags,
    og: {
      image: variant_img.src,
      'image:alt': variant_img.alt || undefined,
      'image:height': variant_img.height,
      'image:secure_url': variant_img.src,
      'image:width': variant_img.width,
      'product:availability': `${available}`,
      'product:brand': vendor,
      'product:condition': 'new',
      'product:price:amount': variant.price,
      'product:price:currency': 'USD'
    },
    title: page_title,
    twitter: { card: 'summary', image: variant_img.src }
  }

  return (
    <>
      <SEO {...seo} />
      <ProductTemplate {...page} />
    </>
  )
}

/**
 * Retrieves the data for the `ProductTemplate`.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.params - Route parameters if dynamic route
 * @param context.query - The query string
 * @param context.req - HTTP request object
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
  if ((product as NotFound).notFound) return product as NotFound

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

  // Return page component props and user session
  return { props: { page } }
}

export default Product
