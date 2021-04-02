import ASH_TRAY from '@system/tests/fixtures/api/products/ash-tray'
import { ProductReviewForm } from './ProductReviewForm'
import type { ProductReviewFormProps } from './ProductReviewForm.props'

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

export const AshTray: FCS<ProductReviewFormProps> = args => (
  <ProductReviewForm {...args} />
)

AshTray.args = {
  description: ProductReviewForm.defaultProps?.description,
  id: `${ASH_TRAY.product_id}`,
  title: ASH_TRAY.title,
  variants: ASH_TRAY.variants
}
