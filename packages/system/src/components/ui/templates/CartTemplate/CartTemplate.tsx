import {
  Box,
  FlexBox,
  Heading,
  Link,
  Main,
  Paragraph,
  Section
} from '@system/components/ui/atoms'
import {
  CheckoutLineItem,
  CheckoutLineItemProps
} from '@system/components/ui/molecules'
import { useCartContext, useSanitizedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import { formatPrice, getSubtotal } from '@system/utils'
import { isEmpty, isFunction } from 'lodash'
import { useCallback } from 'react'

/**
 * @file Display the items in a user's cart
 * @module components/ui/templates/CartTemplate/impl
 */

export interface CartTemplateProps extends MutatedProps {
  /**
   * Cart checkout URL.
   *
   * @default #
   */
  checkout_url?: string

  /**
   * `onClick` handler that's fired when the user clicks the "REMOVE" button.
   */
  handleRemove?: CheckoutLineItemProps['handleRemove']

  /**
   * `onChange` handler that's fired when the user updates the line item
   * quantity.
   */
  handleUpdate?: CheckoutLineItemProps['handleUpdate']
}

/**
 * Displays the items in a user's cart.
 *
 * Renders a `Main` component with the class `template` and attribute
 * `data-template='cart'`.
 */
export const CartTemplate: TC<CartTemplateProps> = (
  props: CartTemplateProps
) => {
  const { checkout_url, handleRemove, handleUpdate, ...rest } = props

  // Get component properties
  const sanitized = useSanitizedProps<typeof rest>(rest, 'template')

  // Get cart actions
  const cart = useCartContext()

  /**
   * Removes an items from the user's cart.
   *
   * If `props.handleRemove` is defined, it will be called before updating the
   * line items state.
   *
   * @param event - `click` event from `<button>` element
   */
  const _handleRemove: CheckoutLineItemProps['handleRemove'] = event => {
    event.preventDefault()
    if (isFunction(handleRemove)) handleRemove(event)
    return cart.removeItem(JSON.parse(event.target.value))
  }

  /* Callback version of `_handleRemove` */
  const _handleRemoveCB = useCallback(_handleRemove, [cart, handleRemove])

  /**
   * Updates a checkout line items.
   *
   * If `props.handleUpdate` is defined, it will be called before updating the
   * line item.
   *
   * @param data - Update checkout line item
   * @param e - `change` event from `<input>` element
   */
  const _handleUpdate: CheckoutLineItemProps['handleUpdate'] = (data, e) => {
    e.preventDefault()
    if (isFunction(handleUpdate)) handleUpdate(data, e)
    return cart.upsertItem(data)
  }

  /* Callback version of `_handleUpdate` */
  const _handleUpdateCB = useCallback(_handleUpdate, [cart, handleUpdate])

  return (
    <Main {...sanitized} data-template={CartTemplate.template_id}>
      <Section>
        <Heading mb={24} size={2}>
          Cart ({`${cart.items_total}`})
        </Heading>
        <Box>
          {cart.items.map(item => (
            <CheckoutLineItem
              {...item}
              handleRemove={_handleRemoveCB}
              handleUpdate={_handleUpdateCB}
              key={item.data.variant_id}
            />
          ))}
        </Box>
        <FlexBox
          align='center'
          direction={{ sm: 'row', xs: 'column' }}
          justify={{ sm: 'end', xs: 'center' }}
          mt={{ md: 48, xs: 72 }}
        >
          <Paragraph
            className='subtotal'
            mb={{ sm: 0, xs: 24 }}
            mr={{ sm: 20, xs: 0 }}
          >
            Subtotal / {formatPrice(getSubtotal(cart.items))}
          </Paragraph>
          <Link
            className='checkout-btn'
            btn='primary'
            href={!isEmpty(checkout_url) ? checkout_url : cart.url}
          >
            Checkout
          </Link>
        </FlexBox>
      </Section>
    </Main>
  )
}

CartTemplate.displayName = 'CartTemplate'

CartTemplate.defaultProps = {}

CartTemplate.template_id = 'cart'
