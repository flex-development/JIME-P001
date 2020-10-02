import { ANYTHING } from '@flex-development/kustomtypez'
import { HTMLButtonClickEvent } from '@kustomz/types'
import classnames from 'classnames'
import React, { FC, Fragment } from 'react'
import { CustomAttribute } from 'shopify-buy'
import {
  Box,
  BoxProps,
  Button,
  Image,
  ImageProps,
  Input,
  Paragraph,
  Span
} from '../atoms'
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
   * Price of variant, formatted according to shop currency format string. For
   * example, "$10.00".
   */
  formattedPrice: string

  /**
   * Product variant image properties. If this attribute is undefined, a
   * placeholder image will be displayed instead.
   */
  image?: ImageProps

  /**
   * Title of variant's parent product.
   */
  productTitle: string

  /**
   * Number of variants to order. If `0`, the line item will be hidden.
   * 
   * @default 1
   */
  quantity?: number

  /**
   * `onClick` handler to pass to the remove button. The ID of the variant to
   * remove, as well as the `click` event, will be passed to the function.
   * 
   * When a variant is removed, it's quantity will be set to 0 and the item will
   * disappear.
   * 
   * `@param variantId - ID of variant to remove`
   * `@param event - click event from remove button`
   */
  remove?(variantId: string | number, event: HTMLButtonClickEvent): ANYTHING

  /**
   * Title of the product variant to order.
   */
  title: string

  /**
   * ID of line item variant.
   */
  variantId: string | number
}

/**
 * Renders a `Box` component containing a product or product variant image, the
 * product title, selected variant, variant price, and quantity.
 *
 * The user will be able to update the product quantity, as well as remove the
 * item from their cart.
 * 
 * **TODO**:
 * 
 * - Handle product quantity update
 * - Reset state and hide output when "remove" button is clicked
 */
export const CheckoutLineItem: FC<CheckoutLineItemProps> = (
  props: CheckoutLineItemProps
) => {
  const {
    customAttributes = [],
    formattedPrice,
    image = {} as ImageProps,
    productTitle,
    quantity,
    remove = (id) => console.info(`Removed ${id}`),
    title,
    variantId,
    ...rest
  } = props

  rest.className = classnames('line-item', rest.className)
  image.className = classnames('line-item-img', image.className)

  return (
    <Box {...rest} id={`${variantId}`}>
      <Box className='col-md-3 col-12 mb-md-0 mb-6'>
        <Image {...image as ImageProps} fluid />
      </Box>
      <Box className='col pl-md-6 pl-0'>
        <ProductHeading
          className='line-item-heading'
          price={formattedPrice}
          size={3}
          title={productTitle}
        />

        <Paragraph className='line-item-attribute'>
          {
            customAttributes[0]?.value
              ? (
                <Fragment>
                  Kustom product description:&nbsp;
                  <Span>{customAttributes[0]?.value}</Span>
                </Fragment>
              )
              : 'No Kustomizations.'
          }
        </Paragraph>

        <Box className='flex-md-row flex-md-spread flex-column' flex>
          <Box className='flex-sm-row flex-column' flex>
            <Input
              className='line-item-title'
              name='title'
              readOnly
              value={title}
            />

            <LabeledInput
              className='line-item-quantity'
              input={{
                'aria-label': 'Line item quantity',
                min: 0,
                name: 'quantity',
                readOnly: true,
                type: 'number',
                value: quantity
              }}
            >
              Quantity
            </LabeledInput>
          </Box>

          <Button
            className='mt-md-0 mt-6 px-5'
            onClick={(event: HTMLButtonClickEvent) => remove(variantId, event)}
            name='remove'
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

CheckoutLineItem.defaultProps = {
  image: {
    alt: 'Product placeholder image',
    src: 'https://cdn.shopify.com/s/files/1/0470/4790/1339/files/img-placeholder.png?v=1601594431'
  },
  quantity: 1
}
