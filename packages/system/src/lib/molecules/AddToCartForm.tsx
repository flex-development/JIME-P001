import { ANYTHING, ProductVariantResource } from '@flex-development/kustomtypez'
import { useLineItemInput, useProductVariants } from '@kustomz/hooks'
import {
  HTMLButtonClickEvent,
  HTMLInputChangeEvent,
  HTMLSelectChangeEvent,
  HTMLTextAreaChangeEvent
} from '@kustomz/types'
import React, { FC } from 'react'
import { LineItemToAdd } from 'shopify-buy'
import {
  Box,
  Button,
  Form,
  FormProps,
  Paragraph,
  Select,
  TextArea
} from '../atoms'
import { LabeledInput } from './LabeledInput'
import { ProductHeading } from './ProductHeading'

/**
 * @file Form allowing users to add products to their cart
 * @module lib/molecules/AddToCartForm
 */

/**
 * AddToCartForm component properties.
 */
export interface AddToCartFormProps extends FormProps {
  /**
   * Form submission handler. If a submit handler isn't passed the result will
   * be logged to the console.
   *
   * @param item - Line item to add to cart
   * @param event - `<button>` onClick event
   */
  addToCart?(item: LineItemToAdd, event: HTMLButtonClickEvent): ANYTHING

  /**
   * Product description.
   *
   * @default ''
   */
  description?: string

  /**
   * Product title.
   *
   * @default ''
   */
  product_title: string

  /**
   * Array of product variant data.
   *
   * @default []
   */
  variants: ProductVariantResource[]
}

/**
 * Renders a form that allows users to add a product (variant) to their cart. To
 * be used in the `ProductTemplate` component.
 *
 * - https://shopify.dev/docs/storefront-api/reference/object/product
 * - https://shopify.dev/docs/storefront-api/reference/object/productvariant
 *
 * **TODO**:
 *
 * - Add `ImageCarousel` to display product images
 */
export const AddToCartForm: FC<AddToCartFormProps> = (
  props: AddToCartFormProps
) => {
  const {
    addToCart = (item: LineItemToAdd, event: HTMLButtonClickEvent) => {
      event.preventDefault()
      console.log(`${item.variantId} added to cart`, item)
    },
    description,
    product_title,
    variants: initialVariants,
    ...rest
  } = props

  // Use product variants as options
  const { options, selectVariant, selected = {} } = useProductVariants(
    initialVariants
  )

  // Initialize line item state
  // This object will be passed to props.addToCart if the fn is defined
  const { input: item, updateAttribute, updateQuantity } = useLineItemInput(
    selected.id
  )

  return (
    <Form {...rest} className='add-to-cart-form'>
      {/* Product title and variant price */}
      <ProductHeading price={selected.price} title={product_title} size={2} />

      {/* Product description */}
      <Paragraph className='form-text mb-6'>{description}</Paragraph>

      {/* Main form control container */}
      <Box className='row-fluid col-12'>
        <Select
          aria-label='Product variant selection'
          data-selected={selected.title}
          name='variantId'
          onChange={(e: HTMLSelectChangeEvent) => selectVariant(e.target.value)}
          options={options}
          placeholder='Select an option'
          value={selected.id}
        />

        <LabeledInput
          input={{
            'aria-label': 'Product quantity',
            min: 0,
            onChange: ({ target: { value } }: HTMLInputChangeEvent) => {
              return updateQuantity(value)
            },
            type: 'number',
            value: item.quantity
          }}
        >
          Quantity
        </LabeledInput>
      </Box>

      {/* Only visible for "KUSTOMZ" product - sync with Shopify */}
      {selected.productTitle === 'KUSTOMZ' && (
        <Box className='row-fluid mt-3'>
          <TextArea
            aria-label='Kustom product description'
            onChange={({ target }: HTMLTextAreaChangeEvent) => {
              return updateAttribute(target.name, target.value)
            }}
            name='kpd'
            placeholder='Describe your kustom ash or rolling tray'
            value={item.customAttributes?.[0]?.value}
          />
        </Box>
      )}

      {/* Add to cart button container */}
      <Box className='row-fluid mt-6'>
        <Box className='col-sm-3 col-12 float-right'>
          <Button
            aria-label='Add product to cart'
            className='float-sm-right w-sm-auto w-100'
            disabled={!selected.available}
            onClick={(event: HTMLButtonClickEvent) => addToCart(item, event)}
            type='submit'
          />
        </Box>
      </Box>
    </Form>
  )
}

AddToCartForm.defaultProps = {
  description: '',
  variants: []
}
