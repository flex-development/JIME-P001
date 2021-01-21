import { CHECKOUT_BASE_URL } from '@flex-development/kustomzcore/constants'
import { useCartContext } from '@system/hooks/useCart'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box } from '@system/lib/atoms/Box'
import { Heading } from '@system/lib/atoms/Heading'
import { Link } from '@system/lib/atoms/Link'
import { Main, MainProps } from '@system/lib/atoms/Main'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { Section } from '@system/lib/atoms/Section'
import { Span } from '@system/lib/atoms/Span'
import type { CheckoutLineItemProps } from '@system/lib/molecules/CheckoutLineItem'
import { CheckoutLineItem } from '@system/lib/molecules/CheckoutLineItem'
import type { TC } from '@system/types'
import { formatPrice } from '@system/utils/formatPrice'
import { getSubtotal } from '@system/utils/getSubtotal'
import isFunction from 'lodash/isFunction'
import { useCallback, useRef } from 'react'
import type { CartTemplateProps } from './CartTemplate.props'

/**
 * @file Implementation - CartTemplate
 * @module lib/templates/CartTemplate/impl
 */

/**
 * Displays the items in a user's cart.
 *
 * Renders a `Main` component with the classes `template` and `cart-template`,
 * as well as the attribute `data-template='cart'`.
 */
export const CartTemplate: TC<CartTemplateProps> = props => {
  const { handleRemove, handleUpdate, ...rest } = props

  // Get component properties
  const sanitized = useSanitizedProps<'main', MainProps>(rest, 'cart-template')

  // Get cart actions
  const cart = useCartContext()

  // Get reference to checkout URL
  const url = useRef<string>(cart.url)

  // Disabled checkout state
  const disabled = useRef<boolean>(
    !cart.items.length || url.current === CHECKOUT_BASE_URL
  )

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
  const handleRemoveCB = useCallback(_handleRemove, [cart, handleRemove])

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
  const handleUpdateCB = useCallback(_handleUpdate, [cart, handleUpdate])

  return (
    <Main {...sanitized} data-template={CartTemplate.template_id}>
      <Section id='template-header'>
        <Heading className='template-heading'>
          Cart <Span>({`${cart.items_total}`})</Span>
        </Heading>
      </Section>

      <Section className='line-item-grid'>
        {cart.items.map(item => (
          <CheckoutLineItem
            {...item}
            handleRemove={handleRemoveCB}
            handleUpdate={handleUpdateCB}
            key={item.data.variant_id}
          />
        ))}
      </Section>

      <Box
        className='cart-template-details'
        data-disabled={disabled.current || undefined}
      >
        <Paragraph className='cart-template-subtotal'>
          Subtotal / {formatPrice(getSubtotal(cart.items))}
        </Paragraph>
        <Link
          $btn='primary'
          className='cart-template-btn'
          disabled={disabled.current}
          href={url.current}
          name='checkout-btn'
        >
          Checkout
        </Link>
      </Box>
    </Main>
  )
}

CartTemplate.displayName = 'CartTemplate'

CartTemplate.defaultProps = {}

CartTemplate.template_id = 'cart'
