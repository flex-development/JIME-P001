import type {
  IProductImage,
  IProductListing,
  IProductListingVariant,
  SEOData
} from '@flex-development/kustomzcore/types'
import { stripHtml } from 'string-strip-html'

/**
 * @file Test Fixture - Product Listing
 * @module lib/mixins/SEO/tests/fixtures/product-listing
 */

export const PRODUCT_LISTING: IProductListing = {
  available: true,
  body_html:
    '<meta charset="utf-8"><span data-mce-fragment="1">Pork belly etsy swag unicorn, tumblr tattooed kombucha vaporware. Dolore adipisicing narwhal shaman, pug butcher enim unicorn.</span>',
  created_at: '2021-02-04T15:48:01-05:00',
  handle: 'ash-tray',
  images: [
    {
      created_at: '2021-02-04T15:48:04-05:00',
      height: 2048,
      id: 25036244484251,
      position: 1,
      product_id: 6147082092699,
      src:
        'https://cdn.shopify.com/s/files/1/0470/4790/1339/products/ash-tray-funfetti.jpg?v=1612471684',
      updated_at: '2021-02-04T15:48:04-05:00',
      variant_ids: [37881390760091, 37881391317147],
      width: 2048
    },
    {
      created_at: '2021-02-04T15:48:04-05:00',
      height: 2048,
      id: 25036244549787,
      position: 2,
      product_id: 6147082092699,
      src:
        'https://cdn.shopify.com/s/files/1/0470/4790/1339/products/ash-tray-jelly-slides.jpg?v=1612471684',
      updated_at: '2021-02-04T15:48:04-05:00',
      variant_ids: [37881390825627, 37881391349915],
      width: 2048
    }
  ],
  options: [
    {
      id: 7775932154011,
      name: 'Size',
      position: 2,
      product_id: 6147082092699,
      values: ['standard', 'travel']
    },
    {
      id: 7775932186779,
      name: 'Style',
      position: 1,
      product_id: 6147082092699,
      values: ['FUNFETTI', 'JELLY $LIDES', 'LA $ONRISA']
    }
  ],
  product_id: 6147082092699,
  product_type: 'Ash Trays',
  published_at: '2021-02-04T15:48:16-05:00',
  tags: 'meditation,stumptown,chartreuse',
  title: 'Ash Tray',
  updated_at: '2021-02-04T17:51:28-05:00',
  variants: [
    {
      available: false,
      barcode: '',
      compare_at_price: null,
      created_at: '2021-02-04T15:48:01-05:00',
      formatted_price: '$10.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37881390956699,
      image_id: null,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 0,
      option_values: [
        {
          name: 'Size',
          option_id: 7775932154011,
          value: 'standard'
        },
        {
          name: 'Style',
          option_id: 7775932186779,
          value: 'LA $ONRISA'
        }
      ],
      position: 5,
      price: '10.00',
      requires_shipping: true,
      sku: 'ash-tray-la-sonrisa',
      taxable: true,
      title: 'LA $ONRISA / standard',
      updated_at: '2021-02-04T17:51:09-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: false,
      barcode: '',
      compare_at_price: null,
      created_at: '2021-02-04T15:48:01-05:00',
      formatted_price: '$5.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37881391317147,
      image_id: 25036244484251,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 0,
      option_values: [
        {
          name: 'Size',
          option_id: 7775932154011,
          value: 'travel'
        },
        {
          name: 'Style',
          option_id: 7775932186779,
          value: 'FUNFETTI'
        }
      ],
      position: 2,
      price: '5.00',
      requires_shipping: true,
      sku: 'ash-tray-funfetti-travel',
      taxable: true,
      title: 'FUNFETTI / travel',
      updated_at: '2021-02-04T17:51:28-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: false,
      barcode: '',
      compare_at_price: null,
      created_at: '2021-02-04T15:48:01-05:00',
      formatted_price: '$5.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37881391349915,
      image_id: 25036244549787,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 0,
      option_values: [
        {
          name: 'Size',
          option_id: 7775932154011,
          value: 'travel'
        },
        {
          name: 'Style',
          option_id: 7775932186779,
          value: 'JELLY $LIDES'
        }
      ],
      position: 4,
      price: '5.00',
      requires_shipping: true,
      sku: 'ash-tray-jelly-slides-travel',
      taxable: true,
      title: 'JELLY $LIDES / travel',
      updated_at: '2021-02-04T17:51:28-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: false,
      barcode: '',
      compare_at_price: null,
      created_at: '2021-02-04T15:48:01-05:00',
      formatted_price: '$5.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37881391382683,
      image_id: null,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 0,
      option_values: [
        {
          name: 'Size',
          option_id: 7775932154011,
          value: 'travel'
        },
        {
          name: 'Style',
          option_id: 7775932186779,
          value: 'LA $ONRISA'
        }
      ],
      position: 6,
      price: '5.00',
      requires_shipping: true,
      sku: 'ash-tray-la-sonrisa-travel',
      taxable: true,
      title: 'LA $ONRISA / travel',
      updated_at: '2021-02-04T17:51:28-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2021-02-04T15:48:01-05:00',
      formatted_price: '$10.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37881390760091,
      image_id: 25036244484251,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 15,
      option_values: [
        {
          name: 'Size',
          option_id: 7775932154011,
          value: 'standard'
        },
        {
          name: 'Style',
          option_id: 7775932186779,
          value: 'FUNFETTI'
        }
      ],
      position: 1,
      price: '10.00',
      requires_shipping: true,
      sku: 'ash-tray-funfetti',
      taxable: true,
      title: 'FUNFETTI / standard',
      updated_at: '2021-02-04T17:51:07-05:00',
      weight: 0,
      weight_unit: 'lb'
    },
    {
      available: true,
      barcode: '',
      compare_at_price: null,
      created_at: '2021-02-04T15:48:01-05:00',
      formatted_price: '$10.00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37881390825627,
      image_id: 25036244549787,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 15,
      option_values: [
        {
          name: 'Size',
          option_id: 7775932154011,
          value: 'standard'
        },
        {
          name: 'Style',
          option_id: 7775932186779,
          value: 'JELLY $LIDES'
        }
      ],
      position: 3,
      price: '10.00',
      requires_shipping: true,
      sku: 'ash-tray-jelly-slides',
      taxable: true,
      title: 'JELLY $LIDES / standard',
      updated_at: '2021-02-04T17:51:08-05:00',
      weight: 0,
      weight_unit: 'lb'
    }
  ],
  vendor: 'MorenasKustomz'
}

const PRODUCT_LISTING_IMAGE = PRODUCT_LISTING.images[0]

const PRODUCT_LISTING_ACTIVE = 1

export const PRODUCT_LISTING_VARIANT: IProductListingVariant =
  PRODUCT_LISTING.variants[PRODUCT_LISTING_ACTIVE]

const PRODUCT_LISTING_VARIANT_IMAGE = PRODUCT_LISTING.images.find(image => {
  return image.id === PRODUCT_LISTING_VARIANT.image_id
}) as IProductImage

export const PRODUCT_LISTING_NO_VARIANTS_SEO = {
  description: stripHtml(PRODUCT_LISTING.body_html.trim()).result,
  keywords: 'meditation,stumptown,chartreuse',
  og: {
    image: PRODUCT_LISTING_IMAGE.src,
    'image:alt': PRODUCT_LISTING_IMAGE.alt,
    'image:height': PRODUCT_LISTING_IMAGE.height,
    'image:secure_url': PRODUCT_LISTING_IMAGE.src,
    'image:width': PRODUCT_LISTING_IMAGE.width
  },
  'product:availability': `${PRODUCT_LISTING.available}`,
  'product:brand': PRODUCT_LISTING.vendor,
  'product:condition': 'new',
  'product:price:currency': 'USD',
  title: PRODUCT_LISTING.title,
  twitter: {
    card: 'summary',
    image: PRODUCT_LISTING_VARIANT_IMAGE.src
  }
} as SEOData

export const PRODUCT_LISTING_SEO = {
  description: stripHtml(PRODUCT_LISTING.body_html.trim()).result,
  keywords: 'meditation,stumptown,chartreuse',
  og: {
    image: PRODUCT_LISTING_VARIANT_IMAGE.src,
    'image:alt': `${PRODUCT_LISTING.title} - ${PRODUCT_LISTING_VARIANT.title}`,
    'image:height': PRODUCT_LISTING_VARIANT_IMAGE.height,
    'image:secure_url': PRODUCT_LISTING_VARIANT_IMAGE.src,
    'image:width': PRODUCT_LISTING_VARIANT_IMAGE.width,
    'product:price:amount': PRODUCT_LISTING_VARIANT.price
  },
  'product:availability': `${PRODUCT_LISTING_VARIANT.available}`,
  'product:brand': PRODUCT_LISTING.vendor,
  'product:condition': 'new',
  'product:price:currency': 'USD',
  title: `${PRODUCT_LISTING.title} - ${PRODUCT_LISTING_VARIANT.title}`,
  twitter: {
    card: 'summary',
    image: PRODUCT_LISTING_VARIANT_IMAGE.src
  }
} as SEOData
