import { ANYTHING } from '@flex-development/json'
import {
  CheckoutLineItemDisplay,
  CheckoutLineItemInput
} from '@flex-development/kustomzcore'
import { useCheckoutLineItemInput, useSanitizedProps } from '@system/hooks'
import { EventHandlers } from '@system/types'
import { FC, Fragment } from 'react'
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
} from '../../atoms'
import { LabeledFormControl } from '../LabeledFormControl'
import { ProductHeading } from '../ProductHeading'

/**
 * @file Display product checkout information
 * @module components/molecules/CheckoutLineItem/impl
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
export const CheckoutLineItem: FC<CheckoutLineItemProps> = (
  props: CheckoutLineItemProps
) => {
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
          {
            /* eslint-disable prettier/prettier */
            item.data.properties?.kpd ? (
              <Fragment>
                Kustom product description:&nbsp;
                <Span>{item.data.properties.kpd}</Span>
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
                  let quantity = JSON.parse(event.target.value)
                  quantity = quantity < 1 ? 1 : quantity

                  const updates: CheckoutLineItemInput = {
                    data: { ...item.data, quantity },
                    image
                  }

                  updateQuantity(updates.data.quantity)

                  return handleUpdate(updates, event)
                },
                type: 'number',
                value: item.data.quantity
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

CheckoutLineItem.defaultProps = {}
