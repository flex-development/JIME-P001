import { CheckoutLineItemInput } from '@flex-development/kustomzcore'
import { useCheckoutLineItemInput, useSanitizedProps } from '@system/hooks'
import {
  Box,
  BoxProps,
  Button,
  Form,
  Image,
  Input,
  Paragraph,
  ProductHeading,
  Span
} from '@system/lib/atoms'
import { EventHandlers } from '@system/types'
import { FC, ReactNode, useCallback } from 'react'
import { FormField } from '../FormField'
import { CheckoutLineItemProps } from './CheckoutLineItem.props'

/**
 * @file Implementation - CheckoutLineItem
 * @module lib/molecules/CheckoutLineItem/impl
 */

/**
 * Displays checkout information for a product. The product image, product
 * title, selected variant, variant price, and quantity will be shown.
 *
 * The user will be able to update the product quantity, as well as remove the
 * item from their cart.
 *
 * Renders a `Box` component with class `checkout-line-item`.
 *
 * **TODO**:
 *
 * - Calculate line item price with custom properties
 */
export const CheckoutLineItem: FC<CheckoutLineItemProps> & {
  QUANTITY_LABEL: string
} = (props: CheckoutLineItemProps) => {
  const {
    data,
    handleRemove = () => console.log(`TODO: CheckoutLineItem.handleRemove`),
    handleUpdate = () => console.log(`TODO: CheckoutLineItem.handleUpdate`),
    image,
    ...rest
  } = props

  // Get component properties
  const sanitized = useSanitizedProps<'div', BoxProps>(
    { ...rest, id: `line-item-${data.variant_id}` },
    'checkout-line-item'
  )

  // Handle line item state
  const { item, updateQuantity } = useCheckoutLineItemInput({ data, image })

  // Get parent product title
  const { 0: product_title, 1: variant_title } = data.title.split(' - ')

  /**
   * Updates the number of line items to purchase.
   *
   * @param event - `change` event from `<input>` element
   */
  const onChangeQuantity = (event: EventHandlers.Change.Input) => {
    let quantity = JSON.parse(event.target.value)
    quantity = quantity < 1 ? 1 : quantity

    const updates: CheckoutLineItemInput = {
      data: { ...item.data, quantity },
      image
    }

    updateQuantity(updates.data.quantity)
    return handleUpdate(updates, event)
  }

  /* Callback version of `onChangeQuantity` */
  const onChangeQuantityCB = useCallback(onChangeQuantity, [
    handleUpdate,
    image,
    item.data,
    updateQuantity
  ])

  /**
   * Wrapper function around `props.handleRemove`.
   *
   * @param event - `click` event from `<button>` element
   */
  const onClickRemove = (event: EventHandlers.Click.Button) => {
    return handleRemove(event)
  }

  /* Callback version of `onClickRemove` */
  const onClickRemoveCB = useCallback(onClickRemove, [handleRemove])

  return (
    <Box {...sanitized}>
      <Box className='checkout-line-item-col'>
        <Image
          alt={image.alt || data.title}
          className='checkout-line-item-img'
          src={image.src}
        />
      </Box>
      <Box className='checkout-line-item-col'>
        <ProductHeading
          $size={3}
          className='checkout-line-item-heading'
          price={item.data.quantity * JSON.parse(data.price)}
          title={product_title}
        />

        <Paragraph className='checkout-line-item-attribute'>
          {((): ReactNode => {
            if (item.data.properties?.kpd) {
              return (
                <>
                  Kustom product description:&nbsp;
                  <Span>{item.data.properties.kpd}</Span>
                </>
              )
            }

            return 'No Kustomizations.'
          })()}
        </Paragraph>

        <Form className='checkout-line-item-form' id={`${sanitized.id}-form`}>
          <Box className='checkout-line-item-form-field'>
            <Input
              className='checkout-line-item-title'
              name='title'
              readOnly
              value={variant_title}
            />

            <FormField
              className='checkout-line-item-quantity'
              data-control='input'
              data-type='number'
              label='Quantity'
            >
              <Input
                aria-label={CheckoutLineItem.QUANTITY_LABEL}
                min={1}
                name='quantity'
                onChange={onChangeQuantityCB}
                type='number'
                value={item.data.quantity}
              />
            </FormField>
          </Box>

          <Button
            $scale
            className='checkout-line-item-btn'
            onClick={onClickRemoveCB}
            name='remove'
            value={data.variant_id}
          >
            Remove
          </Button>
        </Form>
      </Box>
    </Box>
  )
}

CheckoutLineItem.displayName = 'CheckoutLineItem'

CheckoutLineItem.defaultProps = {}

CheckoutLineItem.QUANTITY_LABEL = 'Line item quantity'
