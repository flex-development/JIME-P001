import { ANYTHING } from '@flex-development/json'
import {
  CheckoutLineItemDisplay,
  CheckoutLineItemInput
} from '@flex-development/kustomzcore'
import {
  BoxProps,
  Button,
  Column,
  FlexBox,
  Image,
  ImageProps,
  Input,
  Paragraph,
  Span
} from '@system/components/ui/atoms'
import { useCheckoutLineItemInput, useSanitizedProps } from '@system/hooks'
import { EventHandlers } from '@system/types'
import { FC, ReactNode, useCallback } from 'react'
import { LabeledFormControl } from '../LabeledFormControl'
import { ProductHeading } from '../ProductHeading'

/**
 * @file Display product checkout information
 * @module components/ui/molecules/CheckoutLineItem/impl
 */

export interface CheckoutLineItemProps extends BoxProps {
  /**
   * `ICheckoutLineItem` object display properties.
   */
  data: CheckoutLineItemDisplay

  /**
   * `onClick` handler that's fired when the user clicks the "REMOVE" button.
   */
  handleRemove?(event: EventHandlers.Click.Button): ANYTHING

  /**
   * `onChange` handler that's fired when the user updates the line item
   * quantity.
   */
  handleUpdate?(
    updates: CheckoutLineItemInput,
    event: EventHandlers.Change.Input
  ): ANYTHING

  /**
   * Variant display image.
   */
  image: ImageProps
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

  // Get outer component properties
  const sanitized = useSanitizedProps<typeof rest>(rest, 'line-item')

  // Handle line item state
  const { item, updateQuantity } = useCheckoutLineItemInput({ data, image })

  // Get parent product title
  const { 0: product_title, 1: variant_title } = data.title.split(' - ')

  /**
   * Updates the number of line items to purchase.
   *
   * @param e - `change` event from `<input>` element
   */
  const onChangeQuantity = useCallback(
    (e: EventHandlers.Change.Input) => {
      let quantity = JSON.parse(e.target.value)
      quantity = quantity < 1 ? 1 : quantity

      const updates: CheckoutLineItemInput = {
        data: { ...item.data, quantity },
        image
      }

      updateQuantity(updates.data.quantity)
      return handleUpdate(updates, e)
    },
    [handleUpdate, image, item.data, updateQuantity]
  )

  /**
   * Wrapper function around `props.handleRemove`.
   *
   * @param e - `click` event from `<button>` element
   */
  const onClickRemove = useCallback(
    (e: EventHandlers.Click.Button) => {
      return handleRemove(e)
    },
    [handleRemove]
  )

  return (
    <FlexBox {...sanitized} id={`line-item-${data.variant_id}`}>
      <Column mb={{ md: 0, xs: 24 }} md={3} xs={12}>
        <Image alt={image.alt || data.title} fluid src={image.src} />
      </Column>
      <Column pl={{ md: 24, xs: 0 }}>
        <ProductHeading
          className='line-item-heading'
          mb={0}
          price={item.data.quantity * JSON.parse(data.price)}
          size={3}
          title={product_title}
        />

        <Paragraph className='line-item-attribute' mb={24} mt={12}>
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
                'aria-label': CheckoutLineItem.QUANTITY_LABEL,
                min: 1,
                name: 'quantity',
                onChange: onChangeQuantity,
                type: 'number',
                value: item.data.quantity
              }}
            >
              Quantity
            </LabeledFormControl>
          </FlexBox>

          <Button
            onClick={onClickRemove}
            name='remove'
            mt={{ md: 0, xs: 24 }}
            px={20}
            scale
            value={data.variant_id}
          >
            Remove
          </Button>
        </FlexBox>
      </Column>
    </FlexBox>
  )
}

CheckoutLineItem.displayName = 'CheckoutLineItem'

CheckoutLineItem.QUANTITY_LABEL = 'Line item quantity'

CheckoutLineItem.defaultProps = {}
