import products from '@app-tests/__mocks__/data/product-listings.mock.json'
import {
  Heading,
  ProductHeading,
  ProductHeadingProps
} from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

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

const ash_tray_data = Object.assign(
  {},
  products.find(p => p.handle === 'ash-tray')
)

AshTray.args = {
  price: ash_tray_data.variants[0].price,
  title: ash_tray_data.title
}
