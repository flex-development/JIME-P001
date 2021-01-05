import { CartPreview } from './CartPreview'
import { CartPreviewProps } from './CartPreview.props'

/**
 * @file Stories - CartPreview
 * @module lib/atoms/CartPreview/stories
 */

export default {
  component: CartPreview,
  parameters: {
    jest: ['CartPreview']
  },
  title: 'Library/Atoms/Link/CartPreview'
}

export const Default: FCS<CartPreviewProps> = args => <CartPreview {...args} />

Default.args = {
  $color: 'light'
}
