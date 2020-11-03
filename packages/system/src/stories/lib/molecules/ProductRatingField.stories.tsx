import { ProductRatingField, ProductRatingFieldProps } from '@system/components'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - ProductRatingField
 * @module stories/lib/molecules/ProductRatingField
 */

export default {
  component: ProductRatingField,
  parameters: {
    jest: ['ProductRatingField']
  },
  title: 'Library/Molecules/ProductRatingField'
}

export const Default: StoryFN<ProductRatingFieldProps> = (
  args: ProductRatingFieldProps
) => <ProductRatingField {...args} />

Default.args = {
  className: 'pl-0-first'
}
