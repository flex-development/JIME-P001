import { PRODUCTS } from '@system-mocks/utils'
import {
  ProductReviewEntryForm,
  ProductReviewEntryFormProps
} from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

/**
 * @file Stories - ProductReviewEntryForm
 * @module stories/lib/organisms/ProductReviewEntryForm
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
