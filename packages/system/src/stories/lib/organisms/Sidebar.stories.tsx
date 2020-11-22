import { Sidebar, SidebarProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

/**
 * @file Stories - Sidebar
 * @module stories/lib/organisms/Sidebar
 */

export default {
  args: {
    style: {
      width: '30rem'
    }
  },
  component: Sidebar,
  parameters: {
    jest: ['Sidebar']
  },
  title: 'Library/Organisms/Sidebar'
}

export const Default: StoryFN<SidebarProps> = (args: SidebarProps) => (
  <>
    <Sidebar {...args} />
    <style>
      {`
        @media screen and (max-width: 576px) {
          .sidebar {
            width: 100% !important;
          }
        }
      `}
    </style>
  </>
)

Default.args = {
  menu: [
    { title: 'Home' },
    { title: 'Products' },
    { title: 'About' },
    { title: 'Instagram' }
  ]
}
