import { StoryFN } from '@system/types/storybook'
import {
  ProductRatingField,
  ProductRatingFieldProps
} from './ProductRatingField'

/**
 * @file Stories - ProductRatingField
 * @module components/ui/molecules/ProductRatingField/stories
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
