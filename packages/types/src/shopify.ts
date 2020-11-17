import { ICheckoutLineItem } from 'shopify-api-node'
import { AnyObject } from './utils'

/**
 * @file Type Declarations - Shopify
 * @module lib/shopify
 */

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
  'quantity' | 'variant_id'
> & { properties: AnyObject | null }
