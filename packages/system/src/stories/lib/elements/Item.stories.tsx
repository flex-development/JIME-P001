import { color, size, StoryFN, variant } from '@kustomz-config'
import { Item, ItemProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Item
 * @module stories/lib/elements/Item
 */

export default {
  argTypes: { color, size, variant },
  component: Item,
  title: 'Elements/Item'
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
