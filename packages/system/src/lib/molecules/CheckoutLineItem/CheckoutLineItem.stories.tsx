import CHECKOUT_LINE_ITEMS from '@system/tests/fixtures/checkout-line-items'
import { CheckoutLineItem } from './CheckoutLineItem'
import type { CheckoutLineItemProps } from './CheckoutLineItem.props'

/**
 * @file Stories - CheckoutLineItem
 * @module lib/molecules/CheckoutLineItem/stories
 */

export default {
  args: {
    style: {
      height: 'unset',
      maxWidth: '1362px'
    }
  },
  component: CheckoutLineItem,
  parameters: {
    jest: ['CheckoutLineItem']
  },
  title: 'Library/Molecules/CheckoutLineItem'
}

export const AshTray: FCS<CheckoutLineItemProps> = args => (
  <CheckoutLineItem {...args} />
)

AshTray.args = {
  data: Object.assign({}, CHECKOUT_LINE_ITEMS[0])
}

export const Kustomz: FCS<CheckoutLineItemProps> = args => (
  <CheckoutLineItem {...args} />
)

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = {
  data: Object.assign({}, CHECKOUT_LINE_ITEMS[1])
}
