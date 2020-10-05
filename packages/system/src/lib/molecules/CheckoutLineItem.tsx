import { ANYTHING } from '@flex-development/kustomtypez'
import { useLineItemInput } from '@kustomz/hooks'
import { HTMLButtonClickEvent, HTMLInputChangeEvent } from '@kustomz/types'
import { sanitizeQuantity } from '@kustomz/utils'
import classnames from 'classnames'
import React, { FC, Fragment } from 'react'
import { AttributeInput, CustomAttribute, LineItem } from 'shopify-buy'
import { Box, BoxProps, Button, Image, Input, Paragraph, Span } from '../atoms'
import { LabeledInput } from './LabeledInput'
import { ProductHeading } from './ProductHeading'

/**
 * @file Display product checkout information
 * @module lib/molecules/CheckoutLineItem
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
  remove?(event?: HTMLButtonClickEvent): ANYTHING

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
  update?(item: AttributeInput, event?: HTMLInputChangeEvent): ANYTHING

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

  return (
    <Box {...rest} className={classnames('line-item', rest.className)}>
      <Box className='col-md-3 col-12 mb-md-0 mb-6'>
        <Image alt={`${title}`} fluid src={image.src as string} />
      </Box>
      <Box className='col pl-md-6 pl-0'>
        <ProductHeading
          className='line-item-heading'
          price={linePrice}
          size={3}
          title={title}
        />

        <Paragraph className='line-item-attribute'>
          {customAttributes[0]?.value ? (
            <Fragment>
              Kustom product description:&nbsp;
              <Span>{customAttributes[0]?.value}</Span>
            </Fragment>
          ) : (
            'No Kustomizations.'
          )}
        </Paragraph>

        <Box className='flex-md-row flex-md-spread flex-column' flex>
          <Box className='flex-sm-row flex-column' flex>
            <Input
              className='line-item-title'
              name='title'
              readOnly
              value={variantTitle}
            />

            <LabeledInput
              className='line-item-quantity'
              input={{
                'aria-label': 'Line item quantity',
                min: 0,
                name: 'quantity',
                onChange: (event: HTMLInputChangeEvent) => {
                  const updated_item: AttributeInput = {
                    quantity: sanitizeQuantity(event.target.value),
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
            </LabeledInput>
          </Box>

          <Button
            className='mt-md-0 mt-6 px-5'
            onClick={(e: HTMLButtonClickEvent) => remove(e.target.value)}
            name='remove'
            value={rest.id}
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

CheckoutLineItem.defaultProps = {
  quantity: 1
}
