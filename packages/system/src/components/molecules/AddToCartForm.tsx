import { useLineItemInput, useProductVariants } from '@system/hooks'
import { ANYTHING, Events, ProductVariantResource } from '@system/types'
import React, { FC } from 'react'
import { LineItemToAdd } from 'shopify-buy'
import {
  Button,
  FlexBox,
  Form,
  FormProps,
  Paragraph,
  Row,
  Select,
  TextArea
} from '../atoms'
import { LabeledFormControl } from './LabeledFormControl'
import { ProductHeading } from './ProductHeading'

/**
 * @file Form allowing users to add products to their cart
 * @module components/molecules/AddToCartForm
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
  addToCart?(item: LineItemToAdd, event: Events.Click.Button): ANYTHING

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
    addToCart = (item: LineItemToAdd, event: Events.Click.Button) => {
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
      <ProductHeading
        mb={12}
        price={selected.price}
        title={product_title}
        size={2}
      />

      {/* Product description */}
      <Paragraph className='form-text' mb={24}>
        {description}
      </Paragraph>

      {/* Main form control container */}
      <FlexBox
        align={{ sm: 'center' }}
        direction={{ sm: 'row', xs: 'column' }}
        justify={{ sm: 'between' }}
      >
        <Select
          aria-label='Product variant selection'
          data-selected={selected.title}
          name='variantId'
          onChange={(e: Events.Change.Select) => selectVariant(e.target.value)}
          options={options}
          placeholder='Select an option'
          value={selected.id}
        />

        <LabeledFormControl
          control={{
            'aria-label': 'Product quantity',
            min: 0,
            onChange: ({ target: { value } }: Events.Change.Input) => {
              return updateQuantity(value)
            },
            type: 'number',
            value: item.quantity
          }}
        >
          Quantity
        </LabeledFormControl>
      </FlexBox>

      {/* Only visible for "KUSTOMZ" product - sync with Shopify */}
      {product_title === 'KUSTOMZ' && (
        <Row mt={12}>
          <TextArea
            aria-label='Kustom product description'
            onChange={({ target }: Events.Change.TextArea) => {
              return updateAttribute(target.name, target.value)
            }}
            name='kpd'
            placeholder='Describe your kustom ash or rolling tray'
            value={item.customAttributes?.[0]?.value}
          />
        </Row>
      )}

      {/* Add to cart button container */}
      <FlexBox align='center' justify='end' mt={24}>
        <Button
          aria-label='Add product to cart'
          className='w-sm-auto w-100'
          disabled={!selected.available}
          onClick={(event: Events.Click.Button) => addToCart(item, event)}
          type='submit'
        />
      </FlexBox>
    </Form>
  )
}

AddToCartForm.defaultProps = {
  description: '',
  variants: []
}
