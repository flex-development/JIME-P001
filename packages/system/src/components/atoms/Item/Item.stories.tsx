import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { Item, ItemProps } from './Item'

/**
 * @file Stories - Item
 * @module components/atoms/Item/stories
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
