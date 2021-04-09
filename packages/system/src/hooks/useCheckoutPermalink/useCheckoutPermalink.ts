import { CHECKOUT_BASE_URL } from '@core/config/constants'
import type {
  CheckoutLineItemInput,
  CheckoutPermalinkInput,
  CheckoutPermalinkQuery
} from '@core/types'
import type { NumberString } from '@flex-development/kustomzcore'
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
  items: CheckoutLineItemInput[]

  /**
   * Removes a checkout line item.
   *
   * @param {NumberString} id - ID of variant to remove
   */
  removeItem: (id: NumberString) => void

  /**
   * Updates the checkout line items state.
   *
   * @param {CheckoutPermalinkInput[]} items - New checkout line items
   */
  setItems: (items: CheckoutPermalinkInput[]) => void

  /**
   * Adds or updates a checkout line item.
   *
   * @param {CheckoutPermalinkInput} data - Line item to add
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
 * @param {CheckoutPermalinkInput[]} [inputs] - Array of checkout line items
 * @return {UseCheckoutPermalink} Hook state
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
     * @param {CheckoutPermalinkInput[]} data - Array of line items
     * @return {CheckoutPermalinkInput[]} Normalized data array
     */
    const normalize = (data: typeof _inputs): typeof _inputs => {
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
   * @param {CheckoutPermalinkInput} data - Line item to add
   * @return {void}
   */
  const upsertItem = (data: CheckoutPermalinkInput): void => {
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
   * @param {NumberString} id - ID of product variant to remove
   * @return {void}
   */
  const removeItem = (id: NumberString): void => {
    return actions.removeById(typeof id === 'string' ? JSON.parse(id) : id)
  }

  /* Callback version of `removeItem` */
  const removeItemCB = useCallback(removeItem, [actions])

  /**
   * Updates the checkout line items state.
   *
   * @param {CheckoutPermalinkInput[]} items - New checkout line items
   * @return {void}
   */
  const setItems = (items: CheckoutPermalinkInput[]): void => {
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
