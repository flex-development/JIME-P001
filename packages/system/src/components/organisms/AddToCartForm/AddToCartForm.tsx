import { ANYTHING, CheckoutLineItemInput } from '@flex-development/types'
import {
  useActiveIndex,
  useCheckoutLineItemInput,
  useProductVariants
} from '@system/hooks'
import { EventHandlers } from '@system/types'
import { findIndex, isEmpty } from 'lodash'
import React, { FC } from 'react'
import { IProductListing, IProductListingVariant } from 'shopify-api-node'
import {
  Button,
  Column,
  FlexBox,
  Form,
  FormProps,
  Paragraph,
  Row,
  Select,
  TextArea
} from '../../atoms'
import { LabeledFormControl } from '../../molecules/LabeledFormControl'
import { ProductHeading } from '../../molecules/ProductHeading'
import { ProductImageCarousel } from '../ProductImageCarousel'

/**
 * @file Form allowing users to add products to their cart
 * @module components/organisms/AddToCartForm/AddToCartForm
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
    active: position = 0,
    handleSubmit = (
      item: CheckoutLineItemInput,
      event: EventHandlers.Click.Button
    ) => {
      event.preventDefault()
      console.log(`TODO: AddToCartForm.handleSubmit`, item)
    },
    handleVariant,
    product,
    ...rest
  } = props

  // Toggle styles based on product description length
  const no_description = isEmpty(product.body_html)

  // Use product variants as options
  const {
    options: product_variant_options,
    selectVariant,
    selected = {},
    variants
  } = useProductVariants(product.variants, position)

  // Initialize line item state
  // This object will be passed to props.addToCart if the fn is defined
  const {
    input: item,
    updateProperties,
    updateQuantity
  } = useCheckoutLineItemInput({
    price: selected.price,
    properties: null,
    quantity: 1,
    variant_id: selected.id
  })

  // Carousel position state
  const { active, setIndex: setCarouselPosition } = useActiveIndex(position, {
    upperLimit: product.images.length - 1
  })

  return (
    <Form {...rest} className='add-to-cart-form'>
      <Row
        align={{ md: 'center' }}
        className='mw-100 pl-0-first pr-0-last'
        md={2}
        xs={1}
      >
        <Column mb={{ md: 0, xs: 36 }} md={4} xs>
          <ProductImageCarousel
            images={product.images}
            position={active < 0 ? 0 : active}
            product_title={product.title}
            variants={product.variants}
          />
        </Column>
        <Column md={8} xs>
          {/* Product title and variant price */}
          <ProductHeading
            mb={no_description ? 16 : 4}
            price={item.quantity * selected.price}
            title={product.title}
            size={2}
          />

          {/* Product description */}
          {!no_description && (
            <Paragraph className='form-text' mb={12}>
              {product.body_html}
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
              name='variant_id'
              onChange={({ target }: EventHandlers.Change.Select) => {
                const variant_id = JSON.parse(target.value)
                const variant = variants.find(({ id }) => id === variant_id)

                const pos = findIndex(product.images, ({ id }) => {
                  return id === variant?.image_id
                })

                selectVariant(variant_id)
                setCarouselPosition(pos)

                if (handleVariant) handleVariant(variant_id)
              }}
              options={product_variant_options}
              placeholder='Select an option'
              value={selected.id}
            />

            <LabeledFormControl
              control={{
                'aria-label': 'Product quantity',
                min: 0,
                onChange: ({ target }: EventHandlers.Change.Input) => {
                  const value = JSON.parse(target.value)
                  return updateQuantity(value < 1 ? 1 : value)
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
                  return updateProperties({ [target.name]: target.value })
                }}
                name='kpd'
                placeholder='Describe your kustom ash or rolling tray'
                value={item.properties?.kpd}
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

AddToCartForm.defaultProps = {
  active: 0
}
