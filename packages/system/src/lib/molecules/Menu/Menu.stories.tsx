import { Menu } from './Menu'
import type { MenuProps } from './Menu.props'
import MENU_ITEMS_SIDEBAR from './__tests__/__fixtures__/menu-items-sidebar'

/**
 * @file Stories - Menu
 * @module lib/molecules/Menu/stories
 */

export default {
  component: Menu,
  parameters: {
    jest: ['Menu', 'Nav']
  },
  title: 'Library/Molecules/Menu'
}

export const Sidebar: FCS<MenuProps> = args => <Menu {...args} />

Sidebar.args = {
  $items: MENU_ITEMS_SIDEBAR,
  className: 'sidebar-menu'
}
