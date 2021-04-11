import { OBJECTS as REVIEWS } from '@kapi/tests/fixtures/judgeme/reviews'
import ASH_TRAY from '@system/tests/fixtures/api/products/ash-tray'
import KUSTOMZ from '@system/tests/fixtures/api/products/kustomz'
import ROLLING_TRAY from '@system/tests/fixtures/api/products/rolling-tray'
import { ProductTemplate } from './ProductTemplate'
import type { ProductTemplateProps } from './ProductTemplate.props'

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

AshTray.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: ASH_TRAY,
  reviews: REVIEWS.filter(r => r.product_external_id === ASH_TRAY.product_id)
}

export const Kustomz: FCS<ProductTemplateProps> = args => (
  <ProductTemplate {...args} />
)

Kustomz.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: KUSTOMZ,
  reviews: REVIEWS.filter(r => r.product_external_id === KUSTOMZ.product_id)
}

export const RollingTray: FCS<ProductTemplateProps> = args => (
  <ProductTemplate {...args} />
)

RollingTray.args = {
  collection: {
    href: '/collections/all-products',
    target: '_blank',
    title: 'All Products'
  },
  product: ROLLING_TRAY,
  reviews: REVIEWS.filter(r => {
    return r.product_external_id === ROLLING_TRAY.product_id
  })
}
