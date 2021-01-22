import LINE_ITEMS from '@system-mocks/data/checkout-line-items.mock.json'
import { CheckoutLineItem } from './CheckoutLineItem'
import type { CheckoutLineItemProps } from './CheckoutLineItem.props'

/**
 * @file Stories - CheckoutLineItem
 * @module lib/molecules/CheckoutLineItem/stories
 */

export default {
  args: {
    style: {
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

AshTray.args = Object.assign({}, LINE_ITEMS[0])

export const Kustomz: FCS<CheckoutLineItemProps> = args => (
  <CheckoutLineItem {...args} />
)

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = Object.assign({}, LINE_ITEMS[1])
