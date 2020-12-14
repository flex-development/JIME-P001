import { AnyObject, NullishString } from '@flex-development/json'
import { ICheckoutLineItem } from 'shopify-api-node'

/**
 * @file Type Declarations - Shopify
 * @module types/shopify
 */

/**
 * Shopping cart context state.
 */
export type CartContextState = {
  items: Array<CheckoutLineItemInput>
  items_total: number
  removeItem: (variant_id: number | string) => void
  upsertItem: (data: CheckoutPermalinkInput) => void
  url: string
}

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
 * Object representing the fields needed to display a checkout line item.
 */
export type CheckoutLineItemDisplay = Pick<
  ICheckoutLineItem,
  'price' | 'quantity' | 'title' | 'variant_id'
> & { properties: AnyObject | null }

/**
 * Object representing the fields needed to create a checkout.
 */
export type CheckoutLineItemInput = {
  data: CheckoutLineItemDisplay
  image: { alt?: NullishString; id?: string; src?: string }
}

export type CheckoutLineItemInputWithId = CheckoutLineItemInput & {
  id: CheckoutLineItemInput['data']['variant_id']
}
