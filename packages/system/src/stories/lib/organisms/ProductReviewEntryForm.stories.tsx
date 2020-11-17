import products from '@app-tests/__mocks__/data/product-listings.mock.json'
import {
  ProductReviewEntryForm,
  ProductReviewEntryFormProps
} from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { IProductListing } from 'shopify-api-node'

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

const PRODUCTS = (products as unknown) as Array<IProductListing>
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
