import { ProductRatingField } from './ProductRatingField'
import type { ProductRatingFieldProps } from './ProductRatingField.props'

/**
 * @file Stories - ProductRatingField
 * @module lib/molecules/ProductRatingField/stories
 */

export default {
  component: ProductRatingField,
  parameters: {
    jest: ['ProductRatingField']
  },
  title: 'Library/Molecules/ProductRatingField'
}

export const Default: FCS<ProductRatingFieldProps> = args => (
  <ProductRatingField {...args} />
)

Default.args = {}
