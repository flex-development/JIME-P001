import { CHECKOUT_BASE_URL } from '@kustomzcore/constants'
import type {
  CheckoutLineItemInput,
  CheckoutPermalinkInput,
  CheckoutPermalinkQuery
} from '@kustomzcore/types'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import omit from 'lodash/omit'
import qs from 'querystring'
import { useCallback, useEffect, useState } from 'react'
import { useArray } from 'react-hanger/array/useArray'

/**
 * @file Create and update checkout URLs
 * @module hooks/useCheckoutPermalink/impl
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
  removeItem: (id: number | string) => void

  /**
   * Updates the checkout line items state.
   *
   * @param items - New checkout line items
   */
  setItems: (items: CheckoutPermalinkInput[]) => void

  /**
   * Adds or updates a checkout line item.
   *
   * @param data - Line item to add
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
 * @return Checkout URL
 * @throws {FeathersErrorJSON} If store domain is invalid
 */
export const useCheckoutPermalink = (
  inputs: CheckoutPermalinkInput[] = []
): UseCheckoutPermalink => {
  // Handle incoming input
  const _inputs = useMemoCompare<CheckoutPermalinkInput[]>(inputs)

  // Handle checkout items state
  const [items, actions] = useArray<CheckoutPermalinkInput>(_inputs)

  // Handle checkout permalink URL state
  const [url, setURL] = useState(CHECKOUT_BASE_URL)

  // Normalize checkout line item input data
  useEffect(() => {
    /**
     * Adds an `id` property to each line item in {@param data}.
     *
     * @param data - Array of line items
     */
    const normalize = (data: typeof _inputs) => {
      return data.map(input => ({ ...input, id: input.variant_id }))
    }

    actions.setValue(normalize(_inputs))
  }, [_inputs, actions])

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
    const variant = items.find(item => {
      return item.variant_id === data.variant_id
    })

    if (variant) {
      data.quantity = variant.quantity + (variant.quantity - data.quantity) * -1
      actions.modifyById(data.variant_id, data)
    } else {
      actions.add(data)
    }
  }

  /* Callback version of `upsertItem` */
  const upsertItemCB = useCallback(upsertItem, [actions, items])

  /**
   * Removes an items from the user's cart.
   *
   * @param id - ID of product variant to remove
   */
  const removeItem = (id: number | string) => {
    return actions.removeById(typeof id === 'string' ? JSON.parse(id) : id)
  }

  /* Callback version of `removeItem` */
  const removeItemCB = useCallback(removeItem, [actions])

  /**
   * Updates the checkout line items state.
   *
   * @param items - New checkout line items
   */
  const setItems = (items: CheckoutPermalinkInput[]) => {
    return actions.setValue(items)
  }

  /* Callback version of `setItems` */
  const setItemsCB = useCallback(setItems, [actions])

  return {
    items: items.map(item => omit(item, ['id']) as CheckoutLineItemInput),
    removeItem: removeItemCB,
    setItems: setItemsCB,
    upsertItem: upsertItemCB,
    url
  }
}
