import { StoryFN } from '@system/types/storybook'
import { Menu, MenuProps } from './Menu'

/**
 * @file Stories - Menu
 * @module components/ui/molecules/Menu/stories
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
