import {
  CheckoutLineItemInput,
  CheckoutPermalinkInput,
  CheckoutPermalinkQuery
} from '@flex-development/kustomzcore'
import { getSubtotal } from '@subdomains/sales/utils'
import { omit } from 'lodash'
import qs from 'querystring'
import { useCallback, useEffect, useState } from 'react'
import { useArray, UseArrayActions } from 'react-hanger/array/useArray'

/**
 * @file Create and update checkout URLs
 * @module subdomains/sales/hooks/useCheckoutPermalink/impl
 * @see https://shopify.dev/tutorials/build-a-sales-channel-with-inputs-permalinks
 */

/**
 * `useCheckoutPermalink` return type.
 */
export type UseCheckoutPermalink = {
  /**
   * Checkout line items.
   */
  items: Array<CheckoutLineItemInput>

  /**
   * Removes a checkout line item.
   *
   * @param id - ID of variant to remove
   */
  removeItem: UseArrayActions<CheckoutPermalinkInput>['removeById']

  /**
   * Order subtotal, not including the price of custom line item properties.
   */
  subtotal: number

  /**
   * Adds or updates a checkout line item.
   */
  upsertItem: (data: CheckoutPermalinkInput) => void

  /**
   * Checkout URL.
   */
  url: string
}

/**
 * Create and update checkout URLs.
 *
 * @param inputs - Array of checkout line items
 * @returns Checkout URL
 * @throws {FeathersErrorJSON} If store domain is invalid
 */
export const useCheckoutPermalink = (
  inputs: Array<CheckoutPermalinkInput> = []
): UseCheckoutPermalink => {
  // Add id property to line items
  inputs = inputs.map(input => ({ ...input, id: input.data.variant_id }))

  // Handle checkout items state
  const [items, actions] = useArray<CheckoutPermalinkInput>(inputs)

  // Handle checkout permalink URL state
  const [url, setURL] = useState(`/checkouts`)

  // Use line items to create checkout permalink query
  useEffect(() => {
    if (!items.length) return

    const path_query: CheckoutPermalinkQuery = {}
    const attr_qs_arr: Array<string> = []

    items.forEach(({ data: { quantity, properties, variant_id } }) => {
      path_query[variant_id] = quantity

      const attributes = properties || {}

      Object.keys(attributes).forEach(key => {
        attr_qs_arr.push(`attributes[${key}]=${attributes[key]}`)
      })
    })

    const base_url = `/checkouts/${qs.stringify(path_query, ',', ':')}`
    let attr_qs = ''

    if (attr_qs_arr.length) {
      attr_qs = `?${attr_qs_arr.reduce((prev, curr) => `${prev}&${curr}`)}`
    }

    setURL(`${base_url}${attr_qs}`)
  }, [items, setURL])

  /**
   * Adds an items to the user's inputs. If a line item already exists, it's
   * quantity and properties will be updated.
   *
   * @param data - Line item to add
   */
  const upsertItem = (data: CheckoutPermalinkInput) => {
    if (items.find(item => item.data.variant_id === data.data.variant_id)) {
      actions.modifyById(data.data.variant_id, data)
    } else {
      actions.add(data)
    }
  }

  return {
    items: items.map(item => omit(item, ['id']) as CheckoutLineItemInput),
    removeItem: actions.removeById,
    subtotal: getSubtotal(items),
    upsertItem: useCallback(upsertItem, [actions, items]),
    url
  }
}
