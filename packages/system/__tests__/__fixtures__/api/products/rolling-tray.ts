import type { ProductListingData } from '@kustomzcore/types'

/**
 * @file Global Test Fixture - KAPI - /products/rolling-tray
 * @module tests/fixtures/api/products/rolling-tray
 */

export default {
  body_html:
    '<meta charset="utf-8">Banh mi before they sold out irony hella, intelligentsia tattooed 8-bit mumblecore craft beer iceland letterpress helvetica +1 XOXO shoreditch. Knausgaard polaroid cloud bread lyft dolor voluptate slow-carb, keytar ex four dollar toast four loko.',
  handle: 'rolling-tray',
  images: [
    {
      alt: 'Rolling Tray - LA $ONRISA',
      created_at: '2021-01-02T18:30:20-05:00',
      height: 2048,
      id: 24045073662107,
      position: 3,
      product_id: 5664639090843,
      src:
        'https://cdn.shopify.com/s/files/1/0470/4790/1339/products/rolling-tray-la-sonrisa.jpg?v=1609630220',
      updated_at: '2021-01-02T18:30:20-05:00',
      variant_ids: [36197906055323, 37883226751131],
      width: 2048
    },
    {
      alt: 'Rolling Tray - FUNFETTI',
      created_at: '2021-01-02T18:30:20-05:00',
      height: 2048,
      id: 24045074383003,
      position: 1,
      product_id: 5664639090843,
      src:
        'https://cdn.shopify.com/s/files/1/0470/4790/1339/products/rolling-tray-funfetti.jpg?v=1609630220',
      updated_at: '2021-01-02T18:30:20-05:00',
      variant_ids: [36197905989787, 37883226685595],
      width: 2048
    },
    {
      alt: 'Rolling Tray - JELLY $LIDES',
      created_at: '2021-01-02T18:30:20-05:00',
      height: 2048,
      id: 24045074546843,
      position: 2,
      product_id: 5664639090843,
      src:
        'https://cdn.shopify.com/s/files/1/0470/4790/1339/products/rolling-tray-jelly-slides.jpg?v=1609630220',
      updated_at: '2021-01-02T18:30:20-05:00',
      variant_ids: [36197906022555, 37883226718363],
      width: 2048
    }
  ],
  product_id: 5664639090843,
  title: 'Rolling Tray',
  variants: [
    {
      available: false,
      barcode: '',
      compare_at_price: null,
      created_at: '2021-02-04T17:56:13-05:00',
      formatted_price: '$15.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37883226685595,
      image_id: 24045074383003,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 0,
      option_values: [
        {
          name: 'Size',
          option_id: 7776424198299,
          value: 'travel'
        },
        {
          name: 'Style',
          option_id: 7221854503067,
          value: 'FUNFETTI'
        }
      ],
      position: 2,
      price: '15.00',
      requires_shipping: true,
      sku: 'rolling-tray-funfetti-travel',
      taxable: true,
      title: 'FUNFETTI / travel',
      updated_at: '2021-02-04T17:57:40-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: false,
      barcode: '',
      compare_at_price: null,
      created_at: '2021-02-04T17:56:13-05:00',
      formatted_price: '$15.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37883226718363,
      image_id: 24045074546843,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 0,
      option_values: [
        {
          name: 'Size',
          option_id: 7776424198299,
          value: 'travel'
        },
        {
          name: 'Style',
          option_id: 7221854503067,
          value: 'JELLY $LIDES'
        }
      ],
      position: 4,
      price: '15.00',
      requires_shipping: true,
      sku: 'rolling-tray-jelly-slides-travel',
      taxable: true,
      title: 'JELLY $LIDES / travel',
      updated_at: '2021-02-04T17:57:40-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: false,
      barcode: '',
      compare_at_price: null,
      created_at: '2021-02-04T17:56:14-05:00',
      formatted_price: '$15.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37883226751131,
      image_id: 24045073662107,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 0,
      option_values: [
        {
          name: 'Size',
          option_id: 7776424198299,
          value: 'travel'
        },
        {
          name: 'Style',
          option_id: 7221854503067,
          value: 'LA $ONRISA'
        }
      ],
      position: 6,
      price: '15.00',
      requires_shipping: true,
      sku: 'rolling-tray-la-sonrisa-travel',
      taxable: true,
      title: 'LA $ONRISA / travel',
      updated_at: '2021-02-04T17:57:40-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2020-09-29T11:23:08-04:00',
      formatted_price: '$25.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 36197905989787,
      image_id: 24045074383003,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 15,
      option_values: [
        {
          name: 'Size',
          option_id: 7776424198299,
          value: 'standard'
        },
        {
          name: 'Style',
          option_id: 7221854503067,
          value: 'FUNFETTI'
        }
      ],
      position: 1,
      price: '25.00',
      requires_shipping: true,
      sku: 'rolling-tray-funfetti',
      taxable: true,
      title: 'FUNFETTI / standard',
      updated_at: '2021-02-04T17:57:40-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2020-09-29T11:23:08-04:00',
      formatted_price: '$25.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 36197906022555,
      image_id: 24045074546843,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 15,
      option_values: [
        {
          name: 'Size',
          option_id: 7776424198299,
          value: 'standard'
        },
        {
          name: 'Style',
          option_id: 7221854503067,
          value: 'JELLY $LIDES'
        }
      ],
      position: 3,
      price: '25.00',
      requires_shipping: true,
      sku: 'rolling-tray-jelly-slides',
      taxable: true,
      title: 'JELLY $LIDES / standard',
      updated_at: '2021-02-04T17:57:40-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2020-09-29T11:23:08-04:00',
      formatted_price: '$25.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 36197906055323,
      image_id: 24045073662107,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 15,
      option_values: [
        {
          name: 'Size',
          option_id: 7776424198299,
          value: 'standard'
        },
        {
          name: 'Style',
          option_id: 7221854503067,
          value: 'LA $ONRISA'
        }
      ],
      position: 5,
      price: '25.00',
      requires_shipping: true,
      sku: 'rolling-tray-la-sonrisa',
      taxable: true,
      title: 'LA $ONRISA / standard',
      updated_at: '2021-02-04T17:57:40-05:00',
      weight: 0,
      weight_unit: 'lb'
    }
  ]
} as ProductListingData
