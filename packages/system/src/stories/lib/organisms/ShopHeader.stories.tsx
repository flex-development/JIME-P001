import { ShopHeader, ShopHeaderProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

/**
 * @file Stories - ShopHeader
 * @module stories/lib/organisms/ShopHeader
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

export const Default: StoryFN<ShopHeaderProps> = (args: ShopHeaderProps) => (
  <ShopHeader {...args} />
)

Default.args = {}
