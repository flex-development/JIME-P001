import { ProductCard, ProductCardProps } from '@kustomz/lib'
import { omit } from 'lodash'
import React from 'react'
import products from '../../../../__mocks__/products.mock.json'
import { StoryFN } from '../../../config'

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

export const AshTray: StoryFN<ProductCardProps> = (
  args: ProductCardProps
) => <ProductCard {...args} />

const ashtray_data = Object.assign({}, omit(products[0], [
  'description',
  'options'
]))

AshTray.args = {
  ...(ashtray_data as unknown as ProductCardProps),
  style: {
    maxHeight: '438px',
    maxWidth: '438px'
  }
}
