import { ProductResource } from '@flex-development/types'
import { ProductTemplate, ProductTemplateProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import products from '@system/__mocks__/products.mock.json'
import reviews from '@system/__mocks__/reviews.mock.json'
import React from 'react'

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

export const AshTray: StoryFN<ProductTemplateProps> = (
  args: ProductTemplateProps
) => <ProductTemplate {...args} />

const ashtray_p = products.find(p => p.handle === 'ash-tray') as ProductResource

AshTray.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: ashtray_p,
  reviews: reviews.filter(review => review.productId === ashtray_p.id)
}

export const Kustomz: StoryFN<ProductTemplateProps> = (
  args: ProductTemplateProps
) => <ProductTemplate {...args} />

const kustomz_p = products.find(p => p.handle === 'kustomz') as ProductResource

Kustomz.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: kustomz_p,
  reviews: reviews.filter(review => review.productId === kustomz_p.id)
}

export const RollingTray: StoryFN<ProductTemplateProps> = (
  args: ProductTemplateProps
) => <ProductTemplate {...args} />

const rollingtray_p = products.find(
  p => p.handle === 'rolling-tray'
) as ProductResource

RollingTray.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: rollingtray_p,
  reviews: reviews.filter(review => review.productId === rollingtray_p.id)
}
