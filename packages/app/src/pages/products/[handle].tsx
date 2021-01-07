import { getSEOData } from '@app/subdomains/app/utils/getSEOData'
import { getGlobalMetafields } from '@app/subdomains/metafields/utils/getGlobalMetafields'
import { serialize } from '@flex-development/json'
import { IProductListing } from '@flex-development/kustomzcore'
import { ProductTemplateProps } from '@flex-development/kustomzdesign'
import {
  IPagePropsProduct as PageProps,
  NotFound,
  PC,
  ProductPageParams,
  ProductPageUrlQuery,
  SEO
} from '@subdomains/app'
import { ProductService } from '@subdomains/sales/services/ProductService'
import { findIndex } from 'lodash'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

/**
 * @file Page - Product
 * @module pages/products/handle
 */

const ProductTemplate = dynamic(async () => {
  return (await import('@flex-development/kustomzdesign')).ProductTemplate
})

/**
 * Renders a product page.
 *
 * @param props - Page component props
 * @param props.globals - Shopify `globals` namespace metafields obj
 * @param props.page - Shopify API product listing resource data
 * @param props.seo - `SEO` component properties
 * @param props.template - `ProductTemplate` component properties
 */
const Product: PC<PageProps> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <ProductTemplate {...template} />
  </>
)

/**
 * Fetches the data required to display a product listing using the
 * `ProductTemplate` component.
 *
 * @todo Fetch product reviews
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/sales-channels
 *
 * @param context - Next.js page component context
 * @param context.params - Dynamic route parameters
 * @param context.query - The query string
 * @param context.req - HTTP request object
 */
export const getServerSideProps: GetServerSideProps<
  PageProps,
  ProductPageUrlQuery
> = async (context: GetServerSidePropsContext<ProductPageParams>) => {
  // Initialize services
  const Products = new ProductService()

  // Get product handle and variant sku
  const { handle, sku } = context.query as ProductPageUrlQuery

  // Get product data
  let product = await Products.getByHandle(handle)

  // If product isn't found, show 404 layout
  if ((product as NotFound).notFound) return product as NotFound

  // ! Guarenteed to be product page. Error will be thrown otherwise
  product = product as IProductListing

  // Get index of active carousel item
  const active = findIndex(
    product.variants,
    product.variants.find(variant => variant.sku === sku)
  )

  // Build template data object
  const template = serialize<ProductTemplateProps>({
    active,
    collection: { href: 'products', title: 'Products' },
    product,
    reviews: []
  })

  // Get global metafields
  const globals = await getGlobalMetafields()

  // Get SEO object
  const seo = await getSEOData(
    globals,
    { ...product, variant: active },
    'product'
  )

  return { props: { globals, page: product, seo, template } }
}

export default Product
