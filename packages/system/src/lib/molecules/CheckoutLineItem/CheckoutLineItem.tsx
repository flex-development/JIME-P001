import type {
  CheckoutLineItemInput,
  IProductListingVariant
} from '@flex-development/kustomzcore'
import { useCheckoutLineItemInput } from '@system/hooks/useCheckoutLineItemInput'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { BoxProps } from '@system/lib/atoms/Box'
import { Box } from '@system/lib/atoms/Box'
import { Button } from '@system/lib/atoms/Button'
import { Form } from '@system/lib/atoms/Form'
import { Input } from '@system/lib/atoms/Input'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { ProductHeading } from '@system/lib/atoms/ProductHeading'
import { ProductImage } from '@system/lib/atoms/ProductImage'
import { Span } from '@system/lib/atoms/Span'
import { FormField } from '@system/lib/molecules/FormField'
import type { EventHandlers } from '@system/types'
import type { FC } from 'react'
import { ReactNode, useCallback, useMemo } from 'react'
import type { CheckoutLineItemProps } from './CheckoutLineItem.props'

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
    ...rest
  } = props

  // Product listing variant
  const variant = useMemo<IProductListingVariant>(() => {
    console.debug(data.product.variants, data.variant_id)

    return data.product.variants.find(({ id }) => {
      return id === data.variant_id
    }) as IProductListingVariant
  }, [data.product.variants, data.variant_id])

  // Handle line item state
  const { item, updateQuantity } = useCheckoutLineItemInput(data)

  // Get component properties
  const sanitized = useSanitizedProps<'div', BoxProps>(rest, {
    'checkout-line-item': true
  })

  console.debug(variant)

  // Update element ID
  sanitized['id'] = `line-item-${variant.id}`

  /**
   * Updates the number of line items to purchase.
   *
   * @param event - `change` event from `<input>` element
   */
  const onChangeQuantity = (event: EventHandlers.Change.Input) => {
    let quantity = JSON.parse(event.target.value)
    quantity = quantity < 1 ? 1 : quantity

    const updates: CheckoutLineItemInput = { ...item, quantity }

    updateQuantity(updates.quantity)
    return handleUpdate(updates, event)
  }

  /* Callback version of `onChangeQuantity` */
  const onChangeQuantityCB = useCallback(onChangeQuantity, [
    handleUpdate,
    item,
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
        <ProductImage
          className='checkout-line-item-img'
          layout='intrinsic'
          loading='eager'
          product={data.product}
          variant={variant}
        />
      </Box>
      <Box className='checkout-line-item-col'>
        <ProductHeading
          $size={3}
          className='checkout-line-item-heading'
          price={item.quantity * JSON.parse(variant.price)}
          title={data.product.title}
        />

        <Paragraph className='checkout-line-item-attribute'>
          {((): ReactNode => {
            if (item.properties?.kpd) {
              return (
                <>
                  Kustom product description:&nbsp;
                  <Span>{item.properties.kpd}</Span>
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
              value={variant.title}
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
                value={item.quantity}
              />
            </FormField>
          </Box>

          <Button
            $scale
            className='checkout-line-item-btn'
            onClick={onClickRemoveCB}
            name='remove'
            value={variant.id}
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
