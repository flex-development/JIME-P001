import { StoryFN } from '@system/types/storybook'
import { CartPreview, CartPreviewProps } from './CartPreview'

/**
 * @file Stories - CartPreview
 * @module components/ui/molecules/CartPreview/stories
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
  c: 'light'
}
