import { Item } from './Item'
import type { ItemProps } from './Item.props'

/**
 * @file Stories - Item
 * @module lib/atoms/Item/stories
 */

export default {
  component: Item,
  parameters: {
    jest: ['Item']
  },
  title: 'Library/Atoms/Item'
}

export const Default: FCS<ItemProps> = args => <Item {...args} />

Default.args = {
  children: 'Item text'
}

export const Dropdown: FCS<ItemProps> = args => <Item {...args} />

Dropdown.args = {
  $dropdown: true,
  children: 'Dropdown item'
}
