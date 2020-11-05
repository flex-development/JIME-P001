import { ProductBreadcrumb, ProductBreadcrumbProps } from '@system/components'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - ProductBreadcrumb
 * @module stories/lib/molecules/ProductBreadcrumb
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
