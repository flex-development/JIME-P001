import {
  ANYTHING,
  ProductResource,
  ProductVariantResource
} from '@flex-development/types'
import { useLineItemInput, useProductVariants } from '@system/hooks'
import { EventHandlers } from '@system/types'
import { uuid } from '@system/utils'
import { findIndex, isEmpty } from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { LineItemToAdd } from 'shopify-buy'
import {
  Button,
  Column,
  FlexBox,
  Form,
  FormProps,
  Image,
  ImageProps,
  Paragraph,
  Row,
  Select,
  TextArea
} from '../atoms'
import { LabeledFormControl } from '../molecules/LabeledFormControl'
import { ProductHeading } from '../molecules/ProductHeading'
import { Carousel } from './Carousel'

/**
 * @file Form allowing users to add products to their cart
 * @module components/organisms/AddToCartForm
 */

export interface AddToCartFormProps extends FormProps {
  /**
   * Form submission handler. If a submit handler isn't passed the result will
   * be logged to the console.
   */
  handleSubmit?(
    item: LineItemToAdd,
    event: EventHandlers.Click.Button
  ): ANYTHING

  /**
   * Fires when a product variant is selected.
   */
  handleVariant?(id: ProductVariantResource['id']): ANYTHING

  /**
   * Shopify product resource.
   */
  product: ProductResource
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
  const {
    handleSubmit = (item: LineItemToAdd, event: EventHandlers.Click.Button) => {
      event.preventDefault()
      console.log(`TODO: AddToCartForm.handleSubmit`, item)
    },
    handleVariant,
    product,
    ...rest
  } = props

  // Toggle styles based on product description length
  const no_description = isEmpty(product.description)

  // Use product variants as options
  const {
    options: product_variant_options,
    selectVariant,
    selected = {},
    variants
  } = useProductVariants(product.variants)

  // Initialize line item state
  // This object will be passed to props.addToCart if the fn is defined
  const { input: item, updateAttribute, updateQuantity } = useLineItemInput(
    selected.id
  )

  // Carousel position state
  const [position, setPosition] = useState<number>(0)

  // Update carousel position
  useEffect(() => {
    const pos = findIndex(variants, variant => variant.id === selected.id)
    setPosition(pos >= product.images.length ? 0 : pos)
  }, [product.images.length, selected, variants])

  return (
    <Form {...rest} className='add-to-cart-form'>
      <Row
        align={{ md: 'center' }}
        className='mw-100 pl-0-first pr-0-last'
        md={2}
        xs={1}
      >
        <Column mb={{ md: 0, xs: 36 }} md={4} xs>
          <Carousel position={position}>
            {product.images.map(({ alt, src }: ImageProps, i: number) => (
              <Image
                alt={alt ? alt : `${product.title} image ${i + 1}`}
                className='d-block w-100'
                key={uuid()}
                src={src}
              />
            ))}
          </Carousel>
        </Column>
        <Column md={8} xs>
          {/* Product title and variant price */}
          <ProductHeading
            mb={no_description ? 16 : 4}
            price={selected.price}
            title={product.title}
            size={2}
          />

          {/* Product description */}
          {!no_description && (
            <Paragraph className='form-text' mb={12}>
              {product.description}
            </Paragraph>
          )}

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
              onChange={({ target }: EventHandlers.Change.Select) => {
                selectVariant(target.value)
                if (handleVariant) handleVariant(target.value)
              }}
              options={product_variant_options}
              placeholder='Select an option'
              value={selected.id}
            />

            <LabeledFormControl
              control={{
                'aria-label': 'Product quantity',
                min: 0,
                onChange: ({
                  target: { value }
                }: EventHandlers.Change.Input) => {
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
          {product.title === 'KUSTOMZ' && (
            <Row fluid mt={16}>
              <TextArea
                aria-label='Kustom product description'
                onChange={({ target }: EventHandlers.Change.TextArea) => {
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
              aria-label='Add to cart'
              className='w-sm-auto w-100'
              disabled={!selected.available}
              name='add-to-cart'
              onClick={(event: EventHandlers.Click.Button) =>
                handleSubmit(item, event)
              }
              type='submit'
            />
          </FlexBox>
        </Column>
      </Row>
    </Form>
  )
}

AddToCartForm.displayName = 'AddToCartForm'

AddToCartForm.defaultProps = {}
