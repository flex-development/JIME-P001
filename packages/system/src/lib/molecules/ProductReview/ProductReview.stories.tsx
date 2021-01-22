import { REVIEWS } from '@system-mocks/utils'
import { ProductReview } from './ProductReview'
import type { ProductReviewProps } from './ProductReview.props'

/**
 * @file Stories - ProductReview
 * @module lib/molecules/ProductReview/stories
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

export const Default: FCS<ProductReviewProps> = args => (
  <ProductReview {...args} />
)

Default.args = {
  review: REVIEWS[0]
}
