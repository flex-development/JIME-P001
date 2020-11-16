import { CartTemplate, CartTemplateProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import items from '@system/__mocks__/items.mock.json'
import React from 'react'

/**
 * @file Stories - CartTemplate
 * @module stories/lib/templates/CartTemplate
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
