import type {
  AnyObject,
  NullishString
} from '@flex-development/json/utils/types'
import type {
  ICheckoutLineItem,
  ICollectionListing,
  IProductListing,
  IProductListingVariant
} from './shopify'

/**
 * @file Type Definitions - Storefront
 * @module types/storefront
 */

/**
 * Types of cart line items.
 */
export type CheckoutPermalinkInput =
  | CheckoutLineItemInput
  | CheckoutLineItemInputWithId

/**
 * Object representing a checkout permalink query object.
 */
export type CheckoutPermalinkQuery = Record<
  ICheckoutLineItem['variant_id'],
  ICheckoutLineItem['quantity']
>

/**
 * Object representing the fields needed to create a checkout.
 */
export type CheckoutLineItemInput = {
  price: IProductListingVariant['price']
  product: Omit<ProductListingData, 'body_html'>
  properties: AnyObject | null
  quantity: ICheckoutLineItem['quantity']
  variant_id: IProductListingVariant['id']
}

/**
 * `CheckoutLineItemInput` with a required `id` property.
 */
export type CheckoutLineItemInputWithId = CheckoutLineItemInput & {
  id: CheckoutLineItemInput['variant_id']
}

/**
 * Commonly used collection listing data.
 */
export type CollectionListingData = Pick<
  ICollectionListing,
  'body_html' | 'title'
>

/**
 * Commonly used product listing data.
 */
export type ProductListingData = Pick<
  IProductListing,
  'body_html' | 'handle' | 'images' | 'title' | 'variants'
>

/**
 * Object representing SEO data.
 */
export type SEOData = {
  /**
   * Description of the page in less than 150 characters.
   *
   * @default ''
   */
  description?: string

  /**
   * Comma-delimitted list of SEO keywords.
   *
   * @default ''
   */
  keywords?: string

  /**
   * Object containing Open Graph metadata.
   *
   * @default {}
   */
  og?: {
    category?: NullishString
    image?: NullishString
    'image:alt'?: NullishString
    'image:height'?: NullishString | number
    'image:secure_url'?: NullishString
    'image:width'?: NullishString | number
    'product:availability'?: NullishString
    'product:brand'?: NullishString
    'product:condition'?: NullishString
    'product:price:amount'?: NullishString
    'product:price:currency'?: NullishString
    'product:item_group_id'?: NullishString
    'product:retailer_item_id'?: NullishString
  }

  /**
   * A title is used on all pages (SEO: Google calculates the pixel width of the
   * characters used in the title, and it cuts off between 472 and 482 pixels.
   * The average character limit would be around 55-characters).
   *
   * The value `| Morena's Kustomz` will be appended to the title if defined.
   *
   * @default "Morena's Kustomz"
   */
  title?: string

  /**
   * Object containing Twitter social metadata.
   *
   * @default {}
   */
  twitter?: {
    [x: string]: NullishString | undefined

    card?: 'app' | 'player' | 'summary' | 'summary_large_image' | null
    creator?: string
    image?: string
    site?: string
  }
}
