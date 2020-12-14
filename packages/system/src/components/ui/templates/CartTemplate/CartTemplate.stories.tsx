import { StoryFN } from '@system/types/storybook'
import { CartTemplate, CartTemplateProps } from './CartTemplate'

/**
 * @file Stories - CartTemplate
 * @module components/ui/templates/CartTemplate/stories
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
  checkout_url: '#'
}
