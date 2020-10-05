import { StoryFN } from '@kustomz-config/index'
import { Item, ItemProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Item
 * @module stories/lib/atoms/Item
 */

export default {
  component: Item,
  parameters: {
    jest: ['Item']
  },
  title: 'Library/Atoms/Item'
}

/**
 * Default {@link Item} story.
 */
export const Default: StoryFN<ItemProps> = (args: ItemProps) => (
  <Item {...args} />
)

Default.args = {
  children: 'Item text'
}
