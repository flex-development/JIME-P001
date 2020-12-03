import { PRODUCTS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import {
  ProductReviewEntryForm,
  ProductReviewEntryFormProps
} from './ProductReviewEntryForm'

/**
 * @file Stories - ProductReviewEntryForm
 * @module components/organisms/ProductReviewEntryForm/stories
 */

export default {
  component: ProductReviewEntryForm,
  parameters: {
    jest: ['ProductReviewEntryForm']
  },
  title: 'Library/Organisms/ProductReviewEntryForm'
}

const ashtray_data = PRODUCTS.find(p => p.handle === 'ash-tray')

export const AshTray: StoryFN<ProductReviewEntryFormProps> = (
  args: ProductReviewEntryFormProps
) => <ProductReviewEntryForm {...args} />

AshTray.args = {
  description:
    'To submit a review, you must use an email attached to a previously made order.',
  id: `${ashtray_data?.product_id}`,
  style: {
    maxWidth: '704px'
  },
  title: ashtray_data?.title as string,
  variants: ashtray_data?.variants ?? []
}
