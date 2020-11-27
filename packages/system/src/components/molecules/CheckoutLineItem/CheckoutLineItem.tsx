import {
  ANYTHING,
  CheckoutLineItemDisplay,
  CheckoutLineItemInput
} from '@flex-development/types'
import { useCheckoutLineItemInput, useMutatedProps } from '@system/hooks'
import { EventHandlers } from '@system/types'
import React, { FC, Fragment } from 'react'
import { IProductImage } from 'shopify-api-node'
import {
  BoxProps,
  Button,
  Column,
  FlexBox,
  Image,
  Input,
  Paragraph,
  Span
} from '../../atoms'
import { LabeledFormControl } from '../LabeledFormControl'
import { ProductHeading } from '../ProductHeading'

/**
 * @file Display product checkout information
 * @module components/molecules/CheckoutLineItem/CheckoutLineItem
 */

export interface CheckoutLineItemProps extends BoxProps {
  /**
   * `onClick` handler that's fired when the user clicks the "REMOVE" button.
   */
  handleRemove?(event?: EventHandlers.Click.Button): ANYTHING

  /**
   * `onChange` handler that's fired when the user updates the line item
   * quantity.
   */
  handleUpdate?(
    updates: CheckoutLineItemInput,
    event?: EventHandlers.Change.Input
  ): ANYTHING

  /**
   * Variant display image.
   */
  image: Partial<IProductImage>

  /**
   * `ICheckoutLineItem` object display properties.
   */
  item: CheckoutLineItemDisplay
}

/**
 * Renders a `Box` component containing a product image, the product title,
 * selected variant, variant price, and quantity.
 *
 * The user will be able to update the product quantity, as well as remove the
 * item from their cart.
 *
 * **TODO**:
 *
 * - Calculate line item price with custom properties
 */
export const CheckoutLineItem: FC<CheckoutLineItemProps> = (
  props: CheckoutLineItemProps
) => {
  const {
    handleRemove = () => console.log(`TODO: CheckoutLineItem.handleRemove`),
    handleUpdate = () => console.log(`TODO: CheckoutLineItem.handleUpdate`),
    image,
    item,
    ...rest
  } = props

  // Get outer component properties
  const mutated = useMutatedProps<typeof rest>(rest, 'line-item')

  // Handle line item state
  const { input, updateQuantity } = useCheckoutLineItemInput(item)

  // Get parent product title
  const { 0: product_title, 1: variant_title } = item.title.split(' - ')

  return (
    <FlexBox {...mutated} id={item.key}>
      <Column mb={{ md: 0, xs: 24 }} md={3} xs={12}>
        <Image alt={image.alt || item.title} fluid src={image.src} />
      </Column>
      <Column pl={{ md: 24, xs: 0 }}>
        <ProductHeading
          className='line-item-heading'
          mb={0}
          price={input.quantity * JSON.parse(item.price)}
          size={3}
          title={product_title}
        />

        <Paragraph className='line-item-attribute' mb={24} mt={12}>
          {
            /* eslint-disable prettier/prettier */
            input.properties?.kpd ? (
              <Fragment>
                Kustom product description:&nbsp;
                <Span>{input.properties.kpd}</Span>
              </Fragment>
            ) : (
                'No Kustomizations.'
              )
            /* eslint-enable prettier/prettier */
          }
        </Paragraph>

        <FlexBox
          align={{ md: 'center' }}
          direction={{ md: 'row', xs: 'column' }}
          justify={{ md: 'between' }}
        >
          <FlexBox direction={{ sm: 'row', xs: 'column' }}>
            <Input
              className='line-item-title'
              name='title'
              readOnly
              value={variant_title}
            />

            <LabeledFormControl
              className='line-item-quantity'
              control={{
                'aria-label': 'Line item quantity',
                min: 1,
                name: 'quantity',
                onChange: (event: EventHandlers.Change.Input) => {
                  const new_quantity = JSON.parse(event.target.value)

                  const updated_item: CheckoutLineItemInput = {
                    price: input.price,
                    properties: input.properties,
                    quantity: new_quantity < 1 ? 1 : new_quantity,
                    variant_id: input.variant_id
                  }

                  updateQuantity(updated_item.quantity)

                  return handleUpdate(updated_item, event)
                },
                type: 'number',
                value: input.quantity
              }}
            >
              Quantity
            </LabeledFormControl>
          </FlexBox>

          <Button
            onClick={(event: EventHandlers.Click.Button) => handleRemove(event)}
            name='remove'
            mt={{ md: 0, xs: 24 }}
            px={20}
            value={item.key}
          >
            Remove
          </Button>
        </FlexBox>
      </Column>
    </FlexBox>
  )
}

CheckoutLineItem.displayName = 'CheckoutLineItem'

CheckoutLineItem.defaultProps = {}
