import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box } from '@system/lib/atoms/Box'
import { Button } from '@system/lib/atoms/Button'
import type { DialogProps } from '@system/lib/atoms/Dialog'
import { Dialog } from '@system/lib/atoms/Dialog'
import { ProductReviewForm } from '@system/lib/molecules/ProductReviewForm'
import isFunction from 'lodash/isFunction'
import type { FC } from 'react'
import useBoolean from 'react-hanger/array/useBoolean'
import type { ProductReviewDialogProps } from './ProductReviewDialog.props'

/**
 * @file Implementation - ProductReviewDialog
 * @module lib/molecules/ProductReviewDialog/impl
 */

/**
 * Modal that allows users to submit product reviews.
 *
 * Renders a `Dialog` component with the class `product-review-dialog`.
 */
export const ProductReviewDialog: FC<ProductReviewDialogProps> = props => {
  const { form, ...rest } = props

  const sanitized = useSanitizedProps<'dialog', DialogProps>(rest, {
    'product-review-dialog': true
  })

  // Handle dialog visibility
  const [open, { setFalse: close }] = useBoolean(rest.open || false)

  return (
    <Dialog {...sanitized} id={`product-review-dialog-${form.id}`} open={open}>
      <Box className='product-review-dialog-content'>
        <Button
          $variant='ghost'
          aria-label='Close dialog'
          className='product-review-dialog-btn'
          name='close-dialog'
          onClick={close}
        />

        <ProductReviewForm
          {...form}
          handler={async (review, event) => {
            if (isFunction(form.handler)) await form.handler(review, event)
            close()
          }}
          method='dialog'
        />
      </Box>
    </Dialog>
  )
}
