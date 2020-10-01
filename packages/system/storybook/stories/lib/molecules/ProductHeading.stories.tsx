import { ProductHeading, ProductHeadingProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN } from '../../../config'

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
  title: 'Library/Molecules/ProductHeading'
}

export const AshTray: StoryFN<ProductHeadingProps> = (
  args: ProductHeadingProps
) => <ProductHeading {...args} />

AshTray.args = {
  price: '$10.00',
  title: 'Ash Tray'
}
