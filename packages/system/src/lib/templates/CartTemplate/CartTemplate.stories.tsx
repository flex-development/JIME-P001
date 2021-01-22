import { CartContextProvider } from '@system/providers'
import { CartTemplate } from './CartTemplate'
import type { CartTemplateProps } from './CartTemplate.props'

/**
 * @file Stories - CartTemplate
 * @module lib/templates/CartTemplate/stories
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: CartTemplate,
  parameters: {
    jest: ['CartTemplate']
  },
  title: 'Library/Templates/CartTemplate'
}

export const Cart: FCS<CartTemplateProps> = args => <CartTemplate {...args} />

Cart.args = {}

export const CartEmpty: FCS<CartTemplateProps> = args => (
  <CartContextProvider items={[]}>
    <CartTemplate {...args} />
  </CartContextProvider>
)

CartEmpty.storyName = 'Empty Cart'
CartEmpty.args = {}
