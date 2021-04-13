import { AshTray as Form } from '../ProductReviewForm/ProductReviewForm.stories'
import { ProductReviewDialog } from './ProductReviewDialog'
import type { ProductReviewDialogProps } from './ProductReviewDialog.props'

/**
 * @file Stories - ProductReviewDialog
 * @module lib/molecules/ProductReviewDialog/stories
 */

export default {
  args: {},
  component: ProductReviewDialog,
  parameters: {
    jest: ['ProductReviewDialog']
  },
  title: 'Library/Molecules/ProductReviewDialog'
}

export const AshTray: FCS<ProductReviewDialogProps> = args => (
  <ProductReviewDialog {...args} />
)

AshTray.args = {
  form: Form.args,
  open: true
}
