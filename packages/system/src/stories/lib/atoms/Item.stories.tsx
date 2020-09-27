import { Item, ItemProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN, variant } from '../../../../.storybook/config'

/**
 * @file Stories - Item
 * @module stories/lib/atoms/Item
 */

export default {
  argTypes: { variant },
  component: Item,
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
