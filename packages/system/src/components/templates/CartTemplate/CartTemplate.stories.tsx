import items from '@app-mocks/data/checkout-line-items.mock.json'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { CartTemplate, CartTemplateProps } from './CartTemplate'

/**
 * @file Stories - CartTemplate
 * @module components/templates/CartTemplate/stories
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

export const Cart: StoryFN<CartTemplateProps> = (args: CartTemplateProps) => (
  <CartTemplate {...args} />
)

Cart.args = {
  ...CartTemplate?.defaultProps,
  items,
  subtotal: '55.00'
}
