import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import React from 'react'
import uuid from 'react-uuid'
import { Box, FlexBox, Heading, Link, Main, Paragraph, Section } from '../atoms'
import { CheckoutLineItem, CheckoutLineItemProps } from '../molecules'

/**
 * @file Display the items in a user's cart
 * @module lib/templates/CartTemplate
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
  items?: CheckoutLineItemProps[]

  /**
   * Cart subtotal.
   */
  subtotal?: string
}

export const CartTemplateDefaultProps = {
  checkout_url: '#',
  items: [],
  subtotal: '0.00'
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
  const {
    checkout_url = CartTemplateDefaultProps.checkout_url,
    items = CartTemplateDefaultProps.items,
    subtotal = CartTemplateDefaultProps.subtotal,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')
  const subtotal_formatted = `$${subtotal}`

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
            Subtotal / {subtotal_formatted}
          </Paragraph>
          <Link className='checkout-btn' btn='primary' href={checkout_url}>
            Checkout
          </Link>
        </FlexBox>
      </Section>
    </Main>
  )
}

CartTemplate.template_id = 'cart'

CartTemplate.defaultProps = CartTemplateDefaultProps
