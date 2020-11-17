import ReviewsMockRepoRoot from '@app-tests/__mocks__/data/reviews.mock.json'
import { ProductReview, ProductReviewProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import { getProductReviewProps } from '@system/utils'
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

const reviews = Object.values(ReviewsMockRepoRoot)

export const Default: StoryFN<ProductReviewProps> = (
  args: ProductReviewProps
) => <ProductReview {...args} />

Default.args = getProductReviewProps(reviews[0])
