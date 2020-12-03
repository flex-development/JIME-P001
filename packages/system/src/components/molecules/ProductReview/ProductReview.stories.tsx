import { REVIEWS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import { ProductReview, ProductReviewProps } from './ProductReview'

/**
 * @file Stories - ProductReview
 * @module components/molecules/ProductReview/stories
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

Default.args = {
  review: REVIEWS[0]
}
