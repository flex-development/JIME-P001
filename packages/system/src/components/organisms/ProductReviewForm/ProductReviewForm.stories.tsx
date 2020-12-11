import { PRODUCTS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import { ProductReviewForm, ProductReviewFormProps } from './ProductReviewForm'

/**
 * @file Stories - ProductReviewForm
 * @module components/organisms/ProductReviewForm/stories
 */

export default {
  component: ProductReviewForm,
  parameters: {
    jest: ['ProductReviewForm']
  },
  title: 'Library/Organisms/ProductReviewForm'
}

const ashtray_data = PRODUCTS.find(p => p.handle === 'ash-tray')

export const AshTray: StoryFN<ProductReviewFormProps> = (
  args: ProductReviewFormProps
) => <ProductReviewForm {...args} />

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
