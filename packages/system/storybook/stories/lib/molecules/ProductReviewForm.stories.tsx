import { StoryFN } from '@kustomz-config/index'
import { ProductReviewForm, ProductReviewFormProps } from '@kustomz/lib'
import { omit } from 'lodash'
import React from 'react'
import products from '../../../../__mocks__/products.mock.json'

/**
 * @file Stories - ProductReviewForm
 * @module stories/lib/molecules/ProductReviewForm
 */

export default {
  component: ProductReviewForm,
  parameters: {
    jest: ['ProductReviewForm']
  },
  title: 'Library/Molecules/ProductReviewForm'
}

const ashtray_data = Object.assign({}, omit(products[0]))

export const AshTray: StoryFN<ProductReviewFormProps> = (
  args: ProductReviewFormProps
) => <ProductReviewForm {...args} />

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
