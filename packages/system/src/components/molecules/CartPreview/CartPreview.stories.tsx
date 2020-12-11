import LINE_ITEMS from '@app-mocks/data/checkout-line-items.mock.json'
import { StoryFN } from '@system/types/storybook'
import { CartPreview, CartPreviewProps } from './CartPreview'

/**
 * @file Stories - CartPreview
 * @module components/molecules/CartPreview/stories
 */

export default {
  argTypes: {
    spring: { control: 'object' }
  },
  component: CartPreview,
  parameters: {
    jest: ['CartPreview']
  },
  title: 'Library/Molecules/CartPreview'
}

export const Default: StoryFN<CartPreviewProps> = (args: CartPreviewProps) => (
  <CartPreview {...args} />
)

Default.args = {
  c: 'light',
  items: LINE_ITEMS.length
}
