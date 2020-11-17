import products from '@app-tests/__mocks__/data/product-listings.mock.json'
import ReviewsMockRepoRoot from '@app-tests/__mocks__/data/reviews.mock.json'
import { IReview } from '@flex-development/types'
import { ProductTemplate, ProductTemplateProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Stories - ProductTemplate
 * @module stories/lib/templates/ProductTemplate
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: ProductTemplate,
  parameters: {
    jest: ['ProductTemplate']
  },
  title: 'Library/Templates/ProductTemplate'
}

const PRODUCTS = (products as unknown) as Array<IProductListing>
const reviews = Object.values(ReviewsMockRepoRoot) as Array<IReview>

export const AshTray: StoryFN<ProductTemplateProps> = (
  args: ProductTemplateProps
) => <ProductTemplate {...args} />

const ashtray_p = PRODUCTS.find(p => p.handle === 'ash-tray') as IProductListing

AshTray.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: ashtray_p,
  reviews: reviews.filter(review => review.product_id === ashtray_p.product_id)
}

export const Kustomz: StoryFN<ProductTemplateProps> = (
  args: ProductTemplateProps
) => <ProductTemplate {...args} />

const kustomz_p = PRODUCTS.find(p => p.handle === 'kustomz') as IProductListing

Kustomz.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: kustomz_p,
  reviews: reviews.filter(review => review.product_id === kustomz_p.product_id)
}

export const RollingTray: StoryFN<ProductTemplateProps> = (
  args: ProductTemplateProps
) => <ProductTemplate {...args} />

const rollingtray_p = PRODUCTS.find(
  p => p.handle === 'rolling-tray'
) as IProductListing

RollingTray.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: rollingtray_p,
  reviews: reviews.filter(
    review => review.product_id === rollingtray_p.product_id
  )
}
