import { ProductReview, ProductReviewProps } from '@system/lib'
import { StoryFN } from '@system/types'
import { getProductReviewProps } from '@system/utils'
import reviews from '@system/__mocks__/reviews.mock.json'
import React from 'react'

/**
 * @file Stories - ProductReview
 * @module stories/lib/molecules/ProductReview
 */

export default {
  args: {
    style: {
      maxWidth: '1362px'
    }
  },
  component: ProductReview,
  parameters: {
    jest: ['ProductReview']
  },
  title: 'Library/Molecules/ProductReview'
}

export const Default: StoryFN<ProductReviewProps> = (
  args: ProductReviewProps
) => <ProductReview {...args} />

Default.args = getProductReviewProps(reviews[0])
