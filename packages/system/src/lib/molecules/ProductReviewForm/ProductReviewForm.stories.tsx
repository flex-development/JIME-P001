import { PRODUCTS } from '@system-mocks/utils'
import { ProductReviewForm } from './ProductReviewForm'
import { ProductReviewFormProps } from './ProductReviewForm.props'

/**
 * @file Stories - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/stories
 */

export default {
  args: {
    style: {
      maxWidth: '704px'
    }
  },
  component: ProductReviewForm,
  parameters: {
    jest: ['ProductReviewForm']
  },
  title: 'Library/Molecules/ProductReviewForm'
}

const ashtray_data = PRODUCTS.find(p => p.handle === 'ash-tray')

export const AshTray: FCS<ProductReviewFormProps> = args => (
  <ProductReviewForm {...args} />
)

AshTray.args = {
  description:
    'To submit a review, you must use an email attached to a previously made order.',
  id: `${ashtray_data?.product_id}`,
  title: ashtray_data?.title as string,
  variants: ashtray_data?.variants ?? []
}
