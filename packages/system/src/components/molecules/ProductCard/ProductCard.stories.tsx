import { PRODUCTS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { IProductListing } from 'shopify-api-node'
import { ProductCard, ProductCardProps } from './ProductCard'

/**
 * @file Stories - ProductCard
 * @module components/molecules/ProductCard/stories
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

AshTray.args = {
  product: PRODUCTS.find(p => p.handle === 'ash-tray') as IProductListing
}

export const Kustomz: StoryFN<ProductCardProps> = (args: ProductCardProps) => (
  <ProductCard {...args} />
)

Kustomz.args = {
  product: PRODUCTS.find(p => p.handle === 'kustomz') as IProductListing
}