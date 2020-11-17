import products from '@app-tests/__mocks__/data/product-listings.mock.json'
import { ProductGrid, ProductGridProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Stories - ProductGrid
 * @module stories/lib/organisms/ProductGrid
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: ProductGrid,
  parameters: {
    jest: ['ProductGrid']
  },
  title: 'Library/Organisms/ProductGrid'
}

export const Default: StoryFN<ProductGridProps> = (args: ProductGridProps) => (
  <ProductGrid {...args} />
)

Default.args = {
  products: (products as unknown) as Array<IProductListing>
}
