import { ShopHeader } from './ShopHeader'
import type { ShopHeaderProps } from './ShopHeader.props'

/**
 * @file Stories - ShopHeader
 * @module lib/organisms/ShopHeader/stories
 */

export default {
  args: {
    style: {
      maxWidth: '1434px',
      padding: '20px 0'
    }
  },
  component: ShopHeader,
  parameters: {
    jest: ['ShopHeader']
  },
  title: 'Library/Organisms/ShopHeader'
}

export const Default: FCS<ShopHeaderProps> = args => <ShopHeader {...args} />

Default.args = {}
