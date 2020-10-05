import { StoryFN } from '@kustomz-config/index'
import { ProductCard, ProductCardProps } from '@kustomz/lib'
import { omit } from 'lodash'
import React from 'react'
import products from '../../../../__mocks__/products.mock.json'

/**
 * @file Stories - ProductCard
 * @module stories/lib/molecules/ProductCard
 */

export default {
  component: ProductCard,
  parameters: {
    jest: ['ProductCard']
  },
  title: 'Library/Molecules/ProductCard'
}

const exclude_from_product = ['available', 'description', 'images', 'options']

const ashtray_data = Object.assign({}, omit(products[0], exclude_from_product))
const kustomz_data = Object.assign({}, omit(products[2], exclude_from_product))

export const AshTray: StoryFN<ProductCardProps> = (args: ProductCardProps) => (
  <ProductCard {...args} />
)

AshTray.args = {
  ...ashtray_data,
  style: {
    maxWidth: '438px'
  }
}

export const Kustomz: StoryFN<ProductCardProps> = (args: ProductCardProps) => (
  <ProductCard {...args} />
)

Kustomz.args = {
  ...kustomz_data,
  style: {
    maxWidth: '438px'
  }
}
