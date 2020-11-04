import { useLineItemInput, useMutatedProps } from '@system/hooks'
import { ANYTHING, EventHandlers } from '@system/types'
import React, { FC, Fragment } from 'react'
import { AttributeInput, CustomAttribute, LineItem } from 'shopify-buy'
import {
  BoxProps,
  Button,
  Column,
  FlexBox,
  Image,
  Input,
  Paragraph,
  Span
} from '../atoms'
import { LabeledFormControl } from './LabeledFormControl'
import { ProductHeading } from './ProductHeading'

/**
 * @file Display product checkout information
 * @module components/molecules/CheckoutLineItem
 */

/**
 * `CheckoutLineItem` component properties.
 */
export interface CheckoutLineItemProps extends BoxProps {
  /**
   * Additional line item properties.
   *
   * @default []
   */
  customAttributes?: CustomAttribute[]

  /**
   * Line item ID.
   */
  id: string

  /**
   * The total price of the line item.
   */
  linePrice: LineItem['linePrice']

  /**
   * Product variant image properties. If this attribute is undefined, a
   * placeholder image will be displayed instead.
   */
  image: Partial<LineItem['image']>

  /**
   * Number of variants to order.
   *
   * @default 1
   */
  quantity?: LineItem['quantity']

  /**
   * `onClick` handler that's fired when the user clicks the "REMOVE" button.
   *
   * @param event - `click` event from remove button
   * @param event.target - <button name="remove"> element
   * @param event.target.value - ID of the line item to remove
   */
  remove?(event?: EventHandlers.Click.Button): ANYTHING

  /**
   * Title of variant's parent product.
   */
  title: LineItem['title']

  /**
   * `onChange` handler that's fired when the user updates the line item
   * quantity.
   *
   * @param updates - Updated line item values
   * @param updates.key - Name of a custom attribute
   * @param updates.quantity - Number of variants to order
   * @param updates.value - Value of {@param updates.key}
   * @param updates.variantId - ID of the variant the
   * @param event - `change` event from quantity input
   */
  update?(item: AttributeInput, event?: EventHandlers.Change.Input): ANYTHING

  /**
   * ID of line item variant.
   */
  variantId: LineItem['variantId']

  /**
   * Title of the product variant to order.
   */
  variantTitle: LineItem['variantTitle']
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
 * - ? Allow users to update custom attributes for line item
 */
export const CheckoutLineItem: FC<CheckoutLineItemProps> = (
  props: CheckoutLineItemProps
) => {
  const {
    customAttributes = [],
    image,
    linePrice,
    quantity,
    remove = lineItemId => console.log(`Removed ${lineItemId}`),
    title,
    update = updates => {
      console.log(`Updated ${item.variantId}`, updates)
    },
    variantId,
    variantTitle,
    ...rest
  } = props

  // Initialize line item state
  const { input: item, updateQuantity } = useLineItemInput(
    variantId,
    quantity,
    customAttributes
  )

  const mutated = useMutatedProps<typeof rest>(rest, 'line-item')

  return (
    <FlexBox {...mutated}>
      <Column mb={{ md: 0, xs: 24 }} md={3} xs={12}>
        <Image alt={`${title}`} fluid src={image.src as string} />
      </Column>
      <Column pl={{ md: 24, xs: 0 }}>
        <ProductHeading
          className='line-item-heading'
          mb={0}
          price={linePrice}
          size={3}
          title={title}
        />

        <Paragraph className='line-item-attribute' mb={24} mt={12}>
          {
            /* eslint-disable prettier/prettier */
            customAttributes[0]?.value ? (
              <Fragment>
                Kustom product description:&nbsp;
                <Span>{customAttributes[0]?.value}</Span>
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
              value={variantTitle}
            />

            <LabeledFormControl
              className='line-item-quantity'
              control={{
                'aria-label': 'Line item quantity',
                min: 0,
                name: 'quantity',
                onChange: (event: EventHandlers.Change.Input) => {
                  const updated_item: AttributeInput = {
                    quantity: (event.target.value as unknown) as number,
                    variantId: item.variantId as string
                  }

                  updateQuantity(updated_item.quantity)

                  return update(updated_item, event)
                },
                type: 'number',
                value: item.quantity
              }}
            >
              Quantity
            </LabeledFormControl>
          </FlexBox>

          <Button
            onClick={(event: EventHandlers.Click.Button) => remove(event)}
            name='remove'
            mt={{ md: 0, xs: 24 }}
            px={20}
            value={rest.id}
          >
            Remove
          </Button>
        </FlexBox>
      </Column>
    </FlexBox>
  )
}

CheckoutLineItem.displayName = 'CheckoutLineItem'

CheckoutLineItem.defaultProps = {
  quantity: 1
}
