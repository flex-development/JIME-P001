import { StoryFN } from '@system/types/storybook'
import { ProductBreadcrumb, ProductBreadcrumbProps } from './ProductBreadcrumb'

/**
 * @file Stories - ProductBreadcrumb
 * @module components/ui/molecules/ProductBreadcrumb/stories
 */

export default {
  component: ProductBreadcrumb,
  parameters: {
    jest: ['ProductBreadcrumb']
  },
  title: 'Library/Molecules/ProductBreadcrumb'
}

export const Default: StoryFN<ProductBreadcrumbProps> = (
  args: ProductBreadcrumbProps
) => <ProductBreadcrumb {...args} />

Default.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: 'Ash Tray',
  variant: 'Funfetti'
}
