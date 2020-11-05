import {
  ProductReviewEntryForm,
  ProductReviewEntryFormProps
} from '@system/components'
import { StoryFN } from '@system/types'
import products from '@system/__mocks__/products.mock.json'
import { omit } from 'lodash'
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

const ashtray_data = Object.assign({}, omit(products[0]))

export const AshTray: StoryFN<ProductReviewEntryFormProps> = (
  args: ProductReviewEntryFormProps
) => <ProductReviewEntryForm {...args} />

AshTray.args = {
  description:
    'To submit a review, you must use an email attached to a previously made order.',
  id: ashtray_data.id,
  style: {
    maxWidth: '704px'
  },
  title: ashtray_data.title,
  variants: ashtray_data.variants
}
