import { PRODUCTS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { ProductGrid, ProductGridProps } from './ProductGrid'

/**
 * @file Stories - ProductGrid
 * @module components/organisms/ProductGrid/stories
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
  products: PRODUCTS
}
