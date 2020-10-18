import { ProductReview, ProductReviewProps } from '@system/lib'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - ProductReview
 * @module stories/lib/molecules/ProductReview
 */

export default {
  component: ProductReview,
  parameters: {
    jest: ['ProductReview']
  },
  title: 'Library/Molecules/ProductReview'
}

export const Default: StoryFN<ProductReviewProps> = (
  args: ProductReviewProps
) => <ProductReview {...args} />

Default.args = {
  body:
    'Gastropub pork belly deserunt veniam four dollar toast, occaecat master cleanse copper mug heirloom excepteur austin asymmetrical deep v sint kickstarter. Lumbersexual hoodie succulents, yuccie drinking vinegar cupidatat enim.',
  id: 'product-review-0',
  name: 'Customer Name',
  style: {
    maxWidth: '1362px'
  }
}
