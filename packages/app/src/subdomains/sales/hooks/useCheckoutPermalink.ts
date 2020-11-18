import { createError } from '@app/subdomains/app'
import {
  CheckoutLineItemDisplay,
  CheckoutPermalinkQuery
} from '@flex-development/types'
import { isEmpty } from 'lodash'
import qs from 'querystring'
import { useEffect, useState } from 'react'
import { useArray, UseArrayActions } from 'react-hanger/array/useArray'

/**
 * @file Create and update checkout URLs
 * @module subdomains/sales/hooks/useCheckoutPermalink
 * @see https://shopify.dev/tutorials/build-a-sales-channel-with-cart-permalinks
 */

/**
 * `useCheckoutPermalink` return type.
 */
export type UseCheckoutPermalink = {
  /**
   * Add a line item.
   */
  addItem: UseArrayActions<CheckoutLineItemDisplayWithId>['add']

  /**
   * Removes all line items.
   */
  clearItems: UseArrayActions<CheckoutLineItemDisplayWithId>['clear']

  /**
   * Checkout line items.
   */
  items: Array<CheckoutLineItemDisplayWithId>

  /**
   * Removes a single line item.
   */
  removeItem: UseArrayActions<CheckoutLineItemDisplayWithId>['removeById']

  /**
   * Updates the line items state.
   */
  setItems: UseArrayActions<CheckoutLineItemDisplayWithId>['setValue']

  /**
   * Updates a single line item.
   */
  updateItem: UseArrayActions<CheckoutLineItemDisplayWithId>['modifyById']

  /**
   * Checkout URL.
   */
  url: string
}

type CheckoutLineItemDisplayWithId = CheckoutLineItemDisplay & {
  id: CheckoutLineItemDisplay['key']
}

/**
 * Create and update checkout URLs.
 *
 * @param initialItems - Array of checkout line items
 * @param domain - Domain to use instead of `process.env.SHOPIFY_DOMAIN'
 * @returns Checkout URL
 * @throws {FeathersErrorJSON} If store domain is invalid
 */
export const useCheckoutPermalink = (
  initialItems: Array<CheckoutLineItemDisplay> = [],
  domain = process.env.SHOPIFY_DOMAIN
): UseCheckoutPermalink => {
  if (isEmpty(domain)) {
    const error = createError('Missing SHOPIFY_DOMAIN')
    throw error
  }

  // Add id property to line items
  initialItems = initialItems.map(item => ({ ...item, id: item.key }))

  // Handle checkout items state
  const [items, actions] = useArray<CheckoutLineItemDisplayWithId>(
    initialItems as Array<CheckoutLineItemDisplayWithId>
  )

  // Handle checkout permalink URL state
  const [url, setURL] = useState(`${domain}/cart/`)

  // Use line items to create checkout permalink query
  useEffect(() => {
    if (!items.length) return

    const path_query: CheckoutPermalinkQuery = {}
    const attr_qs_arr: Array<string> = []

    items.forEach(({ quantity, properties, variant_id }) => {
      path_query[variant_id] = quantity

      const attributes = properties || {}

      Object.keys(attributes).forEach(key => {
        attr_qs_arr.push(`attributes[${key}]=${attributes[key]}`)
      })
    })

    const base_url = `${domain}/cart/${qs.stringify(path_query, ',', ':')}`
    let attr_qs = ''

    if (attr_qs_arr.length) {
      attr_qs = `?${attr_qs_arr.reduce((prev, curr) => `${prev}&${curr}`)}`
    }

    setURL(`${base_url}${attr_qs}`)
  }, [domain, items, setURL])

  return {
    addItem: actions.add,
    clearItems: actions.clear,
    items,
    removeItem: actions.removeById,
    setItems: actions.setValue,
    updateItem: actions.modifyById,
    url
  }
}
