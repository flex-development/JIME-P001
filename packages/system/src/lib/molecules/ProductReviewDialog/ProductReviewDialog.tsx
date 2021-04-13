import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box } from '@system/lib/atoms/Box'
import { Button } from '@system/lib/atoms/Button'
import type { DialogProps } from '@system/lib/atoms/Dialog'
import { Dialog } from '@system/lib/atoms/Dialog'
import { ProductReviewForm } from '@system/lib/molecules/ProductReviewForm'
import isFunction from 'lodash/isFunction'
import type { FC } from 'react'
import { useEffect } from 'react'
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
  const { onClose, form, ...rest } = props

  const sanitized = useSanitizedProps<'dialog', DialogProps>(rest, {
    'product-review-dialog': true
  })

  // Handle dialog visibility
  const [open, openActions] = useBoolean(rest.open || false)

  // Watch for changes to visibility state (open dialog only)
  useEffect(() => {
    if (rest.open) openActions.setValue(rest.open)
  }, [rest.open, openActions])

  return (
    <Dialog {...sanitized} id={`product-review-dialog-${form.id}`} open={open}>
      <Box className='product-review-dialog-content'>
        <Button
          $variant='ghost'
          aria-label='Close dialog'
          className='product-review-dialog-btn'
          name='close-dialog'
          onClick={event => {
            if (isFunction(onClose)) onClose(event)
            openActions.setFalse()
          }}
        />

        <ProductReviewForm
          {...form}
          handler={async (review, event) => {
            if (isFunction(form.handler)) await form.handler(review, event)
            openActions.setFalse()
          }}
          method='dialog'
        />
      </Box>
    </Dialog>
  )
}
