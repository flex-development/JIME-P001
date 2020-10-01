import { AnyObject, ANYTHING } from '@flex-development/kustomtypez'
import {
  HTMLButtonClickEvent,
  HTMLInputChangeEvent,
  HTMLSelectChangeEvent,
  HTMLTextAreaChangeEvent
} from '@kustomz/types'
import { findVariantByID } from '@kustomz/utils'
import React, { FC, useState } from 'react'
import { useSetState } from 'react-hanger'
import { LineItemToAdd, Product, ProductVariant } from 'shopify-buy'
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
   * `@param item - Line item to add to cart`
   * `@param event - `<button>` onClick event`
   */
  addToCart?(item: LineItemToAdd, event: HTMLButtonClickEvent): ANYTHING

  /**
   * Product description.
   *
   * @default ''
   */
  description: Product['description']

  /**
   * Array of product variant data.
   *
   * @default []
   */
  variants: ProductVariant[]
}

/**
 * Renders a form that allows users to add a product (variant) to their cart. To
 * be used in the `ProductTemplate` component.
 *
 * - https://shopify.dev/docs/storefront-api/reference/object/product
 * - https://shopify.dev/docs/storefront-api/reference/object/productvariant
 */
export const AddToCartForm: FC<AddToCartFormProps> = (
  props: AddToCartFormProps
) => {
  const { description, addToCart, variants: initialVariants, ...rest } = props

  // Initial variants state
  const [variants] = useState(initialVariants || [])

  // Get product variants as `OptionProps` for `<Select />` component
  const options = variants.map(({ available, id, title }: ProductVariant) => {
    return { 'data-available': available, label: title, value: id }
  })

  // Initialize selected variant state
  // The default option will be the first object in the array or null
  const [selected, setSelected] = useState<ProductVariant | AnyObject>(
    variants[0] || {}
  )

  // Initialize kustom product description state
  // ! Keep in sync with product title in Shopify
  const [kustom] = useState(selected.productTitle === 'KUSTOMZ')

  // Initialize line item state
  // This object will be passed to props.addToCart if the fn is defined
  const { state: item, setState: updateLineItem } = useSetState<LineItemToAdd>({
    customAttributes: [],
    quantity: 1,
    variantId: selected.id
  })

  /**
   * Updates the selected variant.
   *
   * @param event - `change` event from `<select>` element
   */
  const selectProductVariant = (event: HTMLSelectChangeEvent) => {
    let newVariant = findVariantByID(variants, event.target.value)

    if (newVariant?.id) {
      newVariant = newVariant as ProductVariant

      updateLineItem({ quantity: 1, variantId: newVariant.id })

      return setSelected(newVariant)
    }
  }

  /**
   * Updates the number of products to add to the cart.
   *
   * @param event - `change` event from `<input>` element
   */
  const updateQuantity = (event: HTMLInputChangeEvent) => {
    const { value } = event.target

    const quantity = JSON.parse(value || '0')

    return updateLineItem({ quantity: quantity < 0 ? 0 : quantity })
  }

  /**
   * Adds the `kustom` product description as a custom attribute.
   *
   * @param event - `change` event from `<textarea>` element
   */
  const addKustomDescription = (event: HTMLTextAreaChangeEvent) => {
    const { name: key, value } = event.target

    return updateLineItem({ customAttributes: [{ key, value }] })
  }

  /**
   * If an `addToCart` function was provided, the form state, a line item
   * object, will be passed to the function. The `click` event from form submit
   * button will also be passed.
   *
   * @param event - `click` event from submit button
   */
  const createLineItem = (event: HTMLButtonClickEvent) => {
    event.preventDefault && event.preventDefault()

    const log = process.env.NODE_ENV === 'production' ? 'debug' : 'log'

    console[log](`${selected.title} added to cart`, item)

    if (addToCart) return addToCart(item, event)
  }

  return (
    <Form {...rest} className='add-to-cart-form'>
      {/* Product title and variant price */}
      <ProductHeading
        price={selected.formattedPrice}
        title={selected.productTitle}
        size={2}
      />

      {/* Product description */}
      <Paragraph className='form-text mb-6'>{description}</Paragraph>

      {/* Main form control container */}
      <Box className='row-fluid col-12'>
        <Select
          aria-label='Product variant selection'
          data-selected={selected.title}
          name='variantId'
          onChange={selectProductVariant}
          options={options}
          placeholder='Select an option'
          value={selected.id}
        />

        <LabeledInput
          input={{
            'aria-label': 'Product quantity',
            min: 0,
            onChange: updateQuantity,
            type: 'number',
            value: item.quantity
          }}
        >
          Quantity
        </LabeledInput>
      </Box>

      {/* Only visible for "KUSTOMZ" product */}
      {kustom && (
        <Box className='row-fluid mt-3'>
          <TextArea
            aria-label='Kustom product description'
            onChange={addKustomDescription}
            name='kustom'
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
            onClick={createLineItem}
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
