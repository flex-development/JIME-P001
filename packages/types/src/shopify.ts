import { ICheckoutLineItem } from 'shopify-api-node'
import { AnyObject } from './utils'

/**
 * @file Type Declarations - Shopify
 * @module lib/shopify
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
 * Object representing the fields needed to display a checkout line item.
 */
export type CheckoutLineItemDisplay = Pick<
  ICheckoutLineItem,
  'key' | 'price' | 'quantity' | 'title' | 'variant_id'
> & { properties: CheckoutLineItemInput['properties'] }

/**
 * Object representing the fields needed to create a checkout.
 */
export type CheckoutLineItemInput = Pick<
  ICheckoutLineItem,
  'price' | 'quantity' | 'variant_id'
> & { properties: AnyObject | null }

export type CheckoutLineItemInputWithId = CheckoutLineItemInput & {
  id: CheckoutLineItemInput['variant_id']
}
