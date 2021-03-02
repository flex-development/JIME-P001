import type { ANYTHING } from '@flex-development/json'
import type {
  CheckoutLineItemInput,
  IProductListing,
  IProductListingVariant
} from '@kustomzcore/types'
import type { FormProps } from '@system/lib/atoms/Form'
import type { EventHandlers } from '@system/types'

/**
 * @file Component Props - AddToCartForm
 * @module lib/molecules/AddToCartForm/props
 */

export interface AddToCartFormProps extends FormProps {
  /**
   * Index position of the carousel slide to display first.
   *
   * @default 0
   */
  active?: number

  /**
   * Form submission handler. If a submit handler isn't passed the result will
   * be logged to the console.
   */
  handleSubmit?(
    item: CheckoutLineItemInput,
    event: EventHandlers.Click.Button
  ): ANYTHING

  /**
   * Fires when a product variant is selected.
   */
  handleVariant?(id: IProductListingVariant['id']): ANYTHING

  /**
   * Shopify product listing resource.
   */
  product: IProductListing
}
