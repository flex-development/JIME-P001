import type { ProductListingData } from '@core/types'

/**
 * @file Global Test Fixture - KAPI - /products/kustomz
 * @module tests/fixtures/api/products/kustomz
 */

export default {
  body_html:
    '<meta charset="utf-8"><span data-mce-fragment="1">Scenester knausgaard est craft beer typewriter pitchfork. Magna ipsum hot chicken, ut tote bag quis truffaut cillum culpa brunch knausgaard coloring book palo santo. </span>',
  handle: 'kustomz',
  images: [
    {
      alt: 'KUSTOMZ product',
      created_at: '2021-01-02T18:29:07-05:00',
      height: 2048,
      id: 24044970377371,
      position: 1,
      product_id: 5665197424795,
      src:
        'https://cdn.shopify.com/s/files/1/0470/4790/1339/products/kustomz.jpg?v=1609630147',
      updated_at: '2021-01-02T18:29:07-05:00',
      variant_ids: [
        36200397996187,
        36200669446299,
        36200676655259,
        36200683176091
      ],
      width: 2048
    }
  ],
  product_id: 5665197424795,
  title: 'KUSTOMZ',
  variants: [
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2020-09-29T14:36:23-04:00',
      formatted_price: '$20.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 36200397996187,
      image_id: 24044970377371,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 1,
      option_values: [
        { name: 'Style', option_id: 7222504259739, value: '◯ Ash Tray' }
      ],
      position: 4,
      price: '20.00',
      requires_shipping: true,
      sku: 'kustomz-ash-tray-circle',
      taxable: true,
      title: '◯ Ash Tray',
      updated_at: '2021-01-02T18:29:41-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2020-09-29T15:00:51-04:00',
      formatted_price: '$20.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 36200669446299,
      image_id: 24044970377371,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 1,
      option_values: [
        { name: 'Style', option_id: 7222504259739, value: '♡ Ash Tray' }
      ],
      position: 2,
      price: '20.00',
      requires_shipping: true,
      sku: 'kustomz-ash-tray-heart',
      taxable: true,
      title: '♡ Ash Tray',
      updated_at: '2021-01-02T18:29:41-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2020-09-29T15:01:33-04:00',
      formatted_price: '$20.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 36200676655259,
      image_id: 24044970377371,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 1,
      option_values: [
        { name: 'Style', option_id: 7222504259739, value: '▢ Ash Tray' }
      ],
      position: 3,
      price: '20.00',
      requires_shipping: true,
      sku: 'kustomz-ash-tray-square',
      taxable: true,
      title: '▢ Ash Tray',
      updated_at: '2021-01-02T18:29:41-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2020-09-29T15:02:19-04:00',
      formatted_price: '$35.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 36200683176091,
      image_id: 24044970377371,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 1,
      option_values: [
        { name: 'Style', option_id: 7222504259739, value: 'Rolling Tray' }
      ],
      position: 1,
      price: '35.00',
      requires_shipping: true,
      sku: 'kustomz-rolling-tray',
      taxable: true,
      title: 'Rolling Tray',
      updated_at: '2021-01-02T18:29:41-05:00',
      weight: 0,
      weight_unit: 'lb'
    }
  ]
} as ProductListingData
