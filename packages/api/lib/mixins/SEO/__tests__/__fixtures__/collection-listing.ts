import type {
  ICollectionListing,
  IProductListing,
  SEOData
} from '@flex-development/kustomzcore/types'
import merge from 'lodash/merge'
import { stripHtml } from 'string-strip-html'
import GLOBAL_SEO from './global-seo'
import { PRODUCT_LISTING } from './product-listing'

/**
 * @file Test Fixture - Collection Listing
 * @module lib/mixins/SEO/tests/fixtures/collection-listing
 */

export const COLLECTION_LISTING: ICollectionListing = {
  body_html:
    'Pitchfork listicle typewriter meditation wolf tumeric. Sint green juice gluten-free sustainable, quis culpa umami XOXO cardigan aesthetic. Keytar locavore quinoa mlkshk duis cupidatat pop-up kitsch mollit hella bushwick. Adaptogen non beard ex.',
  collection_id: 228162732187,
  default_product_image: {
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
  handle: 'all-products',
  image: null,
  published_at: '2020-10-18T15:54:01-04:00',
  sort_order: 'best-selling',
  title: 'All Products',
  updated_at: '2021-02-04T10:44:48-05:00'
}

export const COLLECTION_LISTING_PRODUCTS: IProductListing[] = [
  PRODUCT_LISTING,
  {
    available: true,
    body_html:
      '<meta charset="utf-8"><span data-mce-fragment="1">Scenester knausgaard est craft beer typewriter pitchfork. Magna ipsum hot chicken, ut tote bag quis truffaut cillum culpa brunch knausgaard coloring book palo santo. </span>',
    created_at: '2020-09-29T14:36:23-04:00',
    handle: 'kustomz',
    images: [
      {
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
          36200683176091,
          37883233566875,
          37883233599643,
          37883233632411,
          37883233665179
        ],
        width: 2048
      }
    ],
    options: [
      {
        id: 7222504259739,
        name: 'Style',
        position: 1,
        product_id: 5665197424795,
        values: ['Rolling Tray', '▢ Ash Tray', '◯ Ash Tray', '♡ Ash Tray']
      },
      {
        id: 7776432685211,
        name: 'Size',
        position: 2,
        product_id: 5665197424795,
        values: ['standard', 'travel']
      }
    ],
    product_id: 5665197424795,
    product_type: 'Kustomz',
    published_at: '2020-09-29T14:36:24-04:00',
    tags: 'stoner-necessities',
    title: 'KUSTOMZ',
    updated_at: '2021-02-04T18:00:02-05:00',
    variants: [
      {
        available: false,
        barcode: '',
        compare_at_price: null,
        created_at: '2021-02-04T17:58:36-05:00',
        formatted_price: '$10.00',
        fulfillment_service: 'manual',
        grams: 0,
        id: 37883233599643,
        image_id: 24044970377371,
        inventory_management: 'shopify',
        inventory_policy: 'deny',
        inventory_quantity: 0,
        option_values: [
          {
            name: 'Size',
            option_id: 7776432685211,
            value: 'travel'
          },
          {
            name: 'Style',
            option_id: 7222504259739,
            value: '♡ Ash Tray'
          }
        ],
        position: 4,
        price: '10.00',
        requires_shipping: true,
        sku: 'kustomz-ash-tray-heart-travel',
        taxable: true,
        title: '♡ Ash Tray / travel',
        updated_at: '2021-02-04T17:59:45-05:00',
        weight: 0,
        weight_unit: 'lb'
      },
      {
        available: false,
        barcode: '',
        compare_at_price: null,
        created_at: '2021-02-04T17:58:36-05:00',
        formatted_price: '$25.00',
        fulfillment_service: 'manual',
        grams: 0,
        id: 37883233566875,
        image_id: 24044970377371,
        inventory_management: 'shopify',
        inventory_policy: 'deny',
        inventory_quantity: 0,
        option_values: [
          {
            name: 'Size',
            option_id: 7776432685211,
            value: 'travel'
          },
          {
            name: 'Style',
            option_id: 7222504259739,
            value: 'Rolling Tray'
          }
        ],
        position: 2,
        price: '25.00',
        requires_shipping: true,
        sku: 'kustomz-rolling-tray-travel',
        taxable: true,
        title: 'Rolling Tray / travel',
        updated_at: '2021-02-04T17:59:45-05:00',
        weight: 0,
        weight_unit: 'lb'
      },
      {
        available: false,
        barcode: '',
        compare_at_price: null,
        created_at: '2021-02-04T17:58:37-05:00',
        formatted_price: '$10.00',
        fulfillment_service: 'manual',
        grams: 0,
        id: 37883233632411,
        image_id: 24044970377371,
        inventory_management: 'shopify',
        inventory_policy: 'deny',
        inventory_quantity: 0,
        option_values: [
          {
            name: 'Size',
            option_id: 7776432685211,
            value: 'travel'
          },
          {
            name: 'Style',
            option_id: 7222504259739,
            value: '▢ Ash Tray'
          }
        ],
        position: 6,
        price: '10.00',
        requires_shipping: true,
        sku: 'kustomz-ash-tray-square-travel',
        taxable: true,
        title: '▢ Ash Tray / travel',
        updated_at: '2021-02-04T17:59:45-05:00',
        weight: 0,
        weight_unit: 'lb'
      },
      {
        available: false,
        barcode: '',
        compare_at_price: null,
        created_at: '2021-02-04T17:58:37-05:00',
        formatted_price: '$10.00',
        fulfillment_service: 'manual',
        grams: 0,
        id: 37883233665179,
        image_id: 24044970377371,
        inventory_management: 'shopify',
        inventory_policy: 'deny',
        inventory_quantity: 0,
        option_values: [
          {
            name: 'Size',
            option_id: 7776432685211,
            value: 'travel'
          },
          {
            name: 'Style',
            option_id: 7222504259739,
            value: '◯ Ash Tray'
          }
        ],
        position: 8,
        price: '10.00',
        requires_shipping: true,
        sku: 'kustomz-ash-tray-circle-travel',
        taxable: true,
        title: '◯ Ash Tray / travel',
        updated_at: '2021-02-04T17:59:46-05:00',
        weight: 0,
        weight_unit: 'lb'
      },
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
        inventory_quantity: 15,
        option_values: [
          {
            name: 'Size',
            option_id: 7776432685211,
            value: 'standard'
          },
          {
            name: 'Style',
            option_id: 7222504259739,
            value: '◯ Ash Tray'
          }
        ],
        position: 7,
        price: '20.00',
        requires_shipping: true,
        sku: 'kustomz-ash-tray-circle',
        taxable: true,
        title: '◯ Ash Tray / standard',
        updated_at: '2021-02-04T17:59:45-05:00',
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
        inventory_quantity: 15,
        option_values: [
          {
            name: 'Size',
            option_id: 7776432685211,
            value: 'standard'
          },
          {
            name: 'Style',
            option_id: 7222504259739,
            value: '♡ Ash Tray'
          }
        ],
        position: 3,
        price: '20.00',
        requires_shipping: true,
        sku: 'kustomz-ash-tray-heart',
        taxable: true,
        title: '♡ Ash Tray / standard',
        updated_at: '2021-02-04T17:59:45-05:00',
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
        inventory_quantity: 15,
        option_values: [
          {
            name: 'Size',
            option_id: 7776432685211,
            value: 'standard'
          },
          {
            name: 'Style',
            option_id: 7222504259739,
            value: '▢ Ash Tray'
          }
        ],
        position: 5,
        price: '20.00',
        requires_shipping: true,
        sku: 'kustomz-ash-tray-square',
        taxable: true,
        title: '▢ Ash Tray / standard',
        updated_at: '2021-02-04T17:59:45-05:00',
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
        inventory_quantity: 15,
        option_values: [
          {
            name: 'Size',
            option_id: 7776432685211,
            value: 'standard'
          },
          {
            name: 'Style',
            option_id: 7222504259739,
            value: 'Rolling Tray'
          }
        ],
        position: 1,
        price: '35.00',
        requires_shipping: true,
        sku: 'kustomz-rolling-tray',
        taxable: true,
        title: 'Rolling Tray / standard',
        updated_at: '2021-02-04T17:59:46-05:00',
        weight: 0,
        weight_unit: 'lb'
      }
    ],
    vendor: 'MorenasKustomz'
  },
  {
    available: true,
    body_html:
      '<meta charset="utf-8">Banh mi before they sold out irony hella, intelligentsia tattooed 8-bit mumblecore craft beer iceland letterpress helvetica +1 XOXO shoreditch. Knausgaard polaroid cloud bread lyft dolor voluptate slow-carb, keytar ex four dollar toast four loko.',
    created_at: '2020-09-29T11:23:08-04:00',
    handle: 'rolling-tray',
    images: [
      {
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
    options: [
      {
        id: 7221854503067,
        name: 'Style',
        position: 1,
        product_id: 5664639090843,
        values: ['FUNFETTI', 'JELLY $LIDES', 'LA $ONRISA']
      },
      {
        id: 7776424198299,
        name: 'Size',
        position: 2,
        product_id: 5664639090843,
        values: ['standard', 'travel']
      }
    ],
    product_id: 5664639090843,
    product_type: 'Rolling Trays',
    published_at: '2020-09-29T11:23:10-04:00',
    tags: '',
    title: 'Rolling Tray',
    updated_at: '2021-02-04T17:57:40-05:00',
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
    ],
    vendor: 'MorenasKustomz'
  }
]

export const COLLECTION_LISTING_SEO: SEOData = merge(GLOBAL_SEO, {
  description: stripHtml(COLLECTION_LISTING.body_html.trim()).result,
  keywords: 'meditation,stumptown,chartreuse',
  og: {
    image: COLLECTION_LISTING.default_product_image?.src,
    'image:alt': COLLECTION_LISTING.default_product_image?.alt,
    'image:height': COLLECTION_LISTING.default_product_image?.height,
    'image:secure_url': COLLECTION_LISTING.default_product_image?.src,
    'image:width': COLLECTION_LISTING.default_product_image?.width
  },
  title: `Collections - ${COLLECTION_LISTING.title}`,
  twitter: { image: COLLECTION_LISTING.default_product_image?.src }
})
