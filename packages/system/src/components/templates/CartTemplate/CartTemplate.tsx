import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import { formatPrice, uuid } from '@system/utils'
import React from 'react'
import {
  Box,
  FlexBox,
  Heading,
  Link,
  Main,
  Paragraph,
  Section
} from '../../atoms'
import { CheckoutLineItem, CheckoutLineItemProps } from '../../molecules'

/**
 * @file Display the items in a user's cart
 * @module components/templates/CartTemplate/CartTemplate
 */

export interface CartTemplateProps extends MutatedProps {
  /**
   * Cart checkout URL.
   *
   * @default #
   */
  checkout_url?: string

  /**
   * Array of items in the user's cart as an array of `CheckoutLineItemProps`.
   *
   * @default []
   */
  items?: Array<CheckoutLineItemProps>

  /**
   * Cart subtotal.
   */
  subtotal?: string
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
  const { checkout_url, items = [], subtotal = '0.00', ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  return (
    <Main {...mutated} data-template={CartTemplate.template_id}>
      <Section>
        <Heading mb={24} size={2}>
          Cart ({`${items.length}`})
        </Heading>
        <Box>
          {items.map((item: CheckoutLineItemProps) => {
            return <CheckoutLineItem {...item} key={uuid()} />
          })}
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
            Subtotal / {formatPrice(subtotal)}
          </Paragraph>
          <Link className='checkout-btn' btn='primary' href={checkout_url}>
            Checkout
          </Link>
        </FlexBox>
      </Section>
    </Main>
  )
}

CartTemplate.displayName = 'CartTemplate'

CartTemplate.defaultProps = {
  checkout_url: '#',
  items: [],
  subtotal: '0.00'
}

CartTemplate.template_id = 'cart'
