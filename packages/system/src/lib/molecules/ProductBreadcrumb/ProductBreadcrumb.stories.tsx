import { ProductBreadcrumb } from './ProductBreadcrumb'
import type { ProductBreadcrumbProps } from './ProductBreadcrumb.props'

/**
 * @file Stories - ProductBreadcrumb
 * @module lib/molecules/ProductBreadcrumb/stories
 */

export default {
  component: ProductBreadcrumb,
  parameters: {
    jest: ['ProductBreadcrumb']
  },
  title: 'Library/Molecules/ProductBreadcrumb'
}

export const Default: FCS<ProductBreadcrumbProps> = args => (
  <ProductBreadcrumb {...args} />
)

Default.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: 'Ash Tray',
  variant: 'Funfetti'
}
