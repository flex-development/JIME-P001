import {
  Box,
  FlexBox,
  Heading,
  Link,
  Main,
  Paragraph,
  Section
} from '@system/components/atoms'
import {
  CheckoutLineItem,
  CheckoutLineItemProps
} from '@system/components/molecules'
import { useSanitizedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import { formatPrice, getItemsTotal, getSubtotal } from '@system/utils'

/**
 * @file Display the items in a user's cart
 * @module components/templates/CartTemplate/impl
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

  /**
   * Array of items in the user's cart as an array of `CheckoutLineItemProps`.
   *
   * @default []
   */
  items?: Array<CheckoutLineItemProps>
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
    checkout_url,
    handleRemove,
    handleUpdate,
    items = [],
    ...rest
  } = props

  const sanitized = useSanitizedProps<typeof rest>(rest, 'template')

  return (
    <Main {...sanitized} data-template={CartTemplate.template_id}>
      <Section>
        <Heading mb={24} size={2}>
          Cart ({`${getItemsTotal(items)}`})
        </Heading>
        <Box>
          {items.map((item: CheckoutLineItemProps) => (
            <CheckoutLineItem
              {...item}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
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
            Subtotal / {formatPrice(getSubtotal(items))}
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
  items: []
}

CartTemplate.template_id = 'cart'
