import type { CheckoutLineItemInput } from '@kustomzcore/types'
import omit from 'lodash/omit'
import PRODUCT_LISTING_DATA_ASH_TRAY from './api/products/ash-tray'
import PRODUCT_LISTING_DATA_KUSTOMZ from './api/products/kustomz'

/**
 * @file Global Test Fixture - Checkout Line Items
 * @module tests/fixtures/checkout-line-items
 */

export default [
  {
    price: '10.00',
    product: omit(PRODUCT_LISTING_DATA_ASH_TRAY, ['body_html']),
    properties: null,
    quantity: 2,
    variant_id: 36197732909211
  },
  {
    price: '35.00',
    product: omit(PRODUCT_LISTING_DATA_KUSTOMZ, ['body_html']),
    properties: {
      kpd:
        'Organic kogi fixie, art party cray viral ex la croix marfa fashion axe bushwick flannel lo-fi sunt. Fugiat affogato sint, esse et normcore mustache craft beer ramps DIY.'
    },
    quantity: 2,
    variant_id: 36200683176091
  }
] as CheckoutLineItemInput[]
