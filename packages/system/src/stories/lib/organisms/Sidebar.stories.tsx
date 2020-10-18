import { Sidebar, SidebarProps } from '@system/lib'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - Sidebar
 * @module stories/lib/organisms/Sidebar
 */

export default {
  argTypes: {
    profile: { control: 'object' }
  },
  component: Sidebar,
  parameters: {
    jest: ['Sidebar']
  },
  title: 'Library/Organisms/Sidebar'
}

export const Default: StoryFN<SidebarProps> = (args: SidebarProps) => (
  <Sidebar {...args} />
)

Default.args = {
  menu: [
    { title: 'Home' },
    { title: 'Products' },
    { title: 'About' },
    { title: 'Send Message' },
    { title: 'Instagram' }
  ]
}
