import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { ShopHeader, ShopHeaderProps } from './ShopHeader'

/**
 * @file Stories - ShopHeader
 * @module components/organisms/ShopHeader/stories
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
