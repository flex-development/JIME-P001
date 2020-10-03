import { isArray } from 'lodash'
import { useCallback } from 'react'
import useArray from 'react-hanger/array/useArray'
import { CustomAttribute } from 'shopify-buy'

/**
 * @file Add custom attributes to a product variant order
 * @module hooks/useCustomAttributes
 */


/**
 * Functions to mutate the `useCustomAttributes` state.
 * 
 * @see https://shopify.dev/docs/storefront-api/reference/object/attribute
 */
export type UseCustomAttributesActions = {
  /**
   * Adds or updates a custom attribute.
   * 
   * @param key - Name of the attribute
   * @param value - Value of the attribute
   */
  updateAttribute(key?: string, value?: string): void

  /**
   * Removes a custom attribute.
   * 
   * @param key - `key` of attribute to remove
   */
  removeAttribute(key?: string): void
}

/**
 * `useCustomAttributes` state.
 */
export type UseCustomAttributesState = {
  /**
   * Custom attributes to add a line item.
   */
  customAttributes: CustomAttribute[]
}

/**
 * `useCustomAttributes` return type.
 */
export type UseCustomAttributes =
  UseCustomAttributesActions
  & UseCustomAttributesState

/**
 * Add extra information about a line item.
 * 
 * @see
 * - https://shopify.dev/docs/storefront-api/reference/object/attribute
 * - https://shopify.dev/docs/storefront-api/reference/object/checkoutlineitem
 * 
 * @param initialAttributes - Initial state value
 */
export const useCustomAttributes = (
  initialAttributes: CustomAttribute[] = []
): UseCustomAttributes => {
  // If not an array, set to initial attributes to an empty []
  initialAttributes = isArray(initialAttributes) ? initialAttributes : []

  // Initialize state
  const [customAttributes, { push, setValue }] = useArray(initialAttributes)

  return {
    customAttributes,

    removeAttribute: useCallback((key: string) => {
      setValue(customAttributes.filter(attr => attr.key !== key))
    }, [customAttributes, setValue]),

    updateAttribute: useCallback((key: string, value: string) => {
      // Check if attribute with matching key exists
      const exists = customAttributes.find(attr => attr.key === key)

      // If it doesn't exist, add a new attribute
      if (!exists) return push({ key, value })

      // Filter state and add updated attribute to filtered array
      const filtered = customAttributes.filter(attr => attr.key !== exists.key)
      filtered.push({ key, value })

      // Update customAttributes state
      setValue(filtered)
    }, [customAttributes, push, setValue])
  }
}
