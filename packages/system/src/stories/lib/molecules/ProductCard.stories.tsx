import products from '@app-tests/__mocks__/data/product-listings.mock.json'
import { ProductCard, ProductCardProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import { getProductCardProps } from '@system/utils'
import React from 'react'

/**
 * @file Stories - ProductCard
 * @module stories/lib/molecules/ProductCard
 */

export default {
  args: {
    style: {
      maxWidth: '438px'
    }
  },
  component: ProductCard,
  parameters: {
    jest: ['ProductCard']
  },
  title: 'Library/Molecules/ProductCard'
}

export const AshTray: StoryFN<ProductCardProps> = (args: ProductCardProps) => (
  <ProductCard {...args} />
)

AshTray.args = getProductCardProps(products[0])

export const Kustomz: StoryFN<ProductCardProps> = (args: ProductCardProps) => (
  <ProductCard {...args} />
)

Kustomz.args = getProductCardProps(products[2])
