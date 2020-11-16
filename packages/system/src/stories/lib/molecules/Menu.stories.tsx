import { Menu, MenuProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

/**
 * @file Stories - Menu
 * @module stories/lib/molecules/Menu
 */

export default {
  component: Menu,
  parameters: {
    jest: ['Menu']
  },
  title: 'Library/Molecules/Menu'
}

export const Sidebar: StoryFN<MenuProps> = (args: MenuProps) => (
  <Menu {...args} />
)

Sidebar.args = {
  className: 'sidebar-menu',
  links: [
    { title: 'Home' },
    { title: 'Products' },
    { title: 'About' },
    { title: 'Send Message' },
    { title: 'Instagram' }
  ]
}
