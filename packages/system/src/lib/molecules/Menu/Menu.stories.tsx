import { Menu } from './Menu'
import type { MenuProps } from './Menu.props'

/**
 * @file Stories - Menu
 * @module lib/molecules/Menu/stories
 */

export default {
  component: Menu,
  parameters: {
    jest: ['Menu']
  },
  title: 'Library/Molecules/Menu'
}

export const Sidebar: FCS<MenuProps> = args => <Menu {...args} />

Sidebar.args = {
  $items: [
    { title: 'Home' },
    { title: 'Products' },
    { title: 'About' },
    { title: 'Send Message' },
    { title: 'Instagram' }
  ],
  className: 'sidebar-menu'
}
