import { IProductListing } from '@flex-development/kustomzcore/types'
import { PRODUCTS, REVIEWS } from '@system-mocks/utils'
import { ProductTemplate } from './ProductTemplate'
import { ProductTemplateProps } from './ProductTemplate.props'

/**
 * @file Stories - ProductTemplate
 * @module lib/templates/ProductTemplate/stories
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

export const AshTray: FCS<ProductTemplateProps> = args => (
  <ProductTemplate {...args} />
)

const ashtray_p = PRODUCTS.find(p => p.handle === 'ash-tray') as IProductListing

AshTray.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: ashtray_p,
  reviews: REVIEWS.filter(review => review.product_id === ashtray_p.product_id)
}

export const Kustomz: FCS<ProductTemplateProps> = args => (
  <ProductTemplate {...args} />
)

const kustomz_p = PRODUCTS.find(p => p.handle === 'kustomz') as IProductListing

Kustomz.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: kustomz_p,
  reviews: REVIEWS.filter(review => review.product_id === kustomz_p.product_id)
}

export const RollingTray: FCS<ProductTemplateProps> = args => (
  <ProductTemplate {...args} />
)

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
  reviews: REVIEWS.filter(review => {
    return review.product_id === rollingtray_p.product_id
  })
}
