import type { ProductListingData } from '@kustomzcore/types'

/**
 * @file Global Test Fixture - KAPI - /products/ash-tray
 * @module tests/fixtures/api/products/ash-tray
 */

export default {
  body_html:
    '<meta charset="utf-8"><span data-mce-fragment="1">Pork belly etsy swag unicorn, tumblr tattooed kombucha vaporware. Dolore adipisicing narwhal shaman, pug butcher enim unicorn.</span>',
  handle: 'ash-tray',
  images: [
    {
      alt: 'Ash Tray - FUNFETTI',
      created_at: '2021-01-02T18:27:42-05:00',
      height: 2048,
      id: 24044856082587,
      position: 1,
      product_id: 5664609534107,
      src:
        'https://cdn.shopify.com/s/files/1/0470/4790/1339/products/ash-tray-funfetti.jpg?v=1611168138',
      updated_at: '2021-01-20T13:42:18-05:00',
      variant_ids: [36197732909211],
      width: 2048
    },
    {
      alt: 'Ash Tray - JELLY $LIDES',
      created_at: '2021-01-02T18:27:42-05:00',
      height: 2048,
      id: 24044856672411,
      position: 2,
      product_id: 5664609534107,
      src:
        'https://cdn.shopify.com/s/files/1/0470/4790/1339/products/ash-tray-jelly-slides.jpg?v=1611168138',
      updated_at: '2021-01-20T13:42:18-05:00',
      variant_ids: [36197732941979],
      width: 2048
    }
  ],
  product_id: 6147082092699,
  title: 'Ash Tray',
  variants: [
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2020-09-29T11:13:11-04:00',
      formatted_price: '$10.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 36197732909211,
      image_id: 24044856082587,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 1,
      option_values: [
        { name: 'Style', option_id: 7221820457115, value: 'FUNFETTI' }
      ],
      position: 1,
      price: '10.00',
      requires_shipping: true,
      sku: 'ash-tray-funfetti',
      taxable: true,
      title: 'FUNFETTI',
      updated_at: '2021-01-02T18:28:45-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2020-09-29T11:13:11-04:00',
      formatted_price: '$10.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 36197732941979,
      image_id: 24044856672411,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 1,
      option_values: [
        { name: 'Style', option_id: 7221820457115, value: 'JELLY $LIDES' }
      ],
      position: 2,
      price: '10.00',
      requires_shipping: true,
      sku: 'ash-tray-jelly-slides',
      taxable: true,
      title: 'JELLY $LIDES',
      updated_at: '2021-01-02T18:28:45-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: false,
      barcode: '',
      compare_at_price: null,
      created_at: '2020-09-29T11:13:11-04:00',
      formatted_price: '$10.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 36197732974747,
      image_id: null,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 0,
      option_values: [
        { name: 'Style', option_id: 7221820457115, value: 'LA $ONRISA' }
      ],
      position: 3,
      price: '10.00',
      requires_shipping: true,
      sku: 'ash-tray-la-sonrisa',
      taxable: true,
      title: 'LA $ONRISA',
      updated_at: '2021-01-20T13:42:17-05:00',
      weight: 0,
      weight_unit: 'lb'
    }
  ]
} as ProductListingData
