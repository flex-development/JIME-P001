import { CHECKOUT_BASE_URL } from '@kustomzcore/config/constants'
import type { CheckoutLineItemInput } from '@kustomzcore/types'
import { useCartContext } from '@system/hooks/useCart'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box } from '@system/lib/atoms/Box'
import { Heading } from '@system/lib/atoms/Heading'
import { Link } from '@system/lib/atoms/Link'
import type { MainProps } from '@system/lib/atoms/Main'
import { Main } from '@system/lib/atoms/Main'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { Section } from '@system/lib/atoms/Section'
import { Span } from '@system/lib/atoms/Span'
import { CheckoutLineItem } from '@system/lib/molecules/CheckoutLineItem'
import type { EventHandlers, TC } from '@system/types'
import { formatPrice } from '@system/utils/formatPrice'
import { getSubtotal } from '@system/utils/getSubtotal'
import isFunction from 'lodash/isFunction'
import { useCallback, useEffect } from 'react'
import { useBoolean } from 'react-hanger/array/useBoolean'
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

  // Disabled checkout state
  const [disabled, { setValue: setDisabled }] = useBoolean(
    cart.url === CHECKOUT_BASE_URL
  )

  /**
   * Removes an items from the user's cart.
   *
   * If `props.handleRemove` is defined, it will be called before updating the
   * line items state.
   *
   * @param {EventHandlers.Click.Button} event - `click` event
   * @return {void}
   */
  const _handleRemove = (event: EventHandlers.Click.Button): void => {
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
   * @param {CheckoutLineItemInput} data - Updated checkout line item
   * @param {EventHandlers.Change.Input} event - `change` event
   */
  const _handleUpdate = (
    data: CheckoutLineItemInput,
    event: EventHandlers.Change.Input
  ): void => {
    event.preventDefault()

    if (isFunction(handleUpdate)) handleUpdate(data, event)
    return cart.upsertItem(data)
  }

  /* Callback version of `_handleUpdate` */
  const handleUpdateCB = useCallback(_handleUpdate, [cart, handleUpdate])

  // Update disabled checkout state
  useEffect(() => {
    setDisabled(cart.url === CHECKOUT_BASE_URL)
  }, [cart.url, setDisabled])

  return (
    <Main {...sanitized} data-template={CartTemplate.template_id}>
      <Section id='template-header'>
        <Heading className='template-heading template-heading-with-number'>
          Cart <Span>({`${cart.items_total}`})</Span>
        </Heading>
      </Section>

      <Section className='line-item-grid'>
        {cart.items.map(item => (
          <CheckoutLineItem
            data={item}
            handleRemove={handleRemoveCB}
            handleUpdate={handleUpdateCB}
            key={item.variant_id}
          />
        ))}
      </Section>

      <Box
        className='cart-template-details'
        data-disabled={disabled || undefined}
      >
        <Paragraph className='cart-template-subtotal'>
          Subtotal / {formatPrice(getSubtotal(cart.items))}
        </Paragraph>
        <Link
          $btn='primary'
          className='cart-template-btn'
          disabled={disabled}
          href={cart.url}
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
