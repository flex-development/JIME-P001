import { useEffect } from 'react'
import { useSetState } from 'react-hanger'
import { CustomAttribute, LineItemToAdd, ProductVariant } from 'shopify-buy'
import {
  useCustomAttributes,
  UseCustomAttributesActions
} from './useCustomAttributes'
import { useQuantity, UseQuantityActions } from './useQuantity'

/**
 * @file Specify the input fields to create a line item on a checkout
 * @module hooks/useLineItemInput
 */

/**
 * Functions to mutate `useLineItemInput` state.
 */
export type UseLineItemInputActions = UseCustomAttributesActions &
  UseQuantityActions

/**
 * Internal `useLineItemInput` state.
 */
export type UseLineItemInputState = {
  /**
   * ID, quantity, and custom attributes of the product variant to add to a
   * checkout.
   */
  input: LineItemToAdd & { customAttributes: CustomAttribute[] }
}

/**
 * `useLineItemInput` return type.
 */
export type UseLineItemInput = UseLineItemInputActions & UseLineItemInputState

/**
 * Specify the input fields to create a checkout line item.
 *
 * @see
 * https://shopify.dev/docs/storefront-api/reference/mutation/input-object/checkoutlineiteminput
 *
 * @param variantId - ID of the product variant to add to a checkout
 * @param initialQuantity - Initial number of variants to add
 * @param initialAttributes - Custom line item properties
 */
export const useLineItemInput = (
  variantId: ProductVariant['id'] = '',
  initialQuantity: LineItemToAdd['quantity'] = 1,
  initialAttributes: LineItemToAdd['customAttributes'] = []
): UseLineItemInput => {
  // Handle custom attributes
  const {
    customAttributes,
    removeAttribute,
    updateAttribute
  } = useCustomAttributes(initialAttributes)

  // Handle product quantity
  const { quantity, updateQuantity } = useQuantity(initialQuantity)

  // Initialize line item input state
  const initialInput = { customAttributes, quantity, variantId }

  const { state: input, setState: setInput } = useSetState<
    UseLineItemInputState['input']
  >(initialInput)

  // Update line item state
  useEffect(() => {
    setInput({ customAttributes, quantity, variantId })
  }, [customAttributes, quantity, setInput, variantId])

  return {
    input,
    removeAttribute,
    updateQuantity,
    updateAttribute
  }
}
