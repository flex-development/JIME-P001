import { StoryFN } from '@kustomz-config/index'
import { Heading, ProductHeading, ProductHeadingProps } from '@kustomz/lib'
import React from 'react'
import products from '../../../../__mocks__/products.mock.json'

/**
 * @file Stories - ProductHeading
 * @module stories/lib/molecules/ProductHeading
 */

export default {
  argTypes: {
    size: {
      control: {
        options: [1, 2, 3, 4, 5, 6],
        type: 'select'
      }
    }
  },
  component: ProductHeading,
  parameters: {
    jest: ['ProductHeading']
  },
  subcomponents: { Heading },
  title: 'Library/Molecules/ProductHeading'
}

export const AshTray: StoryFN<ProductHeadingProps> = (
  args: ProductHeadingProps
) => <ProductHeading {...args} />

const { variants, title } = Object.assign(
  {},
  products.find(p => p.handle === 'ash-tray')
)

AshTray.args = {
  price: variants[0].price,
  title: title
}
