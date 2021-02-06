import { ProductRating } from './ProductRating'
import type { ProductRatingProps } from './ProductRating.props'

/**
 * @file Stories - ProductRating
 * @module lib/molecules/ProductRating/stories
 */

export default {
  component: ProductRating,
  parameters: {
    jest: ['ProductRating']
  },
  title: 'Library/Molecules/ProductRating'
}

export const Default: FCS<ProductRatingProps> = args => (
  <ProductRating {...args} />
)

Default.args = {}
